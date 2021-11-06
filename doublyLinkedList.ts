export interface INode {
  value: Value;
  next: DoublyLinkedListNode | null;
  previous: DoublyLinkedListNode | null;
}
export type Value = number | string | { [key: string]: any };

export class DoublyLinkedListNode implements INode {
  constructor(
    public value: Value,
    public next: DoublyLinkedListNode | null = null,
    public previous: DoublyLinkedListNode | null = null
  ) {}
}

export interface INodeList {
  head: DoublyLinkedListNode | null;
  tail: DoublyLinkedListNode | null;
}

export class DoublyLinkedList implements INodeList {
  public head: DoublyLinkedListNode | null = null;
  public tail: DoublyLinkedListNode | null = null;

  prepend(value: Value): DoublyLinkedList {
    const newNode = new DoublyLinkedListNode(value, this.head);

    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: Value): DoublyLinkedList {
    const newNode = new DoublyLinkedListNode(value);

    if (this.tail) {
      this.tail.next = newNode;
    }

    newNode.previous = this.tail;

    this.tail = newNode;

    if (!this.head) {
      this.head = newNode;
    }

    return this;
  }

  find(value: Value | undefined): DoublyLinkedListNode | null {
    if (!this.head) {
      return null;
    }

    let currentNode: DoublyLinkedListNode | null = this.head;

    while (currentNode) {
      if (value !== undefined && currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  delete(value: Value): DoublyLinkedListNode | null {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    let currentNode = this.head as DoublyLinkedListNode | null;

    while (currentNode) {
      if (currentNode.value === value) {
        deletedNode = currentNode;

        if (deletedNode === this.head) {
          this.head = deletedNode.next;
          if (this.head) {
            this.head.previous = null;
          }

          if (deletedNode === this.tail) {
            this.tail = null;
          }
        } else if (deletedNode === this.tail) {
          this.tail = deletedNode.previous as DoublyLinkedListNode;
          this.tail.next = null;
        } else {
          const previousNode = deletedNode.previous as DoublyLinkedListNode;
          const nextNode = deletedNode.next as DoublyLinkedListNode;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deletedNode;
  }

  deleteTail(): DoublyLinkedListNode | null {
    if (!this.tail) {
      return null;
    }

    const deletedTail = this.tail;

    if (this.tail.previous) {
      this.tail = this.tail.previous;
      this.tail.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedTail;
  }

  deleteHead(): DoublyLinkedListNode | null {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }
}
