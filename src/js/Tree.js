class Node {
    constructor(val) {
        this.value = val;
        this.child = []
    }
}

class Tree {
    constructor(val) {
        let newNode = new Node(val)
        this.root = newNode;
    }

    traverse(node, callback) {

       callback(node);
        if (node.child.length !== 0) {
            for (let i = 0; i < node.child.length; i++) {
                 this.traverse(node.child[i], callback);
            }

        }
    }

    insert(value, parentNode = this.root) {
        if(parentNode.child.length===0)
        {
            parentNode.child.push(new Node(value));
        }
        else{
            for(let i=0; i< parentNode.child.length;i++){
            this.insert(value, parentNode.child[i]);
            }
        }
    }
}

export default Tree;