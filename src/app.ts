// import { BinarySearchTree } from './algo-ds/data-structures/binary-search-tree';
import { AVLTree } from './algo-ds/data-structures/avl-tree';

const t = new AVLTree<number>();

const values = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25, 6];
// const values = [11, 7, 15, 5];

for (const v of values) {
  t.insert(v);
}
