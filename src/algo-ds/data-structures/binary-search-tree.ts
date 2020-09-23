import { Compare, defaultCompare, ICompareFunction } from '../util';
import { Node } from './models/node';

export class BinarySearchTree<T> {
  protected root: Node<T>;

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {}

  insert(key: T) {
    // special case: first key
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  insertImperative(key: T) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNodeImperative(this.root, key);
    }
  }

  protected insertNode(node: Node<T>, key: T) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else if (node.right == null) {
      node.right = new Node(key);
    } else {
      this.insertNode(node.right, key);
    }
  }

  protected insertNodeImperative(node: Node<T>, key: T) {
    let prev: Node<T> = null;

    while (node != null) {
      prev = node;
      if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    if (this.compareFn(key, prev.key) === Compare.LESS_THAN) {
      prev.left = new Node(key);
    } else {
      prev.right = new Node(key);
    }
  }

  getRoot() {
    return this.root;
  }

  search(key: T) {
    return this.searchNode(this.root, key);
  }

  searchImperative(key: T) {
    return this.searchNodeImperative(this.root, key);
  }

  private searchNode(node: Node<T>, key: T) {
    if (node == null) {
      return false;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    }
    // key is equal to node.item
    return node;
  }

  private searchNodeImperative(root: Node<T>, key: T) {
    let target = root;
    while (target && key !== target.key) {
      if (this.compareFn(key, target.key) === Compare.LESS_THAN) {
        target = target.left;
      } else {
        target = target.right;
      }
    }

    return target;
  }

  inOrderTraverse(callback: Function) {
    this.inOrderTraverseNode(this.root, callback);
  }

  inOrderTraverseImperative(callback: Function) {
    this.inOrderTraverseNodeImperative(this.root, callback);
  }

  private inOrderTraverseNode(node: Node<T>, callback: Function) {
    if (node == null) {
      return;
    }

    this.inOrderTraverseNode(node.left, callback);
    callback(node.key);
    this.inOrderTraverseNode(node.right, callback);
  }

  private inOrderTraverseNodeImperative(node: Node<T>, callback: Function) {
    if (node == null) {
      return;
    }

    const stack = [];
    let temporaryNode = node;
    while (temporaryNode != null || stack.length > 0) {
      while (temporaryNode != null) {
        stack.push(temporaryNode);
        temporaryNode = temporaryNode.left;
      }

      temporaryNode = stack.pop();
      callback(temporaryNode.key);
      temporaryNode = temporaryNode.right;
    }
  }

  preOrderTraverse(callback: Function) {
    this.preOrderTraverseNode(this.root, callback);
  }

  preOrderTraverseImperative(callback: Function) {
    this.preOrderTraverseNodeImperative(this.root, callback);
  }

  private preOrderTraverseNode(node: Node<T>, callback: Function) {
    if (node == null) {
      return;
    }

    callback(node.key);
    this.preOrderTraverseNode(node.left, callback);
    this.preOrderTraverseNode(node.right, callback);
  }

  private preOrderTraverseNodeImperative(node: Node<T>, callback: Function) {
    if (node == null) {
      return;
    }

    const nodes: Node<T>[] = [];
    nodes.push(node);

    while (nodes.length) {
      let curr = nodes.pop();
      callback(curr.key);

      if (curr.right) {
        nodes.push(curr.right);
      }

      if (curr.left) {
        nodes.push(curr.left);
      }
    }
  }

  postOrderTraverse(callback: Function) {
    this.postOrderTraverseNode(this.root, callback);
  }

  postOrderTraverseImperative(callback: Function) {
    this.postOrderTraverseNodeImperative(this.root, callback);
  }

  private postOrderTraverseNode(node: Node<T>, callback: Function) {
    if (node == null) {
      return;
    }

    this.postOrderTraverseNode(node.left, callback);
    this.postOrderTraverseNode(node.right, callback);
    callback(node.key);
  }

  private postOrderTraverseNodeImperative(node: Node<T>, callback: Function) {
    if (node == null) {
      return;
    }

    let temp = node;
    const visited = new Set();

    while (temp && !visited.has(temp)) {
      if (temp.left && !visited.has(temp.left)) {
        temp = temp.left;
      } else if (temp.right && !visited.has(temp.right)) {
        temp = temp.right;
      } else {
        callback(temp.key);
        visited.add(temp);
        temp = node;
      }
    }
  }

  min() {
    return this.minNode(this.root);
  }

  minRecursive() {
    return this.minNodeRecursive(this.root);
  }

  protected minNode(node: Node<T>) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  protected minNodeRecursive(node: Node<T>): Node<T> {
    if (node.left == null) {
      return node;
    }
    return this.minNodeRecursive(node.left);
  }

  max() {
    return this.maxNode(this.root);
  }

  maxRecursive() {
    return this.maxNodeRecursive(this.root);
  }

  protected maxNode(node: Node<T>) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  protected maxNodeRecursive(node: Node<T>): Node<T> {
    if (node.right == null) {
      return node;
    }

    return this.maxNodeRecursive(node.right);
  }

  remove(key: T) {
    this.root = this.removeNode(this.root, key);
  }

  removeImperative(key: T) {
    this.root = this.removeNodeImperative(this.root, key);
  }

  protected removeNode(node: Node<T>, key: T) {
    if (node == null) {
      return null;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // key is equal to node.item

      // handle 3 special conditions
      // 1 - a leaf node
      // 2 - a node with only 1 child
      // 3 - a node with 2 children

      // case 1
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }

      // case 2
      if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }

      // case 3
      const aux = this.minNode(node.right);
      node.key = aux.key;
      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  }

  protected removeNodeImperative(node: Node<T>, key: T) {
    let current = node;
    let parent: Node<T> = null;
    let target: Node<T> = null;

    // Find the target node to be removed
    while (current != null) {
      if (key == current.key) {
        target = current;
        break;
      }
      parent = current;
      if (key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (target == null) {
      return node; // Node not found
    }

    // Case 1: Target node is a leaf node
    if (target.left == null && target.right == null) {
      if (parent == null) {
        return null; // Removing the root node of the tree
      }
      if (parent.left == target) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // Case 2: Target node has only one child
    else if (target.left == null || target.right == null) {
      let child = target.left != null ? target.left : target.right;
      if (parent == null) {
        return child; // Removing the root node of the tree
      }
      if (parent.left == target) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }
    // Case 3: Target node has two children
    else {
      let successor = target.right;
      let successorParent = target;
      while (successor.left != null) {
        successorParent = successor;
        successor = successor.left;
      }
      target.key = successor.key;
      if (successorParent.left == successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }

    return node;
  }
}
