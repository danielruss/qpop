class Tree {
  constructor() {
    this.rootNode = new TreeNode("__ROOT__");
    this.currentNode = this.rootNode;
    this.previousNode = null;
    this.nextNode = null;
    this.verbose = false;
  }

  isAtRoot() {
    return this.currentNode == this.rootNode;
  }

  isFirst() {
    return this.previousNode == this.rootNode;
  }

  setVerbose(verbose) {
    this.verbose = Boolean(verbose);
  }

  // replaces the children of the currentNode with newChildren
  setChildren(newChildren) {
    if (this.verbose) console.log("SC: attempting to set children for node: ", this.currentNode);
    if (this.verbose) console.log("attempting to set children to ", newChildren);
    // if a null is passed in, clear the children...
    if (newChildren == null) {
      newChildren = [];
    }

    // if newChilren is not an array, make it one
    if (!Array.isArray(newChildren)) {
      newChildren = [newChildren];
    }

    // convert newChildren into an array of TreeNodes
    newChildren = newChildren.map((x) => {
      return new TreeNode(x);
    });
    newChildren.forEach((x) => {
      x.setParent(this.currentNode);
    });

    if (this.verbose) console.log("SC: setting children to ", newChildren);
    this.currentNode.setChildren(newChildren);
    this.nextNode = this.currentNode.dfs_next();
    if (this.verbose) console.log("SC: set next to: ", this.nextNode);
  }

  next() {
    if (this.nextNode == null) {
      if (this.verbose) console.log("attempting to go past the end of the tree.");
      return false;
    }
    this.previousNode = this.currentNode;
    this.currentNode = this.nextNode;
    this.nextNode = this.currentNode.dfs_next();
    if (this.verbose) console.log("set next node to ", this.nextNode);
    return true;
  }

  previous() {
    if (this.previousNode == null) {
      return false;
    }

    this.nextNode = this.currentNode;
    this.currentNode = this.previousNode;
    this.previousNode = this.currentNode.dfs_previous();
    return true;
  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  setParent(parent) {
    this.parentNode = parent;
  }

  setChildren(newChildren) {
    this.children = newChildren;
  }

  getNextChild(node) {
    // find the node in my children and return the next
    // if the indx is 0, it was -1 (i.e. node was not in the children array),
    // so that is a problem...
    let indx = this.children.indexOf(node) + 1;
    if (indx == 0) {
      // consider an error...
      return null;
    }

    // I am out of children.. tell me parent to goto
    // my sibling
    if (indx >= this.children.nextNode) {
      // If I am the rootNode and I am finished with my children,
      // then we are finished... there is no next
      if (parentNode == null) return null;

      return this.parentNode.getNextChild(this);
    }
    // return the next sibling...
    return this.children[indx];
  }
  // using a depth first search.. get the next node...
  dfs_next() {
    // my next is either... my first child
    if (this.children.length > 0) {
      return this.children[0];
    }

    // I am the parent root, and I have
    // no children...  nothing is next.
    if (this.parentNode == null) return null;

    // ask my parent to get my sibling
    return this.parentNode.getNextChild(this);
  }

  dfs_previous() {
    // if I am the root, Nothing comes before me...
    if (this.parentNode == null) return null;

    // ask my parent to get my previous sibling...
    return this.parentNode.getPreviousChild(this);
  }

  getPreviousChild(node) {
    let indx = this.children.indexOf(node) - 1;
    // this is bad... we would have had a value of -1
    // node is not in my children array.
    if (indx < -1) {
      return null;
    }

    // return the previous node
    if (indx >= 0) {
      return this.children[0];
    }

    // my first child is asking for the previous
    // which is me...
    return this;
  }
}
