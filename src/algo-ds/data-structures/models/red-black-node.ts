import { Node } from './node';

export enum Colors {
  RED = 0,
  BLACK = 1
}

export class RedBlackNode<K> extends Node<K> {
  left: RedBlackNode<K> = null;
  right: RedBlackNode<K> = null;
  parent: RedBlackNode<K>;
  color: Colors;

  constructor(public key: K) {
    super(key);
    this.color = Colors.RED;
  }

  isRed() {
    return this.color === Colors.RED;
  }
}
