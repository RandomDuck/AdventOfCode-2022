const fs = require('node:fs');
fs.readFile(__dirname+'/input.csv', function read(err, data) {
  if (err) {
      throw err;
  }
  groupSacks(String(data).replace(/\r/g, ""));
});

function sortSacks(sacks) {
  const priorities = [];
  sacks.split('\n').forEach(sack => {
    const comp1 = sack.slice(0, sack.length/2).split('')
    const comp2 = sack.slice(-sack.length/2).split('')
    let pushed = false;
    comp1.forEach(y=>{
      if (pushed) {
        return;
      }
      comp2.forEach(z=>{
        if (pushed) {
          return;
        }
        if (y==z) {
          priorities.push(clacPriority(y));
          pushed=true;
          return;
        }
      })
    })
  });
  console.log(priorities, priorities.reduce((x,y)=>x+y));
}

function clacPriority(char) {
  const isUpper = char == char.toUpperCase();
  if (isUpper) {
    return char.charCodeAt(0) - 38;
  }
  return char.charCodeAt(0) - 96;
}

/////// part 2 //////

function groupSacks(input) {
  const sacks= input.split('\n');
  const result = new Array(sacks.length/3)
    .fill('')
    .map((_, i) => sacks.slice(i * 3, (i + 1) * 3));

  const badges = [];
  result.forEach(group=>{
    const collections = [{},{},{}];
    group[0].split('').map(e=>collections[0][e] == undefined ? collections[0][e]=1 : collections[0][e]++);
    group[1].split('').map(e=>collections[1][e] == undefined ? collections[1][e]=1 : collections[1][e]++);
    group[2].split('').map(e=>collections[2][e] == undefined ? collections[2][e]=1 : collections[2][e]++);
    
    const sorted = [Object.keys(collections[0]).sort(), Object.keys(collections[1]).sort(), Object.keys(collections[2]).sort()];
    
    const matchedRound1 = {};
    const orderOfOperation = findShortest(sorted);
    sorted[orderOfOperation[0]].forEach(e=>{
      sorted[orderOfOperation[1]].forEach(x=>{
        if (e==x) {
          matchedRound1[e] == undefined ? matchedRound1[e] = 1 : matchedRound1[e]++
        }
      });
    });
    const matchedRound2 = {}
    Object.keys(matchedRound1).forEach(e=>{
      sorted[orderOfOperation[2]].forEach(x=>{
        if (e==x) {
          matchedRound2[e] == undefined ? matchedRound2[e] = 1 : matchedRound2[e]++
        }
      });
    });
    badges.push(Object.keys(matchedRound2)[0]);
  });
  console.log(badges, badges.reduce((x,e)=>x+clacPriority(e),0))
}

function findShortest(sorted) {
  if (sorted[0].length < sorted[1].length) {
    if (sorted[0].length < sorted[2].length) {
      if (sorted[1].length < sorted[2].length) {
        return [0, 1, 2]
      }
      return [0, 2, 1]
    }
  } else {
    if (sorted[1].length < sorted[2].length) {
      if (sorted[0].length < sorted[2].length) {
        return [1, 0, 2]
      }
      return [1, 2 , 0];
    }
  }
  if (sorted[0].length < sorted[1].length) {
    return [2, 0, 1];
  }
  return [2, 1, 0];
}