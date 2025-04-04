//console.log('Hello, World!');

class ArrayPlus {
    constructor(arr) {
      this.arr = arr;
    }
    
    sum() {
      return this.arr.reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);
    }
    
    average() {
      return this.arr.length ? this.sum() / this.arr.length : 0;
    }
    
    unique() {
      return [...new Set(this.arr)];
    }
    
    max() {
      return Math.max(...this.arr.filter(n => typeof n === 'number'));
    }
    
    min() {
      return Math.min(...this.arr.filter(n => typeof n === 'number'));
    }
    
    groupBy(fn) {
      return this.arr.reduce((acc, item) => {
        const key = fn(item);
        (acc[key] = acc[key] || []).push(item);
        return acc;
      }, {});
    }
    
    chunk(size) {
      return Array.from({ length: Math.ceil(this.arr.length / size) }, (_, i) => this.arr.slice(i * size, i * size + size));
    }
    
    flatten(depth = 1) {
      const flattenArray = (arr, depth) => 
        depth > 0 
          ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val, depth - 1) : val), [])
          : arr.slice();
      return flattenArray(this.arr, depth);
    }
    
    shuffle() {
      return this.arr.slice().sort(() => Math.random() - 0.5);
    }
    
    countBy(fn) {
      return this.arr.reduce((acc, item) => {
        const key = fn(item);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
    }
  }
  

  const arr = new ArrayPlus([1, 2, 2, 3, 4, 5]);
  console.log('Sum:', arr.sum());
  console.log('Average:', arr.average());
  console.log('Unique:', arr.unique());
  console.log('Max:', arr.max());
  console.log('Min:', arr.min());
  console.log('Group by Even/Odd:', arr.groupBy(num => (num % 2 === 0 ? 'Even' : 'Odd')));
  console.log('Chunk (size 2):', arr.chunk(2));
  console.log('Flatten:', new ArrayPlus([1, [2, [3, 4]], 5]).flatten(2));
  console.log('Shuffle:', arr.shuffle());
  console.log('Count by Odd/Even:', arr.countBy(num => (num % 2 === 0 ? 'Even' : 'Odd')));