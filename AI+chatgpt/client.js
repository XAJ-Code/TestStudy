const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('user-input');

// 添加对话历史数组
let chatHistory = [];

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // 添加用户消息到历史记录
    chatHistory.push({ role: "user", content: message });

    // 显示用户消息
    appendMessage('用户', message);
    userInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // 发送整个对话历史
            body: JSON.stringify({ messages: chatHistory }),
        });

        const reader = response.body.getReader();
        let aiMessage = '';

        // 创建 AI 回复的消息容器
        const aiContainer = appendMessage('AI', '');

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const text = new TextDecoder().decode(value);
            aiMessage += text;
            aiContainer.textContent = aiMessage;
            
            requestAnimationFrame(() => {
                messagesDiv.scrollTo({
                    top: messagesDiv.scrollHeight,
                    behavior: 'smooth'
                });
            });
        }

        // 将 AI 回复添加到历史记录
        chatHistory.push({ role: "assistant", content: aiMessage });

    } catch (error) {
        console.error('Error:', error);
        appendMessage('系统', '发生错误，请重试');
    }
}

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.style.marginBottom = '15px';
    
    // 根据发送者设置不同的样式
    let messageClass = '';
    switch(sender.toLowerCase()) {
        case '用户':
            messageClass = 'user-message';
            break;
        case 'ai':
            messageClass = 'ai-message';
            break;
        case '系统':
            messageClass = 'system-message';
            break;
    }
    
    messageDiv.className = `message ${messageClass}`;
    
    // 只有在不是系统消息时才显示发送者
    if (sender.toLowerCase() !== '系统') {
        messageDiv.innerHTML = `
            <div class="sender">${sender}</div>
            <div class="content">${text}</div>
        `;
    } else {
        messageDiv.innerHTML = text;
    }
    
    messagesDiv.appendChild(messageDiv);
    
    // 使用 requestAnimationFrame 确保滚动在 DOM 更新后执行
    requestAnimationFrame(() => {
        messagesDiv.scrollTo({
            top: messagesDiv.scrollHeight,
            behavior: 'smooth'
        });
    });
    
    return messageDiv.querySelector('.content') || messageDiv;
}

// 支持回车发送
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 添加新建对话函数
function newChat() {
    // 清空历史记录
    chatHistory = [];
    // 清空消息显示区域
    messagesDiv.innerHTML = '';
}
  