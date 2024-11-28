import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
/**
 * 11434 是 ollama 的默认启动端口
 */
const openai = new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama",
});

app.post('/chat', async (req, res) => {
    try {
        // 获取完整的消息历史
        const messages = req.body.messages;
        
        // 设置响应头以支持流式传输
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');

        const response = await openai.chat.completions.create({
            model: "qwen2.5-coder:7b",
            messages: messages,  // 使用完整的对话历史
            stream: true,
        });

        for await (const chunk of response) {
            const content = chunk.choices[0]?.delta.content || "";
            res.write(content);
        }
        res.end();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
