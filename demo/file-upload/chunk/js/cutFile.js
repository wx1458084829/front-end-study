import { createChunk } from "./createChunk.js";
//单线程

// const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB

// export async function cutFile(file) {
//     //向上取整确保文件个数正确
//     const chunkCount = Math.ceil(file.size / CHUNK_SIZE); // 计算切片个数
//     const result = [];
//     for (let i = 0; i < chunkCount; i++) {
//         const chunk = await createChunk(file, i, CHUNK_SIZE);
//         result.push(chunk);
//         // console.log(chunk);
//     }
//     return result;
// }

//多线程
const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB
const THREAD_COUNT = navigator.hardwareConcurrency || 4; // 线程数

const result = [];
let finishCount = 0;
export async function cutFile(file) {
    return new Promise((resolve, reject) => {
        const chunkCount = Math.ceil(file.size / CHUNK_SIZE); // 计算切片个数
        const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT); // 计算每个线程的切片个数
        for (let i = 0; i < THREAD_COUNT; i++) {
            const myWorker = new Worker('./js/worker.js', { type: 'module' }); // 创建线程,tyoe:module表示使用ES6模块
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + threadChunkCount, chunkCount);
            myWorker.postMessage({
                file,
                start,
                end,
                CHUNK_SIZE
            });
            myWorker.onmessage = (e) => {
                myWorker.terminate(); // 关闭线程
                result[i] = e.data; // 保存切片,必须使用数组，因为线程是异步的
                finishCount++;
                console.log(finishCount);

                if (finishCount === THREAD_COUNT) {
                    finishCount = 0;
                    resolve(result.flat()); // 将二维数组转换为一维数组
                }
            }
        }
    })
}