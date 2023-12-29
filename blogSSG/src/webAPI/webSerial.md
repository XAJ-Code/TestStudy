# Web Serial API

#### 一、简介

- Web Serial API 为网站提供了一种读取和写入串行设备的方法。这些设备可以通过串行端口连接，也可以是模拟串行端口的 USB 或蓝牙设备。
- Web Serial API 是一组 API 之一，允许网站与连接到用户计算机的外围设备进行通信。它提供了连接到操作系统通过串行 API 进行通信所需的设备的能力，而不是可以通过 WebUSB API 访问的 USB 或可通过 WebHID API 访问的输入设备。

  #### 二、接口（Interfaces）

- Serial:提供用于从网页查找和连接到串口的属性和方法
- SerialPort:提供对主机设备上的串行端口的访问
- Navigator.serial:返回一个Serial对象，该对象表示Web Serial API的入口点，以启用对串口的控制。
- WorkerNavigator.serial:返回一个Serial对象，该对象表示Web Serial API的入口点，以启用对串口的控制。

#### 示例

```javascript
navigator.serial.addEventListener("connect", (e) => {
  // Connect to `e.target` or add it to a list of available ports.
});

navigator.serial.addEventListener("disconnect", (e) => {
  // Remove `e.target` from the list of available ports.
});

navigator.serial.getPorts().then((ports) => {
  // Initialize the list of available ports with `ports` on page load.
});

button.addEventListener("click", () => {
  const usbVendorId = 0xabcd;
  navigator.serial
    .requestPort({ filters: [{ usbVendorId }] })
    .then((port) => {
      // Connect to `port` or add it to the list of available ports.
    })
    .catch((e) => {
      // The user didn't select a port.
    });
});
```

- 从端口读取数据

```javascript
while (port.readable) {
  const reader = port.readable.getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        // |reader| has been canceled.
        break;
      }
      // Do something with |value|...
    }
  } catch (error) {
    // Handle |error|...
  } finally {
    reader.releaseLock();
  }
}
```