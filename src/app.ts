import DoublyLinkedList from './algo-ds/data-structures/doubly-linked-list';

const dll = new DoublyLinkedList<number>();

dll.push(1);
dll.push(2);
dll.push(3);
dll.push(4);
dll.push(6);

dll.insert(0, 0);
dll.insert(5, 4);
dll.insert(7, 6);

dll.remove(2);
dll.remove(4);
