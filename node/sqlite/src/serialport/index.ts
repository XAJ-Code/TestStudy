import { SerialPort } from 'serialport'
import MeterReader from './meterWatch/index.js'

//获取串口列表
const ports = await SerialPort.list()
const meterWatchPort = ports.map(port => port.path)
console.log(meterWatchPort)

// const meterWatch = new SerialPort({
//   path: 'COM10',
//   baudRate: 9600,
//   dataBits: 8,
//   stopBits: 1,
//   parity: 'none',
//   autoOpen: true,
// })

// meterWatch.on('open', () => { 
//   console.log('串口已打开')
// })

// meterWatch.on('data', (data) => { 
//   console.log("收到数据", data)
// })

async function main() {
  const meterReader = new MeterReader();

  try {
    // 连接设备
    const connected = await meterReader.connect("COM10", 1);
    if (!connected) {
      console.log("请检查串口连接和设备地址");
      return;
    }
    let result;
    //读取单位
    const unit = await meterReader.readerUnit();
    if (unit === 0) {
      result = await meterReader.readMeters();
    } else {
      result = await meterReader.readYards();
    }

    console.log("=== 米数表读数 ===");
    console.log("原始寄存器值:", result.rawValue);
    console.log("计算米数:", result.meters.toFixed(3) + `${unit === 0 ? '米' : '码'}`);
    console.log("显示值:", result.displayValue.toFixed(1) + `${unit === 0 ? '米' : '码'}`);
    console.log("当前的单位：", result.unit);

    // 持续读取（可选）
    console.log("\n开始持续读取（按Ctrl+C停止）...");
    setInterval(async () => {
      try {
        const unit = await meterReader.readerUnit();
        const stringUnit = unit === 0 ? '米' : '码';
        let reading;
        if (unit === 0) {
          reading = await meterReader.readMeters();
        } else {
          reading = await meterReader.readYards();
        }
        console.log(`当前米数: ${reading.displayValue.toFixed(2) +' ' + stringUnit}----原始值: ${reading.rawValue}`);
      } catch (error: any) {
        console.error("读取错误:", error.message);
      }
    }, 1000); // 每秒读取一次

  } catch (error: any) {
    console.error("运行错误:", error.message);
  } finally {
    // 程序退出时关闭连接
    process.on('SIGINT', () => {
      meterReader.close();
      process.exit();
    });
  }
}

main()

// const meterWatchClent= new ModbusRTU.default()