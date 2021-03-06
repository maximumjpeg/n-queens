/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  var solution = undefined; //fixme
  var board = new Board({ n: n });
  // console.log('board before loops', board.rows());
  if (n === 1) {
    board.rows()[0][0] = 1;
  }
  for (var i = 0; i < board.rows().length; i++) {
    for (var j = 0; j < board.rows()[i].length; j++) {
      board.rows()[i][j] = 1;
      // console.log('during', board.rows());
      if (board.hasAnyRooksConflicts()) {
        board.rows()[i][j] = 0;
      }
    }
  }
  solution = board.rows();
  // console.log('final', JSON.stringify(solution));
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  // debugger;
  // var findCount = 0;
  if (n === 0 || n === 1) { return 1; }
  var solutionCount = 0; //fixme
  var colArr = [];
  var board = new Board({ n: n });
  var find = function (row) {
    if (row === n) {
      solutionCount++;

      return;
    }
    for (var i = 0; i < n; i++) {
      // for (var j = 0; j < colArr.length; j++) {
      //   if (i = colArr[j]) {
      //     j = 0;
      //     i++;
      //   }
      // }
      board.togglePiece(row, i);

      if (!board.hasAnyRooksConflicts()) {
        colArr.push(i);
        find(row + 1);
      }

      board.togglePiece(row, i);
    }
  };
  find(0);
  // if (n === 1) {
  //   solutionCount = 1;
  // }
  // var firstCol = 0;
  // var firstRow = 0;
  // var find = function () {
  //   // debugger;
  //   // console.log('findCount:', findCount);
  //   var board = new Board({ n: n });
  //   var currentRow = 0;
  //   var colArr = [];
  //   var result;
  //   var first = board.get(firstRow);
  //   var placed = 0;
  //   first[firstCol] = 1;
  //   colArr.push(firstCol);
  //   var addElement = function () {
  //     // debugger;
  //     console.log('made it');
  //     if (currentRow === firstRow) {
  //       currentRow++;
  //       placed++;
  //       return;
  //     }
  //     var row = board.get(currentRow);
  //     for (var j = 0; j < n - 1; j++) {
  //       var test = true;
  //       for (let i = 0; i < colArr.length; i++) {
  //         if (colArr[i] === j) {
  //           test = false;
  //         }
  //       }
  //       if (test) {
  //         row[j] = 1;
  //         colArr.push(j);
  //         currentRow++;
  //         placed++;
  //         return;
  //       }
  //     }
  //     currentRow++;
  //   };


  //   while (currentRow < n - 1) {
  //     // debugger;
  //     console.log('right before suspected loop:', currentRow);
  //     addElement();
  //   }
  //   // console.log('s');
  //   // console.log('expect true:', !board.hasAnyRooksConflicts());
  //   // console.log('current row:', currentRow);
  //   // console.log('n', n);
  //   if (!(board.hasAnyRooksConflicts()) && placed >= n - 1) {
  //     solutionCount++;
  //     console.log('s');
  //   }

  //   if (firstCol === n - 1) {
  //     firstCol = 0;
  //     console.log('findRow', firstRow);
  //     firstRow++;
  //   } else {
  //     firstCol++;
  //     console.log('this', firstCol);
  //   }

  // };
  // console.log('firstCol', firstCol);
  // console.log('firstRow', firstRow);
  // while (firstCol !== n - 1 || firstRow !== n - 1) {
  //   // debugger;
  //   console.log('need to restart find');
  //   // findCount++;
  //   console.log('solution count', solutionCount);


  //   find();
  //   console.log('solution count', solutionCount);
  // }
  // console.log('firstRow', firstRow);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // if (n >= 4) {
  //   return solutionCount << 1;
  // }
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme
  var board = new Board({ n: n });
  // console.log('board before loops', board.rows());
  if (n === 1) {
    board.rows()[0][0] = 1;
  }
  for (var i = 0; i < board.rows().length; i++) {
    for (var j = 0; j < board.rows()[i].length; j++) {
      board.rows()[i][j] = 1;
      // console.log('during', board.rows());
      if (board.hasAnyQueensConflicts()) {
        board.rows()[i][j] = 0;
      }
    }
  }
  solution = board.rows();
  // console.log('final', JSON.stringify(solution));
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0; //fixme

  if (n === 0 || n === 1) { return 1; }

  //Keeps track of the # of valid solutions


  //Helps identify valid solutions
  //Equivalent to Math.pow(2,n) - 1
  var done = (1 << n) - 1;

  //Determines the positions in the first row
  //that will be excluded from our search
  //Also applies to the second row when N is
  //odd and the first queen is in the middle
  //Equivalent to Math.pow(2, Math.floor(n/2)) - 1
  var excl = (1 << ((n / 2) ^ 0)) - 1;

  //Checks all possible board configurations
  //Added two parameters: ex1 will be used on
  //the current row, ex2 is next in line
  var innerRecurse = function (ld, col, rd, ex1, ex2) {

    //All columns are occupied,
    //so the solution must be complete
    if (col === done) {
      solutionCount++;
      return;
    }

    //Gets a bit sequence with "1"s
    //whereever there is an open "slot"
    //ex1 filters out right half of row
    var poss = ~(ld | rd | col | ex1) & done;

    //Loops as long as there is a valid
    //place to put another queen.
    while (poss) {
      var bit = poss & -poss;
      poss = poss ^ bit;

      //ex2 will become the next row's ex1
      //All rows after that will have ex1 = 0
      innerRecurse((ld | bit) >> 1, col | bit, (rd | bit) << 1, ex2, 0);

      //After we are past the middle square in the
      //first row, disable filter for second row
      ex2 = 0;
    }
  };

  //Second row filter active only for odd N
  innerRecurse(0, 0, 0, excl, n % 2 ? excl : 0);

  //Multiply count by 2



  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount << 1;
};
