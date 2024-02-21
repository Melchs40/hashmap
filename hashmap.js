class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class Hashmap {
  constructor() {
    this.array = new Array(16).fill(null);
    this.capacity = this.array.length;
    this.loadFactor = 0.75;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.array.length;
  }

  set(key, value) {
    let newNode = new Node(key, value);
    let bucket = this.hash(key);
    if (this.array[bucket] == null) {
      this.array[bucket] = newNode;
    } else {
      let currentNode = this.array[bucket];
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
  }
}
