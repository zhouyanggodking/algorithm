  // [0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0]

// var matrix = [
//   [0,4,2,9,0,0,7,0,0],
//   [5,0,0,1,0,0,0,9,0],
//   [1,0,0,0,0,0,8,0,5],
//   [0,3,0,7,2,0,4,0,9],
//   [0,0,8,0,0,0,3,0,0],
//   [9,0,4,0,3,8,0,5,0],
//   [8,0,7,0,0,0,0,0,1],
//   [0,5,0,0,0,6,0,0,4],
//   [0,0,1,0,0,9,5,2,0]
// ];
var sudo = (function(){

  function getPossibleValues(matrix, rowIndex, colIndex) {
    var tVals = checkTrickyUnique(matrix, rowIndex, colIndex);
    if (!tVals.length) {
      var rowPossibleValues = getRowPossibleValues(matrix, rowIndex, colIndex);
      var colPossibleValues = getColPossibleValues(matrix, rowIndex, colIndex);
      var squarePossibleValues = getSquarePossibleValues(matrix, rowIndex, colIndex);
    
      var allPossibleValues = interset(interset(rowPossibleValues, colPossibleValues), squarePossibleValues)
      return allPossibleValues;
    }
    return tVals;
  }

  function checkTrickyUnique(matrix, rowIndex, colIndex) {
    if (!matrix[rowIndex][colIndex]) {
      var valueSet = getValueSet();    
      var center = getSquareCenter(rowIndex, colIndex);
      var otherPossibleValues = [];
      for (var i = center.rowIndex - 1; i <= center.rowIndex + 1; ++i) {
        for (var j = center.colIndex - 1; j <= center.colIndex + 1; ++j) {
          // console.log(`i=${i}, j=${j}`)
          if (!(i == rowIndex && j == colIndex)) {
            if (!matrix[i][j]) {
              var p = interset(getColPossibleValues(matrix, i, j), getRowPossibleValues(matrix, i, j));
              // console.log(`i=${i}, j=${j}, ${p}`)
              otherPossibleValues = otherPossibleValues.concat(p);
              console.log(otherPossibleValues)
            } else {
              console.log(`i=${i}, j=${j}, ${[matrix[i][j]]}`)
              otherPossibleValues = otherPossibleValues.concat([matrix[i][j]]);
            }            
          }
        }
      }
      var otherPossibleValueSet = new Set(otherPossibleValues);
      // console.log(otherPossibleValueSet)
      otherPossibleValueSet.forEach(v => {
        valueSet.delete(v);
      });
      // console.log(valueSet)
      return [...valueSet];
    }
    return [matrix[rowIndex][colIndex]];  
  }
  
  
  function getRowPossibleValues(matrix, rowIndex, colIndex) {
    if (!matrix[rowIndex][colIndex]) {
      var valueSet = getValueSet();
      var rowValues = matrix[rowIndex];
      rowValues.forEach(v => {
        valueSet.delete(v);
      });
      return [...valueSet];
    }
    return [matrix[rowIndex][colIndex]];
  }
  
  function getColPossibleValues(matrix, rowIndex, colIndex) {
    if (!matrix[rowIndex][colIndex]) {
      var valueSet = getValueSet();
      var colValues = matrix.map(row => row[colIndex]);
      colValues.forEach(v => {
        valueSet.delete(v);
      });
      return [...valueSet];
    }
    return [matrix[rowIndex][colIndex]];
  }
  
  function getSquarePossibleValues(matrix, rowIndex, colIndex) {
    if (!matrix[rowIndex][colIndex]) {
      var valueSet = getValueSet();    
      var center = getSquareCenter(rowIndex, colIndex);
      var squareValues = getSquareValuesByCenter(matrix, center.rowIndex, center.colIndex);
      squareValues.forEach(v => {
        valueSet.delete(v);
      });
      // console.log(center);
      // var otherPossibleValues = [];
      // for (var i = center.rowIndex - 1; i <= center.rowIndex + 1; ++i) {
      //   for (var j = center.colIndex - 1; j <= center.colIndex + 1; ++j) {
      //     // console.log(`i=${i}, j=${j}`)
      //     if (!(i == rowIndex && j == colIndex)) {
      //       if (!matrix[i][j]) {
      //         var p = interset(getColPossibleValues(matrix, i, j), getRowPossibleValues(matrix, i, j));
      //         console.log(`i=${i}, j=${j}, ${p}`)
      //         otherPossibleValues = otherPossibleValues.concat(p);
      //         console.log(otherPossibleValues)
      //       } else {
      //         console.log(`i=${i}, j=${j}, ${[matrix[i][j]]}`)
      //         otherPossibleValues = otherPossibleValues.concat([matrix[i][j]]);
      //       }            
      //     }
      //   }
      // }
      // var otherPossibleValueSet = new Set(otherPossibleValues);
      // console.log(otherPossibleValueSet)
      // otherPossibleValueSet.forEach(v => {
      //   valueSet.delete(v);
      // });
      // console.log(valueSet)
      return [...valueSet];
    }
    return [matrix[rowIndex][colIndex]];  
  }
  
  function getSquareCenter(rowIndex, colIndex) {
    var squareRowIndex = parseInt(rowIndex / 3);
    var squareColIndex = parseInt(colIndex / 3);
    return {
      rowIndex: squareRowIndex * 3 + 1,
      colIndex: squareColIndex * 3 + 1
    };
  }
  
  function getSquareValuesByCenter(matrix, centerRowIndex, centerColIndex) {
    var setArr = matrix.slice(centerRowIndex - 1, centerRowIndex + 2)
      .map(row => row.slice(centerColIndex - 1, centerColIndex + 2))
      .flat();
    var valueSet = new Set(setArr);
    valueSet.delete(0);
    return [...valueSet];
  }
  
  
  function getValueSet() {
    return new Set(new Array(9).fill(0).map((v, i) => i + 1));
  }
  
  function interset(arr1, arr2) {
    return arr1.filter(v => new Set(arr2).has(v));
  }
  
  function solve(matrix) {
    const maxRowIndex = 8;
    const maxColIndex = 8;
    const maxIteration = 100;

    console.log(matrix)
  
    for(let iteration = 0; iteration < maxIteration; ++iteration) {
      var prevMatrixJson = JSON.stringify(matrix);
      for (let i = 0; i <= maxRowIndex; ++i) {
        for (let j = 0; j <= maxColIndex; ++j) {
          if (!matrix[i][j]) {
            const pvs = getPossibleValues(matrix, i, j);
            if (pvs.length === 1) {
              matrix[i][j] = pvs[0];
              
              console.log(`i=${i}, j=${j}, iteration=${iteration}, value=${pvs[0]}`)
            }
            if (pvs.length === 0) {
              // throw new Error('no solution');
            }
          }
        }
      }
      var currMatrixJson = JSON.stringify(matrix);
      if (prevMatrixJson === currMatrixJson) {
        break;
      }
    }
    return JSON.parse(JSON.stringify(matrix));
  }

  return {
    solve,
    getPossibleValues,
    getRowPossibleValues,
    getColPossibleValues,
    getSquarePossibleValues
  }
})();

var matrix = [[0,0,0,2,4,0,0,0,0],[0,0,6,0,0,7,5,0,0],[1,0,0,0,0,5,0,4,0],[7,0,0,9,8,0,0,1,0],[0,8,0,0,0,0,0,0,9],[0,9,0,0,0,0,0,0,6],[5,0,0,0,0,4,0,3,0],[0,0,0,8,7,0,0,0,0],[0,0,2,0,0,3,1,0,0]]

var t = sudo.getPossibleValues(matrix, 0, 5)

var row = sudo.getRowPossibleValues(matrix, 0, 5)
var col = sudo.getColPossibleValues(matrix, 0, 5)
var s = sudo.getSquarePossibleValues(matrix, 0, 5)

console.log(t, col, s)




