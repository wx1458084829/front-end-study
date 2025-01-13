/**
 * 创建分片
 * @param {*} file 
 * @param {*} index 
 * @param {*} chunkSize 
 * @returns 
 */
export function createChunk (file,index, chunkSize){
    return new Promise((resolve, reject) => {
    const start = index * chunkSize;
    const end = Math.min(file.size, start + chunkSize); // 防止超出文件大小
    const spark = new SparkMD5.ArrayBuffer(); // 创建md5对象，来自html外部
    const filerReader = new FileReader();
    const blob = file.slice(start, end);
    filerReader.onload = (e) => {
        spark.append(e.target.result);
        resolve({
          start, //开始
            end,
            index,
            hash:spark.end(), // 计算hash,cpu密集型操作
            blob
        })
    };
    filerReader.readAsArrayBuffer(blob);
    })
}