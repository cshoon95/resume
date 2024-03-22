const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt'
const fs = require('fs');
const input = fs.readFileSync(path)
  .toString()
  .trim()
  .split('\n')

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth().toString().length === 1 ? '0' + Number(date.getMonth() + 1) : date.getMonth() + 1;
const d = date.getDate();


console.log(y + '-' + m + '-' + d)