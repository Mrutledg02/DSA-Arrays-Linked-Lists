/** Node: node for a doubly linked list. */

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

/** DoublyLinkedList: doubly linked list. */
class DoublyLinkedList {
    constructor(vals = []) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        for (let val of vals) this.push(val);
    }

    /** push(val): add new value to end of list. */
    push(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    /** unshift(val): add new value to start of list. */
    unshift(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    /** pop(): return & remove last item. */
    pop() {
        if (!this.head) return null;
        const val = this.tail.val;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
          } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
          }
          this.length--;
          return val;
        }

    /** shift(): return & remove first item. */
    shift() {
        if (!this.head) return null;
        const val = this.head.val;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
          } else {
            this.head = this.head.next;
            this.head.prev = null;
          }
          this.length--;
          return val;
        }

    /** getAt(idx): get val at idx. */
    getAt(idx) {
        if (idx < 0 || idx >= this.length) return null;

        let current = this.head;
        for (let i = 0; i < idx; i++) {
            current = current.next;
        }
        return current.val;
    }

    /** setAt(idx, val): set val at idx to val */
    setAt(idx, val) {
        if (idx < 0 || idx >= this.length) return null;

        let current = this.head;
        for (let i = 0; i < idx; i++) {
            current = current.next;
        }
        current.val = val;
    }

    /** insertAt(idx, val): add node w/val before idx. */
    insertAt(idx, val) {
        if (idx < 0 || idx > this.length) return null;

        if (idx === 0) return this.unshift(val);
        if (idx === this.length) return this.push(val);

        const newNode = new Node(val);
        let current = this.head;
        for (let i = 0; i < idx; i++) {
            current = current.next;
        }

        newNode.prev = current.prev;
        newNode.next = current;
        current.prev.next = newNode;
        current.prev = newNode;

        this.length++;
    }

    /** removeAt(idx): return & remove item at idx, */
    removeAt(idx) {
        if (idx < 0 || idx >= this.length) return null;

        if (idx === 0) {
            return this.shift();
          }
          if (idx === this.length - 1) {
            return this.pop();
          }
          let current = this.head;
          for (let i = 0; i < idx; i++) {
            current = current.next;
          }
          current.prev.next = current.next;
          current.next.prev = current.prev;
          this.length--;
          return current.val;
        }

    /** average(): return an average of all values in the list */
    average() {
        if (!this.head) return 0;

        let total = 0;
        let current = this.head;
        while (current) {
            total += current.val;
            current = current.next;
        }

        return total / this.length;
    }

    /** reverse(): reverse the list in place */
    reverse() {
        let current = this.head;
        this.head = this.tail;
        this.tail = current;
      
        while (current) {
          let temp = current.next;
          current.next = current.prev;
          current.prev = temp;
          current = temp;
        }
      
        // Fixing the assignment of head
        return this.head;
      } 
    
    /** mergeSortedLists(a, b): merge two sorted lists: a & b */
    mergeSortedLists(a, b) {
        const mergedList = new DoublyLinkedList();

        let currentA = a.head;
        let currentB = b.head;

        while (currentA !== null && currentB !== null) {
            if (currentA.val < currentB.val) {
                mergedList.push(currentA.val);
                currentA = currentA.next;
            } else {
                mergedList.push(currentB.val);
                currentB = currentB.next;
            }
        }

        while (currentA !== null) {
            mergedList.push(currentA.val);
            currentA = currentA.next;
        }

        while (currentB !== null) {
            mergedList.push(currentB.val);
            currentB = currentB.next;
        }

        return mergedList;
    }

    /**pivot(pivotValue):  */
    pivot(pivotValue) {
        if (!this.head) return null;
        let current = this.head;
        let lessThanList = new DoublyLinkedList(); // List for nodes with values less than pivotValue
        let greaterEqualList = new DoublyLinkedList(); // List for nodes with values greater than or equal to pivotValue
    
        // Traverse the original list and split nodes into two separate lists
        while (current !== null) {
          if (current.val < pivotValue) {
            lessThanList.push(current.val);
          } else {
            greaterEqualList.push(current.val);
          }
          current = current.next;
        }
    
        // Update the head of the original list to point to the head of the list with values less than pivotValue
        this.head = lessThanList.head;
    
        // If there are nodes with values less than pivotValue, link them with the nodes from the other list
        if (lessThanList.head !== null) {
          lessThanList.tail.next = greaterEqualList.head;
        } else {
          // If there are no nodes with values less than pivotValue, set the head of the original list to the head of the other list
          this.head = greaterEqualList.head;
        }
    
        // Update the tail of the original list to be the tail of the other list
        this.tail = greaterEqualList.tail;
    
        // Update the length of the original list
        this.length = lessThanList.length + greaterEqualList.length;
      }
    
}

/** CircularArray: circular array */
class CircularArray {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.current = null; // Track the current node after rotation
    }

    // Add item to the circular array
    addItem(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            newNode.next = this.head;
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.head.prev = newNode;
            this.tail = newNode;
        }
        this.length++;
        this.current = newNode; // Set current node to the newly added node
    }

    // Rotate the circular array to the right
    rotateRight(steps) {
        for (let i = 0; i < steps; i++) {
            this.current = this.current.prev; // Change direction to prev for rotating right
        }
    }

    // Rotate the circular array to the left
    rotateLeft(steps) {
        steps = (steps < 0) ? -steps : steps; // Convert negative steps to positive
        for (let i = 0; i < steps; i++) {
            this.current = this.current.next; // Change direction to next for rotating left
        }
    }

    // Rotate the circular array by specified number of steps
    rotate(steps) {
        if (steps > 0) {
            this.rotateRight(steps % this.length);
        } else if (steps < 0) {
            this.rotateLeft(-steps % this.length); // Make steps positive for left rotation
        }
    }

    // Get item by index
    getByIndex(index) {
        if (index >= 0 && index < this.length) {
            let currentNode = this.current;
            for (let i = 0; i < index + 1; i++) {
                currentNode = currentNode.next;
            }
            return currentNode.val;
        } else {
            return null;
        }
    }

    // Print the circular array
    printArray() {
        let currentNode = this.current;
        for (let i = 0; i < this.length; i++) {
            console.log(currentNode.val);
            currentNode = currentNode.next;
        }
    }
}




// Example usage of reverse() function:
// const ll = new DoublyLinkedList([1, 2, 3, 4, 5]);
// console.log("Original list:", ll);

// ll.reverse();
// console.log("Reversed list:", ll);

// Example usage of pivot(pivotValue):
// const ll = new DoublyLinkedList([7, 6, 2, 3, 9, 1, 1]);
// console.log("Original list:", ll);
// ll.pivot(5);
// console.log("Pivoted list:", ll);

// Traverse the list from head to tail and log the values of each node
// let currentNode = ll.head;
// while (currentNode) {
//   console.log(currentNode.val);
//   currentNode = currentNode.next;
// }

// Example usage:
let circ = new CircularArray();
circ.addItem('harry');
circ.addItem('hermione');
circ.addItem('ginny');
circ.addItem('ron');

// circ.printArray();
// circ.rotate(-16);
// circ.printArray();

// circ.printArray();
// circ.rotateLeft(-3);
// circ.printArray();

// circ.printArray();
// circ.rotateRight(1);
// circ.printArray();

console.log(circ.getByIndex(0)); // 'harry'

module.exports = { DoublyLinkedList, CircularArray };
