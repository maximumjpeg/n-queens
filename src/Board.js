// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      var row = this.rows();
      var boardRows = row[rowIndex];
      // console.log(boardRows);
      var pieceCounter = 0;
      // console.log('empty counter', pieceCounter);
      for (var i = 0; i < boardRows.length; i++) {
        // console.log(boardRows[i]);
        if (boardRows[i] === 1) {
          pieceCounter++;
        }
      }
      // console.log('piece counter', pieceCounter);

      //     return true if detecting more than 1 piece in a specific row
      if (pieceCounter > 1) {
        return true;
      }
      // else => didnt hit conditional, return false
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      // for in loop through the boards attributes object
      var row = this.rows();
      var test = false;
      for (var i = 0; i < row.length; i++) {
        test = this.hasRowConflictAt(i);
        if (test) {
          return true;
        }
      }

      //   for each row array in boards attributes object
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      var row = this.rows();
      var pieceCounter = 0;
      for (var i = 0; i < row.length; i++) {

        if (row[i][colIndex] === 1) {
          pieceCounter++;
        }
      }
      if (pieceCounter > 1) {
        return true;
      }
      // else => didnt hit conditional, return false
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      var row = this.rows();
      var test = false;

      for (var i = 0; i < row.length; i++) {
        test = this.hasColConflictAt(i);
        if (test) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      var row = this.rows();

      var firstCol = 0;
      var firstRow = 0;
      if (majorDiagonalColumnIndexAtFirstRow > 0) { firstCol = majorDiagonalColumnIndexAtFirstRow; }
      if (majorDiagonalColumnIndexAtFirstRow < 0) { firstRow = Math.abs(majorDiagonalColumnIndexAtFirstRow); }
      var pieceCounter = 0;
      // if (row[firstRow] === undefined) {
      //   return false;
      // }
      var j = firstRow;
      for (var i = 0; i < row.length - j; i++) {
        // console.log('test', row[firstRow][firstCol]);
        // console.log('iteration', i, 'is', row[firstRow]);
        // console.log('firstRow', firstRow);
        // console.log('firstCol', firstCol);
        // console.log('count', pieceCounter);
        // console.log('');
        if (row[firstRow][firstCol] === 1) {
          pieceCounter++;
        }
        firstRow++;
        firstCol++;
      }
      return (pieceCounter > 1);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      var row = this.rows();
      var test = false;
      var firstCol = 0;
      var firstRow = 0;

      for (var i = 0; i < row.length - 1; i++) {
        var start = this._getFirstRowColumnIndexForMajorDiagonalOn(firstRow, firstCol);
        test = this.hasMajorDiagonalConflictAt(start);
        // console.log('call - row = ', start);
        if (test) {
          console.log('test');
          return true;
        }
        firstCol++;
      }

      firstCol = 0;

      for (var j = 0; j < row.length - 1; j++) {
        start = this._getFirstRowColumnIndexForMajorDiagonalOn(firstRow, firstCol);
        test = this.hasMajorDiagonalConflictAt(start);
        // console.log(start);
        if (test) {
          return true;
        }
        firstRow++;
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      var row = this.rows();

      var firstCol = 3;
      var firstRow = 0;
      if (minorDiagonalColumnIndexAtFirstRow > 3 ) { firstRow = (minorDiagonalColumnIndexAtFirstRow - 3); }
      if (minorDiagonalColumnIndexAtFirstRow < 3 ) { firstCol = minorDiagonalColumnIndexAtFirstRow; }
      var pieceCounter = 0;
      // if (row[firstRow] === undefined) {
      //   return false;
      // }
      var j = firstRow;
      for (var i = 0; i < row.length - j; i++) {
        // console.log('test', row[firstRow][firstCol]);
        // console.log('iteration', i, 'is', row[firstRow]);
        // console.log('firstRow', firstRow);
        // console.log('firstCol', firstCol);
        // console.log('count', pieceCounter);
        // console.log('');
        if (row[firstRow][firstCol] === 1) {
          pieceCounter++;
        }
        firstRow++;
        firstCol--;
      }
      return (pieceCounter > 1);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      var row = this.rows();
      var test = false;
      var firstCol = 3;
      var firstRow = 0;

      for (var i = 0; i < row.length - 1; i++) {
        var start = this._getFirstRowColumnIndexForMinorDiagonalOn(firstRow, firstCol);
        test = this.hasMinorDiagonalConflictAt(start);
        // console.log('call - row = ', start);
        if (test) {
          // console.log('test');
          return true;
        }
        firstCol--;
      }
      firstCol = 3;
      for (var i = 0; i < row.length - 1; i++) {
        var start = this._getFirstRowColumnIndexForMinorDiagonalOn(firstRow, firstCol);
        test = this.hasMinorDiagonalConflictAt(start);
        // console.log('call - row = ', start);
        if (test) {
          // console.log('test');
          return true;
        }
        firstRow++;
      }

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
