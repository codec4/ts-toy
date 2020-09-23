export class Node<K> {
  left: Node<K> = null;
  right: Node<K> = null;

  constructor(public key: K) {}

  toString() {
    return `${this.key}`;
  }
}
