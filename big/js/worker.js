// import { createChunk } from "./createChunk";


self.onmessage = async function(e){
    console.log("dsds111");

    // const {
    //     file,
    //     start,
    //     end,
    //     CHUNK_SIZE
    // } = e.data;

    // const result = [];
    // for (let i = start; i < end; i++) {
    //     const prom =  createChunk(file, i, CHUNK_SIZE);
    //     result.push(prom);
    // }
    // const chunks = await Promise.all(result);
    // postMessage(chunks);
}

// 可选：处理错误
self.onerror = function (error) {
    console.error('Worker error:', error);
  };