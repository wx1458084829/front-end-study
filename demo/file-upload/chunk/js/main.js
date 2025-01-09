import { cutFile } from './cutFile.js'; // 引入切片函数


const inFile = document.querySelector('input[type="file"]');

inFile.onchange =async (e) => {

console.log(e.target.files[0]);
const file = e.target.files[0];
console.time('cutFile');

const chunks = await cutFile(file)

console.timeEnd('cutFile');

// 得到切片后的文件
console.log(chunks);

}