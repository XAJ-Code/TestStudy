### Express 是什么？
* Express是一个流行的Node.js Web应用程序框架，用于构建灵活且可扩展的Web应用程序和API。它是基于Node.js的HTTP模块而创建的，简化了处理HTTP请求、响应和中间件的过程。
### Express 安装
* 安装 Express 之前，您必须安装 Node.js。
* 安装 Express 的方式有两种：
    * 使用 npm 安装
    * 使用 GitHub 克隆
* 使用 npm 安装 Express
    * 打开命令提示符并导航到您希望 Express 安装到的目录。
    * 运行以下命令：
    ```
    npm install express
    ```
* 使用 GitHub 克隆 Express
    * 打开命令提示符并导航到您希望 Express 安装到的目录。
    * 运行以下命令：
    ```
    git clone https://github.com/expressjs/express.git
    ```
* 安装 Express 之后，您将拥有一个名为 express 的目录，其中包含 Express 及其依赖项。
### 创建 Express 应用程序
* 创建 Express 应用程序的方式有两种：
    * 使用 npm 创建
    * 使用 Express 生成器创建
* 使用 npm 创建 Express 应用程序
    * 打开命令提示符并导航到您希望 Express 安装到的目录。
    * 运行以下命令：
    ```
    npm init
    ```
    * 按照提示进行操作，创建 package.json 文件。
    * 运行以下命令：
    ```
    npm install express --save
    ```
    * 此命令将 Express 安装到您的应用程序目录中，并将 Express 添加到 package.json 文件中的依赖项列表中。
    * 运行以下命令：
    ```