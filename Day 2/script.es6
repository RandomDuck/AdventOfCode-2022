const fs = require('node:fs');
fs.readFile(__dirname+'/input.csv', function read(err, data) {
  if (err) {
      throw err;
  }
  rockPaperSiscors2(String(data).replace(/\r/g, ""));
});

function rockPaperSiscors(guide) {
  const rounds = [];
  guide.split('\n').forEach((round, index) => {
    const [elf, player] = round.split(' ');
    const sum = scoreCalc(player, findWinner(elf, player));
    rounds.push(sum);
  });
  console.log(rounds, rounds.reduce((x,y)=>x+y));
}

function findWinner(elf,you) {
  let win;
  switch (elf.toLowerCase()) {
    case 'a':
      switch (you.toLowerCase()) {
        case 'x':
          return undefined; // draw
        case 'y':
          return true;
        case 'z':
          return false;
      }
      break
    case 'b':
      switch (you.toLowerCase()) {
        case 'x':
          return false;
        case 'y':
          return undefined; // draw
        case 'z':
          return true;
      }
    case 'c':
      switch (you.toLowerCase()) {
        case 'x':
          return true;
        case 'y':
          return false;
        case 'z':
          return undefined; // draw
      }
  }
}

function scoreCalc(RPS,win) {
  let winVal, rpsVal;
  switch (RPS.toLowerCase()) {
    case 'x': // rock
    rpsVal = 1;
    break;
    case 'y': // paper
    rpsVal = 2;
    break;
    case 'z': // siscors
    rpsVal = 3;
    break;
  }
  switch (win) {
    case true: // win
    winVal = 6
    break;
    case false: // lose
    winVal = 0
    break;
    default: // draw
    winVal = 3
    break;
  }
  return winVal+rpsVal;
}

/////////////// part 2 //////////////


function rockPaperSiscors2(guide) {
  const rounds = [];
  guide.split('\n').forEach((round, index) => {
    const [elf, outcome] = round.split(' ');
    const player = toPlay(elf, outcome);
    const sum = scoreCalc(player, findWinner(elf, player));
    rounds.push(sum);
  });
  console.log(rounds, rounds.reduce((x,y)=>x+y));
}

function toPlay(elf, outcome) {
  switch (outcome.toLowerCase()) {
    case 'x': // loose
      switch (elf.toLowerCase()) {
        case 'a':
          return 'Z'
        case 'b':
          return 'X'
        case 'c':
          return 'Y'
      }
    case 'y': // draw
    switch (elf.toLowerCase()) {
      case 'a':
        return 'X'
      case 'b':
        return 'Y'
      case 'c':
        return 'Z'
    }
    case 'z': // win
    switch (elf.toLowerCase()) {
      case 'a':
        return 'Y'
      case 'b':
        return 'Z'
      case 'c':
        return 'X'
    }
  }
}