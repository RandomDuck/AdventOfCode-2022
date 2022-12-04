const fs = require('node:fs');
fs.readFile(__dirname+'/input.csv', function read(err, data) {
  if (err) {
      throw err;
  }
  groupRange2(String(data).replace(/\r/g, ""));
});

function groupRange(data) {
  let pairsInsidePairs=0;
  data.split('\n').forEach(ranges => {
    let rangeFound=false;
    const [range1,range2] = ranges.split(',').map(e=>e.split('-').map(z=>Number(z)));
    if (range1[0] >= range2[0]) {
      if (range1[1] <= range2[1]) {
        //found r2 in r1
        pairsInsidePairs++;
        rangeFound=true;
      }
    }
    if (range1[0] <= range2[0] && !rangeFound) {
      if (range1[1] >= range2[1]) {
        // found r1 in r2
        pairsInsidePairs++;
      }
    }
  });
  console.log(pairsInsidePairs);
}

function groupRange2(data) {
  let pairsInsidePairs=0;
  data.split('\n').forEach(ranges => {
    let rangeFound=true;
    const [range1,range2] = ranges.split(',').map(e=>e.split('-').map(z=>Number(z)));
    if (range1[1] < range2[0]) rangeFound=false;
    if (range2[1] < range1[0]) rangeFound=false;
    if (rangeFound) {
      pairsInsidePairs++;
    }
  });
  console.log(pairsInsidePairs);
}
