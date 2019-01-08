const { QuickSort } = require('./QuickSort');
const { MergeSort } = require('./MergeSort');
const { bucketSort } = require('./BucketSort');
const { HeapSort } = require('./HeapSort');
const { RadixSort } = require('./RadixSort');
const { CountingSort } = require('./CountingSort');
const { BubbleSort } = require('./BubbleSort.js');
const { SelectSort } = require('./SelectSort.js');
const { InsertSort } = require('./InsertSort.js');
const { ShellSort } = require('./ShellSort.js');

const { ramdomList } = require('./ramdomList');

let a = ramdomList(10);
let sortTimes = 'sort time';
console.log(a);
console.time(sortTimes);
let b = QuickSort(a);
console.timeEnd(sortTimes);
console.log(b);
console.log('end');
