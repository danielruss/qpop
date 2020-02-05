// the iterable protocol allows for .map and for loop.
// lets make a simple object and change it's iteration behavior

let x = ["dog","cat","bird","squirrel","tiger","lion","panther","puma"];
x.map( y => console.log(y))

function makeRangeIterator(array,start = 0, end = array.length, step = 1 ){
    let nextIndex = start;
    
    const rangeIterator = {
        next: function(){
            end = Math.min(array.length,end);
            if (nextIndex < end ){
                let result = {value: array[nextIndex], done: nextIndex >= end};
                nextIndex+=step;
                return result
            }
            return {value:null,done:true}
        },

        previous: function(){
            if (nextIndex>0){
                nextIndex-=step;
                return {value: array[nextIndex], done: nextIndex <= 0};
            }
            return {value:null,done:true};
        },

        hasPrevious: function(){
            return (nextIndex>0);
        },

        hasNext: function(){
            console.log(nextIndex)
            return nextIndex < Math.min(array.length,end);
        }

        
    } ;

    return rangeIterator;
}

class Tree{
    constructor(root){
        this.current = root;

        this[Symbol.iterator] = function() { 
            return this;
        };
    }


    next(){
        let tmp = this.current.next();
        if (!tmp.done){
            let rv = {done: false, value:this.current}
            this.current = tmp.value;
            return(rv);
        }

        return(tmp);
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


let q1 = new TreeNode("Q1");

let q2 = new TreeNode("Q2");
q1.addChild(q2);
let q3 = new TreeNode("Q3");
q2.addChild(q3)
let q3a = new TreeNode("Q3a")
q3.addChild(q3a)
let q4=new TreeNode("Q4");
q2.addChild(q4)
let q5=new TreeNode("Q5");
q2.addChild(q5)
let q6=new TreeNode("Q6");
q2.addChild(q6)
let q7=new TreeNode("Q7");
q6.addChild(q7);
let q8=new TreeNode("Q8");
q7.addChild(q8);


tree = q1.iterator();

for (let x1 of tree){
    console.log(x1)
}

/*
var lastV = null;
for (let z of q1){

    console.log(z);
    if (z == lastV){
        break;
    }
    lastV=z;
}
*/



createNode = function(nodeValue){
    let node = {
        parent: null,
        value: nodeValue,
        children: [],

        previous: function(){
            if (!parent) return {done, undefined};
        },

        next: function(){
            // if I have a child, my first child is next...
            if (this.children.length>0) return {done:false,value: children[0]};

            // ask my parent to get my next sibling...
            // if I am the root, I am finished.
            if (parent == null){
                return {done:true,value: undefined};
            }
            return parent.lookForNextSibling(this);
        },

        [Symbol.iterator](){
            return this;
        },

        lookForNextSibling: function(x){
            console.log(this);
            // find x in the children 
            let nextIndex = this.children.indexOf(x)+1;
            if (nextIndex < this.children.length){
                return {done:false,value:this.children[nextIndex]};
            }
            
            if (parent != null){
                return parent.lookForNextSibling(this);
            }
            return {done: true, value:undefined};
        },

        setParent: function(parent){
            this.parent = parent;
        },

        addChild: function(child){
            console.log(this.value +" is adding "+child.value)
            this.children.push(child);
            child.setParent(this);
        }
    }
    return node;
}

