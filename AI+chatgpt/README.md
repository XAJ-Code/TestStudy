# AI+chatgpt
## 利用openai的api实现一个简单的聊天机器人

### 基于[掘金文字知识库](https://juejin.cn/post/7440451683588800562)
### 利用 [ollama](https://ollama.com/) 搭建一个本地的大模型
 - 安装 ollama
 - 启动 ollama
  ```bash
  ollama run llama3:8b
  ```
  ```bash
  ollama -help 查看命令
  ```
 - 下载模型
### 利用 [express](https://expressjs.com/) 搭建一个简单的聊天机器人
```bash
# 运行服务
ollama serve

# 列出所有已下载的模型
ollama list

# 拉取模型
ollama pull [模型名称]

# 删除模型
ollama rm [模型名称]

# 复制模型
ollama cp [源模型] [目标模型]

# 基础运行
ollama run [模型名称]

# 多行输入模式
ollama run [模型名称] --multiline

# 设置参数运行
ollama run [模型名称] --temperature 0.7
# 设置上下文窗口大小
--context [数值]

# 设置温度
--temperature [0-1之间的值]

# 设置系统提示词
--system "[系统提示词]"

# 设置格式化输出
--format [json/yaml]
# 查看版本
ollama --version

# 查看帮助
ollama help

# 查看具体命令帮助
ollama help [命令名称]
# 设置主机和端口
OLLAMA_HOST=127.0.0.1:3000 ollama serve

# 设置CUDA设备
CUDA_VISIBLE_DEVICES=0 ollama run llama2
```
### 示例
```bash
ollama run llama3:8b --system "You are a helpful assistant." --context 1024 --temperature 0.7 --format json

# 运行 Llama 2
ollama run llama2

# 运行 Code Llama
ollama run codellama

# 运行 Mistral
ollama run mistral
```
