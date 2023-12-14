// const ffmpeg = require('ffmpeg')
// const a = new ffmpeg()
// //提取音频
// a.addInput('D:\video\下推发货查看发货码单.mp4')
// a.outputOptions(['-vn'])
// a.output('./下推发货查看发货码单.mp3')

const ffmpeg = require('fluent-ffmpeg');

ffmpeg('../../../../video/下推发货查看发货码单.mp4')
 .output('./output_audio.mp3')
 .on('end', () => {
   console.log('音频提取完成');
 })
 .on('error', (err) => {
   console.error('音频提取过程中出现错误:', err);
 })
 .run();