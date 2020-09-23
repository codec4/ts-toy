// Given a linked list, check if the linked list has loop or not. Below diagram shows a linked list with a loop.
//
// Example: 1 -> 2 -> 3
//               |    |
//               5 <- 4
//

// Solution 1: Hashing
// Approach:
// Traverse the list one by one and keep putting the node addresses in a Hash Table.
// At any point, if NULL is reached then return false and if next of current node
// points to any of the previously stored nodes in Hash then return true.

// Complexity Analysis:
//  Time complexity: O(n).
//  Only one traversal of the loop is needed.
//  Auxiliary Space: O(n).
//  n is the space required to store the value in hashmap.

class Node {
  constructor(
    public element: number | null = null,
    public next: Node | null = null
  ) {}
}

class LinkedList {
  public head: Node = new Node();

  constructor() {}

  public push(data: number): void {
    // 1 & 2: Allocate the Node & put in the data
    const newNode = new Node(data);

    // 3. Make next of new Node as head
    newNode.next = this.head;

    // 4. Move the head to point to new Node
    this.head = newNode;
  }

  public detectLoop(h: Node) {
    const s = new Set<Node>();

    while (h !== null) {
      // If we have already has this node
      // is hashmap it means their is a cycle
      // (Because you we encountering the node second time).
      if (s.has(h)) {
        return true;
      }

      s.add(h);

      h = h.next;
    }

    return false;
  }
}

export function test1() {
  const llist = new LinkedList();
  llist.push(20);
  llist.push(4);
  llist.push(15);
  llist.push(10);

  // Create loop for testing
  llist.head.next.next.next.next = llist.head;

  if (llist.detectLoop(llist.head)) {
    console.log('Loop Found');
  } else {
    console.log('No Loop');
  }
}

// Solution 2: This problem can be solved without hashmap by modifying the linked list data-structure.
// Approach: This solution requires modifications to the basic linked list data structure.
//   Have a visited flag with each node.
//   Traverse the linked list and keep marking visited nodes.
//   If you see a visited node again then there is a loop. This solution works in O(n) but requires additional information with each node.
//   A variation of this solution that doesn’t require modification to basic data structure can be implemented using a hash, just store the addresses of visited nodes in a hash and if you see an address that already exists in hash then there is a loop.

// Complexity Analysis:
//   Time complexity:O(n).
//   Only one traversal of the loop is needed.
//   Auxiliary Space:O(1).
//   No extra space is needed.

class NodeFlag {
  constructor(
    public element: number | null = null,
    public next: NodeFlag | null = null,
    public flag: number | null = null
  ) {}
}

class LinkedListFlag {
  public head = new NodeFlag();

  constructor() {}

  public push(data: number): void {
    // 1 & 2: Allocate the Node & put in the data
    const newNode = new NodeFlag(data);

    // 3. Make next of new Node as head
    newNode.next = this.head;
    newNode.flag = 0;

    // 4. Move the head to point to new Node
    this.head = newNode;
  }

  public detectLoop(h: NodeFlag) {
    while (h !== null) {
      // If this node is already traverse
      // it means there is a cycle
      // (Because you we encountering the node for the second time).
      if (h.flag === 1) {
        return true;
      }

      // If we are seeing the node for the first time, mark its flag as 1
      h.flag = 1;
      h = h.next;
    }

    return false;
  }
}

export function test2() {
  const llist = new LinkedListFlag();
  llist.push(20);
  llist.push(4);
  llist.push(15);
  llist.push(10);

  // Create loop for testing
  llist.head.next.next.next.next = llist.head;

  if (llist.detectLoop(llist.head)) {
    console.log('Loop Found');
  } else {
    console.log('No Loop');
  }
}
