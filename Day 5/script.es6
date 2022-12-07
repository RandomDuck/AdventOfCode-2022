const fs = require('node:fs');
fs.readFile(__dirname+'/input.csv', function read(err, data) {
  if (err) {
      throw err;
  }
  const splitdata = String(data).replace(/\r/g, "").split(';');
  craneOperate2(splitdata[0], splitdata[1]);
});

function craneOperate(boxes, operations) {
  const boxArray = boxes.split('\n').map(e=>e.split(','));
  operations.split('\n').forEach(operations => {
    const operationsArray = operations.split(',').map(e=>Number(e));
    const move = operationsArray[0];
    //-1 to index array att 0
    const from = operationsArray[1]-1;
    const to = operationsArray[2]-1;

    for (i=0; i<move;i++) {
      boxArray[to].push(boxArray[from].pop());
    }
  });
  let output='';
  boxArray.map(e=>output+=e[e.length-1]);
  console.log(output);
}

// crane opperations part 2
function craneOperate2(boxes, operations) {
  const boxArray = boxes.split('\n').map(e=>e.split(','));
  operations.split('\n').forEach(operations => {
    const operationsArray = operations.split(',').map(e=>Number(e));
    const move = operationsArray[0];
    //-1 to index array att 0
    const from = operationsArray[1]-1;
    const to = operationsArray[2]-1;
    
    boxArray[to].push(...boxArray[from].slice(-move));
    boxArray[from] = boxArray[from].slice(0,boxArray[from].length-move);
  });
  let output='';
  boxArray.map(e=>output+=e[e.length-1]);
  console.log(output);
}