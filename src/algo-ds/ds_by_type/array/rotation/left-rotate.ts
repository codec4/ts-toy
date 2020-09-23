function gcd(a: number, b: number) {
  return b == 0 ? a : gcd(b, a % b);
}

// This is an extension of method 2.
// Instead of moving one by one, divide the array in different sets
// where number of sets is equal to GCD of n and d and move the elements within sets.
// If GCD is 1 as is for the above example array (n = 7 and d =2),
// then elements will be moved within one set only,
// we just start with temp = arr[0] and keep moving arr[I+d] to arr[I]
// and finally store temp at the right place.
// Here is an example for n =12 and d = 3. GCD is 3 and
//
// Let arr[] be {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}
//
// a) Elements are first moved in first set – (See below
//    diagram for this movement) arr[] after this step --> {4 2 3 7 5 6 10 8 9 1 11 12}
//
// b)    Then in second set.
//           arr[] after this step --> {4 5 3 7 8 6 10 11 9 1 2 12}
//
// c)    Finally in third set.
//           arr[] after this step --> {4 5 6 7 8 9 10 11 12 1 2 3}
// Time complexity : O(n)
// Auxiliary Space : O(1)

export function leftRotate(arr: number[], d: number, n = arr.length) {
  // To handle if d >= n
  d = d % n;

  const g_c_d = gcd(d, n);

  for (let i = 0; i < g_c_d; i++) {
    // move i-th values of blocks
    let temp = arr[i];
    let j = i;

    while (1) {
      let k = j + d;
      if (k >= n) {
        k = k - n;
      }

      if (k == i) {
        break;
      }

      arr[j] = arr[k];
      j = k;
    }

    arr[j] = temp;
  }

  return arr;
}

function reverseArray(arr: number[], start: number, end: number) {
  let temp;
  while (start < end) {
    temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}

export function reversalLeftRotate(arr: number[], d: number, n = arr.length) {
  if (d == 0) {
    return arr;
  }

  d = d % n;

  reverseArray(arr, 0, d - 1);
  reverseArray(arr, d, n - 1);
  reverseArray(arr, 0, n - 1);

  return arr;
}

function swap(arr: number[], fi: number, si: number, d: number) {
  for (let i = 0; i < d; i++) {
    let temp = arr[fi + i];
    arr[fi + i] = arr[si + i];
    arr[si + i] = temp;
  }
}

// Initialize A = arr[0..d-1] and B = arr[d..n-1]
// 1) Do following until size of A is equal to size of B
//
//   a)  If A is shorter, divide B into Bl and Br such that Br is of same
//        length as A. Swap A and Br to change ABlBr into BrBlA. Now A
//        is at its final place, so recur on pieces of B.
//
//    b)  If A is longer, divide A into Al and Ar such that Al is of same
//        length as B Swap Al and B to change AlArB into BArAl. Now B
//        is at its final place, so recur on pieces of A.
//
// 2)  Finally when A and B are of equal size, block swap them.
//
// Time Complexity: O(n)
// Auxiliary Space: O(1)

export function blockSwapArrayRotation(
  arr: number[],
  d: number,
  n = arr.length
) {
  if (d == 0 || d == n) return [];

  // If number of elements to be rotated is more than array size
  if (d > n) d = d % n;

  let i = d;
  let j = n - d;

  while (i != j) {
    if (i < j) {
      // A is shorter
      swap(arr, d - i, d + j - i, i);
      j -= i;
    } else {
      // B is shorter
      swap(arr, d - i, d, j);
      i -= j;
    }
  }

  // Finally, block swap A and B
  swap(arr, d - i, d, i);

  return arr;
}

// leftRotate([1, 2, 3, 4, 5, 6, 7], 2).join(', ')
// reversalLeftRotate([1, 2, 3, 4, 5, 6, 7], 2).join(', ');
// blockSwapArrayRotation([1, 2, 3, 4, 5, 6, 7], 2).join(', ');
