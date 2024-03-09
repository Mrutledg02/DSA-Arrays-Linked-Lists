const { DoublyLinkedList, CircularArray } = require("./doubly-linked-list");

describe("DoublyLinkedList", () => {
describe("push", function() {
  it("appends node and increments length", function() {
    let lst = new DoublyLinkedList();

    lst.push(5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.push(10);
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.tail.val).toBe(10);

    lst.push(15);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.next.val).toBe(15);
    expect(lst.tail.val).toBe(15);
  });
});

describe("unshift", function() {
  it("adds node at start and increments length", function() {
    let lst = new DoublyLinkedList();

    lst.unshift(5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.unshift(10);
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe(10);
    expect(lst.head.next.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.unshift(15);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe(15);
    expect(lst.head.next.next.val).toBe(5);
    expect(lst.tail.val).toBe(5);
  });
});

describe("pop", function() {
  it("removes node at end and decrements length", function() {
    let lst = new DoublyLinkedList([5, 10]);

    expect(lst.pop()).toBe(10);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);
    expect(lst.length).toBe(1);

    expect(lst.pop()).toBe(5);
    expect(lst.tail).toBe(null);
    expect(lst.head).toBe(null);
    expect(lst.length).toBe(0);
  });
});

describe("shift", function() {
  it("removes node at start and decrements length", function() {
    let lst = new DoublyLinkedList([5, 10]);

    expect(lst.shift()).toBe(5);
    expect(lst.tail.val).toBe(10);
    expect(lst.length).toBe(1);

    expect(lst.shift()).toBe(10);
    expect(lst.tail).toBe(null);
    expect(lst.head).toBe(null);
    expect(lst.length).toBe(0);
  });
});

describe("getAt", function() {
  it("gets val at index", function() {
    let lst = new DoublyLinkedList([5, 10]);

    expect(lst.getAt(0)).toBe(5);
    expect(lst.getAt(1)).toBe(10);
  });
});

describe("setAt", function() {
  it("sets val at index", function() {
    let lst = new DoublyLinkedList([5, 10]);

    expect(lst.setAt(0, 1));
    expect(lst.setAt(1, 2));
    expect(lst.head.val).toBe(1);
    expect(lst.head.next.val).toBe(2);
  });
});

describe("insertAt", function() {
  it("inserts node and adjusts nearby nodes", function() {
    let lst = new DoublyLinkedList([5, 10, 15, 20]);

    lst.insertAt(2, 12);
    expect(lst.length).toBe(5);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.head.next.next.val).toBe(12);
    expect(lst.head.next.next.next.val).toBe(15);
    expect(lst.head.next.next.next.next.val).toBe(20);

    lst.insertAt(5, 25);
    expect(lst.head.next.next.next.next.next.val).toBe(25);
    expect(lst.tail.val).toBe(25);
  });

  it("inserts into empty list", function() {
    let lst = new DoublyLinkedList();

    lst.insertAt(0, 5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);
  });
});

describe("removeAt", function() {
  it("removes from 1-item list", function() {
    let lst = new DoublyLinkedList(["a"]);

    lst.removeAt(0);
    expect(lst.length).toBe(0);
    expect(lst.head).toBe(null);
    expect(lst.tail).toBe(null);
  });
});

describe("average", function() {
  it("calculates the average of items in a list", function() {
    let lst = new DoublyLinkedList([2, 3, 1, 1, 7, 6, 9]);
    expect(lst.average()).toBeCloseTo(4.1429, 4);
  });

  it("returns 0 for empty lists", function() {
    let lst = new DoublyLinkedList();
    expect(lst.average()).toBe(0);
  });
});

describe("reverse", function() {
  it("reverses the list", function() {
    let lst = new DoublyLinkedList([1, 2, 3, 4, 5]);
    lst.reverse();
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(4);
    expect(lst.head.next.next.val).toBe(3);
    expect(lst.head.next.next.next.val).toBe(2);
    expect(lst.head.next.next.next.next.val).toBe(1);
  });
});

describe("mergeSortedLists", function() {
  it("merges two sorted lists", function() {
    let lst1 = new DoublyLinkedList([1, 3, 5, 7]);
    let lst2 = new DoublyLinkedList([2, 4, 6, 8]);

    let merged = lst1.mergeSortedLists(lst1, lst2);
    expect(merged.head.val).toBe(1);
    expect(merged.head.next.val).toBe(2);
    expect(merged.head.next.next.val).toBe(3);
    expect(merged.head.next.next.next.val).toBe(4);
    expect(merged.head.next.next.next.next.val).toBe(5);
    expect(merged.head.next.next.next.next.next.val).toBe(6);
    expect(merged.head.next.next.next.next.next.next.val).toBe(7);
    expect(merged.head.next.next.next.next.next.next.next.val).toBe(8);
  });
});

describe("pivot", function() {
  it("pivots the list around a value", function() {
    let lst = new DoublyLinkedList([3, 5, 8, 5, 10, 2, 1]);
    lst.pivot(5);
    expect(lst.head.val).toBe(3);
    expect(lst.head.next.val).toBe(2);
    expect(lst.head.next.next.val).toBe(1);
    expect(lst.head.next.next.next.val).toBe(5);
    expect(lst.head.next.next.next.next.val).toBe(8);
    expect(lst.head.next.next.next.next.next.val).toBe(5);
    expect(lst.head.next.next.next.next.next.next.val).toBe(10);
  });
});
});

describe('CircularArray', () => {
  let circ;

  beforeEach(() => {
      circ = new CircularArray();
      circ.addItem('harry');
      circ.addItem('hermione');
      circ.addItem('ginny');
      circ.addItem('ron');
  });

  test('addItem adds items to the circular array', () => {
      expect(circ.length).toBe(4);
  });

  test('rotateRight rotates the circular array to the right', () => {
    circ.rotateRight(1);
    expect(circ.getByIndex(0)).toBe('ron');
    expect(circ.getByIndex(1)).toBe('harry');
    expect(circ.getByIndex(2)).toBe('hermione');
    expect(circ.getByIndex(3)).toBe('ginny');
});

test('rotateLeft rotates the circular array to the left', () => {
    circ.rotateLeft(1);
    expect(circ.getByIndex(0)).toBe('hermione');
    expect(circ.getByIndex(1)).toBe('ginny');
    expect(circ.getByIndex(2)).toBe('ron');
    expect(circ.getByIndex(3)).toBe('harry');
});

  test('rotate rotates the circular array by specified number of steps', () => {
      circ.rotate(2);
      expect(circ.getByIndex(0)).toBe('ginny');
      expect(circ.getByIndex(1)).toBe('ron');
      expect(circ.getByIndex(2)).toBe('harry');
      expect(circ.getByIndex(3)).toBe('hermione');
  });

  test('getByIndex retrieves item by index', () => {
      expect(circ.getByIndex(2)).toBe('ginny');
  });

  test('getByIndex returns null for out of range indexes', () => {
      expect(circ.getByIndex(15)).toBe(null);
  });

  test('printArray prints the circular array', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation();
      circ.printArray();
      expect(spy).toHaveBeenCalledWith('harry');
      expect(spy).toHaveBeenCalledWith('hermione');
      expect(spy).toHaveBeenCalledWith('ginny');
      expect(spy).toHaveBeenCalledWith('ron');
      spy.mockRestore();
  });
});