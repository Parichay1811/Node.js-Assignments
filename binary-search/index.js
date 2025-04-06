function binarySearch(arr, target) {
    let i = 0;
    let j = arr.length - 1;
  
    while (i <= j) {
      const mid = Math.floor((i + j) / 2);
      const guess = arr[mid];
  
      if (guess === target) {
        return mid;
      } else if (guess < target) {
        i = mid + 1;
      } else {
        i = mid - 1;
      }
    }
  
    return -1; 
  }
  
module.exports = binarySearch();