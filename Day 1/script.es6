const fs = require('node:fs');
fs.readFile(__dirname+'/input.csv', function read(err, data) {
  if (err) {
      throw err;
  }
  calcElf2(String(data));
});

function sumCalories(data) {
  const snacks = data.split(',').map(e=>Number(e));
  return snacks.reduce((a,c)=> a+c);
}

function calcElf(data) {
  const elfs = [];
  let highestElf = 0;
  data.split('\n').forEach((snacks, index) => {
    const sum = sumCalories(snacks);
    elfs.push(sum);
    highestElf = sum > elfs[highestElf] ? index : highestElf;
  });

  console.log(elfs, highestElf+1, elfs[highestElf]);
}

////////////// Part 2 /////////////

function calcElf2(data) {
  const elfs = [];
  let highElfs = [0, 0, 0];
  data.split('\n').forEach((snacks, index) => {
    const sum = sumCalories(snacks);
    elfs.push(sum);
    if (sum > elfs[highElfs[0]]) {
      highElfs[2] = highElfs[1];
      highElfs[1] = highElfs[0];
      highElfs[0] = index;
    } else if (sum > elfs[highElfs[1]]) {
      highElfs[2] = highElfs[1];
      highElfs[1] = index;
    } else if (sum > elfs[highElfs[2]]) {
      highElfs[2] = index;
    }
  });

  console.log(elfs, highElfs.map(e=>e+1), elfs[highElfs[0]], elfs[highElfs[1]], elfs[highElfs[2]], sumCalories(elfs[highElfs[0]]+','+elfs[highElfs[1]]+','+elfs[highElfs[2]]));
}
