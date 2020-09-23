// Write a function detectAndCountLoop() that checks whether a given Linked List contains loop and if loop
// is present then returns count of nodes in loop. For example, the loop is present in below-linked list and
// length of the loop is 4. If the loop is not present, then the function should return 0.

// Example: 1 -> 2 -> 3
//               |    |
//               5 <- 4

// Approach: It is known that Floyd’s Cycle detection algorithm terminates when fast and slow pointers meet at a common point. It is also known that this common point is one of the loop nodes. Store the address of this common point in a pointer variable say (ptr). Then initialize a counter with 1 and start from the common point and keeps on visiting the next node and increasing the counter till the common pointer is reached again.
// At that point, the value of the counter will be equal to the length of the loop.

// Algorithm:
//     Find the common point in the loop by using the Floyd’s Cycle detection algorithm
//     Store the pointer in a temporary variable and keep a count = 0
//     Traverse the linked list until the same node is reached again and increase the count while moving to next node.
//     Print the count as length of loop

class Node {
  constructor(public element: number, public next?: Node) {}
}

function countNodes(n: Node) {
  let res = 1;
  let temp = n;

  while (temp.next !== n) {
    res++;
    temp = temp.next;
  }

  return res;
}

function countNodesInLoop(list: Node) {
  let slow_p = list;
  let fast_p = list;

  while (slow_p !== null && fast_p !== null && fast_p.next !== null) {
    slow_p = slow_p.next;
    fast_p = fast_p.next.next;

    if (slow_p === fast_p) {
      return countNodes(slow_p);
    }
  }

  return 0;
}

export function test() {
  let head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  head.next.next.next = new Node(4);
  head.next.next.next.next = new Node(5);

  head.next.next.next.next.next = head.next;

  return countNodesInLoop(head);
}

// Time complexity: O(n).
// Only one traversal of the linked list is needed.
// Auxiliary Space: O(1).
// As no extra space is required.
