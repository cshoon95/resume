const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt'
const fs = require('fs');
const input = fs.readFileSync(path)
  .toString()
  .trim()
  .split('\n')

let resX = [];
let resY = [];
// let resY = [];

for (let i = 0; i < input.length; i++) {
  const [a, b] = input[i].split(' ');

  if (!resX.includes(a)) {
    resX.push(a);
  }

  if (!resY.includes(b)) {
    resY.push(b);
  }
}

console.log(resX, resY)