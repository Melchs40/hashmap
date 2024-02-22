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

  get(key) {
    let bucket = this.hash(key);
    if (this.array[bucket] == null) {
      return 'Key not found in array';
    } else {
      let currentNode = this.array[bucket];
      while (currentNode !== null) {
        if (currentNode.key == key) return currentNode.value;
        else currentNode = currentNode.next;
      }
      return 'Key not found in array';
    }
  }

  has(key) {
    let bucket = this.hash(key);
    if (this.array[bucket] == null) {
      return false;
    } else {
      let currentNode = this.array[bucket];
      while (currentNode !== null) {
        if (currentNode.key == key) return true;
        else currentNode = currentNode.next;
      }
      return false;
    }
  }

  remove(key) {
    let bucket = this.hash(key);
    if (this.array[bucket] == null) {
      return false;
    } else if (this.array[bucket].key == key) {
      let newNode = this.array[bucket];
      if (newNode.next == null) {
        this.array[bucket] = null;
        return true;
      } else {
        this.array[bucket] = new Node(
          this.array[bucket].next.key,
          this.array[bucket].next.value,
          this.array[bucket].next.next
        );
        return true;
      }
    } else {
      let currentNode = this.array[bucket];
      let prevNode = this.array[bucket];
      while (currentNode !== null) {
        if (currentNode.key == key) {
          prevNode.next = currentNode.next;
          return true;
        } else prevNode = currentNode;
        currentNode = currentNode.next;
      }
      return false;
    }
  }
}
