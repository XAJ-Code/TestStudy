/**
 * 
 * @param file 文件对象
 * @returns 文件名
 */
export async function getFileName(file:File):Promise<string> {
    //数组.POP(),从数组删除最后一个元素并返回该元素[a,c].pop()=c
    const extension = file.name.split('.').pop();
    //获取文件摘要
    const digestName = await calculateDigest(file)
    return `${digestName}.${extension}`;
}

/**
 *
 * @param {File} file 文件对象
 * @returns 返回十六进制的字符串
 */
async function calculateDigest(file:File):Promise<string> {
    // 读取文件buffer
    const arrayBuffer = await file.arrayBuffer();
    // 计算摘要buffer
    const digestBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    // 转换为十六进制字符串
    const digestArray = Array.from(new Uint8Array(digestBuffer));
    const digestHex = digestArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return digestHex;
  }