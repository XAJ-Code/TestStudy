export default function mountMethodDemo(app) {
    app.get('/method/get', (req, res) => {
        res.send('GET request')
    })
    app.post('/method/post', (req, res) => {
        res.send('POST request')
    })
    app.put('/method/put', (req, res) => {
        res.send('PUT request')
    })
    app.delete('/method/delete', (req, res) => {
        res.send('DELETE request')
    })
}

/* 
* 判断字符串是否为英文
*/
export function isEnglish(str){
    // 使用正则表达式判断字符串是否全部由英文字母组成
    return /^[a-zA-Z]+$/.test(str);
}
