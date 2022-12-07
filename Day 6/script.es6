const fs = require('node:fs');
fs.readFile(__dirname+'/input.csv', function read(err, data) {
  if (err) {
      throw err;
  }
  // part 1 last paramater = 4 part 2 paramater = 14
  transmisionSubbroutine(String(data).replace(/\r/g, ""), 14);
});

function transmisionSubbroutine(data, minimum) {
  const indexMin = minimum-1;
  const buffer = [];
  for(i=0;i<indexMin;i++) {
    buffer.push(data[i]);
  }
  for(i=indexMin;i<data.length;i++) {
    buffer.push(data[i])
    if (compare(buffer)) {
      console.log(i+1);
      //found character
      break;
    }
    buffer.shift();
  }
}

function compare(arr) {
  const obj = {}
  arr.forEach(e=>obj[e] == undefined ? obj[e] = 1 : obj[e]++);
  if (Object.keys(obj).length == arr.length) {
    return true;
  }
  return false;
} 