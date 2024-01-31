
/**
 * 
 * @param file File对象
 * @param chunkSize //每一个切片的大小
 * @param filename //文件名称
 * @returns Array[]chunks // 切片的数组
 */
export function createChunks(file: File, chunkSize: number = 1024 * 1024 * 5, filename?: string): Array<chunkInfo> {
    //防止没有传入文件名
    filename = filename || file.name || "未知";
    const chunks = []
    //计算切片的数量
    const count = Math.ceil(file.size / chunkSize)
    //循环切片
    for (let i = 0; i < count; i++) {
        //切割文件
        const start = i * chunkSize//开始未知
        const end = (i + 1) * chunkSize //结束位置
        const chunk = file.slice(start, end)
        // 拼接对应的切片文件名
        const chunkFilename = `${i}-${filename}`;
        chunks.push({
            chunk, // 切片文件
            chunkFilename // 切片文件名
        })
    }
    return chunks
}

export interface chunkInfo {
    chunk: Blob,
    chunkFilename: string,
  }