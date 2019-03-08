## 动态规范

LCS
字符串A[n],B[m]
当a[i]等于b[j]时，
字符串A[i]和b[j]的LCS长度为字符串A[i-1]和b[j-1]的LCS长度加一；
否则，为字符串A[i]和b[j-1]和字符串A[i-1]和b[j]的LCS长度的最大值；
$$
 f(i,j) = \begin{Bmatrix} 
        f(i-1,j-1)&a[i] == b[i] \\
        max(f(i-1,j),f(i,j-1))&else    
 \end{Bmatrix}
$$