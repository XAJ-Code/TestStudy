import ModbusRTU from 'modbus-serial';
import type { ReadRegisterResult } from 'modbus-serial/ModbusRTU.js';

class MeterReader {
  client: ModbusRTU.default;
  isConnected: boolean;
  constructor() {
    this.client = new ModbusRTU.default();
    this.isConnected = false;
  }

  // 连接米数表
  async connect(portPath = "COM10", slaveId = 1) {
    try {
      await this.client.connectRTUBuffered(portPath, {
        baudRate: 9600,
        dataBits: 8,
        stopBits: 1,
        parity: 'none'
      });

      this.client.setID(slaveId);
      this.client.setTimeout(3000);
      this.isConnected = true;

      console.log(`已连接到米数表: ${portPath}, 设备地址: ${slaveId}`);
      return true;

    } catch (error: any) {
      console.error("连接失败:", error.message);
      return false;
    }
  }

  // 读取当前米数
  async readMeters() {
    if (!this.isConnected) {
      throw new Error("未连接到设备");
    }

    try {
      // 读取保持寄存器: 地址 0x000C (12), 长度 2
      const lengthResponse: ReadRegisterResult = await this.client.readHoldingRegisters(0x0C, 2);
      const unitResponse = await this.client.readHoldingRegisters(0x05, 1);

      // 合并32位整数
      const rawValue = (lengthResponse?.data[0] ?? 0 << 16) | (lengthResponse?.data[1] ?? 0);

      // 3. 根据单位寄存器选择计算方式
      const isYardMode = unitResponse.data[0] === 1;
      const conversionFactor = isYardMode ? 0.9144 : 1;
      // 4. 精确计算（避免浮点误差）
      const actualValue = (Math.floor(rawValue * 0.1) * 0.01) * conversionFactor;

      // 计算实际米数: Floor(value × 0.1) × 0.001
      const meters = Math.floor(rawValue * 0.1) * 0.01;

      return {
        rawValue: rawValue,
        meters: meters,
        displayValue: actualValue, // 显示精度0.01米
        unit: isYardMode ? 'Y' : 'M',
      };

    } catch (error: any) {
      console.error("读取数据失败:", error.message);
      throw error;
    }
  }

  //读取码数
  async readYards() {
    if (!this.isConnected) {
      throw new Error("未连接到设备");
    }

    try {
      // 读取保持寄存器: 地址 0x000C (12), 长度 2
      const YardResponse: ReadRegisterResult = await this.client.readHoldingRegisters(0x0E, 2);
      const unitResponse = await this.client.readHoldingRegisters(0x05, 1);

      // 合并32位整数
      const rawValue = (YardResponse?.data[0] ?? 0 << 16) | (YardResponse?.data[1] ?? 0);

      // 3. 根据单位寄存器选择计算方式
      const isYardMode = unitResponse.data[0] === 1;
      // 4. 精确计算（避免浮点误差）
      const actualValue = Math.floor(rawValue * 0.1) * 0.01;

      // 计算实际米数: Floor(value × 0.1) × 0.01
      const meters = Math.floor(rawValue * 0.1) * 0.01;

      return {
        rawValue: rawValue,
        meters: meters,
        displayValue: actualValue, // 显示精度0.01米
        unit: isYardMode ? 'Y' : 'm',
      };

    } catch (error: any) {
      console.error("读取数据失败:", error.message);
      throw error;
    }
  }

  //读取单位0-米；1-码
  async readerUnit():Promise<number> {
    try {
      if (!this.isConnected) {
        throw new Error("未连接到设备");
      }
      const unitResponse = await this.client.readHoldingRegisters(0x05, 1);
      return unitResponse?.data[0] ?? 0
    } catch (error: any) {
      console.error("读取数据失败:", error.message);
      throw error;
    }
  }

  // 修改为米制
  async setMeterUnit() {
    try {
      await this.client.writeRegister(0x05, 0x0000); // 地址0x05，值0x0000（米制）
      console.log('已切换为米制');
    } catch (err) {
      console.error('修改单位失败：', err);
    }
  }

  // 关闭连接
  close() {
    if (this.client && this.isConnected) {
      this.client.close();
      this.isConnected = false;
      console.log("连接已关闭");
    }
  }
}

export default MeterReader;