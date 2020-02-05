class Tree{
    constructor(root){
        this.prevNode = new TreeNode(null);
        this.nextNode = new TreeNode(root);
        this.rootNode = this.nextNode;

        this[Symbol.iterator] = function() { 
            return this;
        };
    }

    add(value){
        this.prevNode.addChild(new TreeNode(value));
        this.nextNode=this.prevNode.next().value;
    }
    
    addChildren(newChildren){
        // each child has to be a TreeNode...
        newChildren = newChildren.map( x => new TreeNode(x))

        this.prevNode.setChildren(newChildren);
        this.nextNode = this.prevNode.next().value;

    }

    hasNext(){
        return !!this.nextNode.value;
    }

    next(){
        if (!this.nextNode.value){
            console.log({done: true, value:undefined});
            return {done: true, value:undefined};
        }

        let tmp=this.nextNode.next();
        this.prevNode=this.nextNode;
        if (!tmp.done){
            this.nextNode=tmp.value;
        } else {
            this.nextNode = new TreeNode(null);
        }

        console.log({done: false, value:this.prevNode.value});
        return {done: false, value:this.prevNode.value};
    }
}

class TreeNode {

    constructor(value){
        this.value = value;
        this.parent = null;
        this.children = [];

    }

    setParent(parent){
        this.parent=parent;
    }

    addChild(child){
        child.parent=this;
        this.children.push(child);
    }

    setChildren(children){
        this.children = [...children];
        children.forEach(x => {
            x.setParent(this);
        });
        this.nextNode = this.next();
    }

    lookForNext(child){
        // child asked for the next node ...
        // lets find his index....
        let childIndex = this.children.indexOf(child)
        // not sure how the index could not be found...
        // unless misused...
        if (childIndex == -1) {
            return undefined;
        }

        // get the next index and if
        // it is still a valid index
        if ( ++childIndex < this.children.length){
            //return this.children[childIndex];
            return {done: false, value: this.children[childIndex]}
        }
        // child was the last element of the array,
        // so ask our parent for the next element...
        // but if we are the root..  return null...
        if (this.parent == null){
            return {done: true, value: undefined};
        }
        return this.parent.lookForNext(this);
    }

    next(){
        if (this.children.length>0){
            return {done: false, value: this.children[0]};
        }
        if (this.parent == null) return {done: true}; 
        return this.parent.lookForNext(this);
    }
    
   iterator(){
       return new Tree(this);
   }
}
