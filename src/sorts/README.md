## 10 种经典排序算法

### 排序算法的稳定性

> 通俗地讲就是能保证排序前 2 个相等的数其在序列的前后位置顺序和排序后它们两个的前后位置顺序相同。在简单形式化一下，如果 Ai = Aj，Ai 原来在位置前，排序后 Ai 还是要在 Aj 位置前。

### 冒泡排序(BubbleSort.js) **稳定**

> 平均时间复杂度：O(n<sup>2</sup>)  
> 空间复杂度： O(1)  
> 算法分析：  
> 1、遍历数组，比较 a<sub>k</sub>与 a<sub>k-1</sub>大小，并把不合条件的 a<sub>k</sub>与 a<sub>k-1</sub>的值交换，  
> 实现把 a<sub>max/min</sub>置到队尾;  
> 2、对 A<sub>n-1</sub>重复 step1 直到 n-1 == 1。

### 选择排序(SelectSort.js) **不稳定**

> 平均时间复杂度：O(n<sup>2</sup>)  
> 空间复杂度：O(1)  
> 算法分析：  
> 1、找到 a<sub>max/min</sub>，并与 a<sub>n</sub>交换；  
> 2、对 A<sub>n-1</sub>重复 step1 直到 n-1 == 1。

### 插入排序(InsertSort.js) **稳定**

> 平均时间复杂度：O(n<sup>2</sup>) [ O(n) ~ O(n<sup>2</sup>) ]  
> 空间复杂度：O(1)  
> 算法分析：  
> 遍历数组，若找到 a<sub>k</sub> < a<sub>i</sub>,将 a<sub>k</sub>插入到 a<sub>i</sub>前（i < k）；

### 希尔排序(ShellSort.js) **不稳定**

> 平均时间复杂度：O(n log<sup>2</sup> n)  
> 空间复杂度：O(n log<sup>2</sup> n)  
> 算法分析：
>
> 1. 选择一个步长序列 S<sub>1</sub>,S<sub>1</sub>,····S<sub>k</sub>; S<sub>i</sub><S<sub>i-1</sub>; S<sub>k</sub> = 1;
> 2. 步长序列的个数 k,对序列进行 k 次排序;
> 3. 每次排序，根据步长 Si 将数组分割为 n 个子数组，并分别对其进行插入排序。

### 并归排序(MergeSort.js) **稳定**

> 平均时间复杂度：O(n log n)  
> 空间复杂度：O(n log n)  
> 算法分析(**MergeSort** )：
>
> 1. 把 A<sub>n</sub>分成两半；
> 2. 把 A<sub>Left</sub>和 A<sub>Right</sub>分别以 **MergeSort** 进行排序；
> 3. 并归(Merge)已排序数组 A<sub>Left</sub>和 A<sub>Right</sub>。

#### 并归(Merge)

1. 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列
2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置
3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
4. 重复步骤 3 直到某一指针到达序列尾
5. 将另一序列剩下的所有元素直接复制到合并序列尾

### 快速排序(QuickSort.js) **不稳定**

> 平均时间复杂度：O(n log n)  
> 空间复杂度：O(n log n)  
> 算法分析(**QuickSort**)：
>
> 1. 在数组 A<sub>n</sub>中选择一项，称为 “基准”（pivot），一般可为 a<sub>n/2</sub>;
> 2. 遍历数组，把值大于 pivot 的项置于 pivot 右边，把值小于 pivot 的项置于 pivot 左边（递增，递减相反）;
> 3. 对 pivot 左边的子数组 A<sub>Left</sub>和 pivot 右边的子数组 A<sub>Right</sub>分别进行 **QuickSort**。

### 堆排序(HeapSort.js) **不稳定**

> 平均时间复杂度：O(n log n)  
> 空间复杂度：O(n log n)  
> 算法分析(**HeapSort**)：
>
> 1. 用数组 A<sub>n</sub>的元素创造一个最大堆(**createMaxHeap**);
> 2. 把堆首与堆尾交换；
> 3. 堆尺寸 k -= 1,调用 **heapify(A<sub>n</sub>, 0, k)**,目的是把现有堆复原为最大堆；
> 4. 重复步骤 2、3，直到 k = 1。

#### heapify 函数

> 1. 比较父节点和子节点中最大值的大小，若父节点为小值则交换；
> 2. 对被交换过的子节点调用 heapify 函数，直到没有下一个子节点。

#### createMaxHeap

> 从最后一个父节点 (i = Math.floor(n / 2) - 1)开始调用 heapify 函数，直到根节点（i=0）。

### 计数排序(CountingSort.js) **稳定**

> 平均时间复杂度：O(n + k)  
> 空间复杂度：O(k)  
> 算法分析：  
>
> 1. 获取数组 A<sub>n</sub>的最大值 a<sub>max</sub>和最小值 A<sub>min</sub>；
> 2. 创建数组 B<sub>a<sub>max</sub>-a<sub>min</sub>+1</sub>,
>    b<sub>i</sub>的值为值 i+a<sub>min</sub>在 A 中的出现次数的统计；
> 3. 遍历数组 B,把 b<sub>i</sub>输出为 b<sub>i</sub>个 i+a<sub>min</sub>；

### 桶排序(BucketSort.js) **稳定**
> 平均时间复杂度：O(n + k)  
> 空间复杂度：O(k)  
> 算法分析：  
> 1. 设置固定数量的空桶 [ a<sub>min</sub>, a<sub>max</sub> ]。
> 2. 把数据放到对应的桶中。
> 3. 对每个不为空的桶中数据进行排序。
> 4. 拼接不为空的桶中数据，得到结果


### 基数排序(RadixSort.js) **稳定**
> 平均时间复杂度：O(n x k)  
> 空间复杂度：O(n x k)  
> 算法分析：
> 1. 将所有待比较数值（正整数）统一为同样的数位长度，数位较短的数前面补零
> 2. 从最低位开始，依次进行一次排序
> 3. 从最低位排序一直到最高位排序完成以后, 数列就变成一个有序序列