class Node {
    constructor(val) {
        this.value = val;
        this.parent = null,
            this.child = []
    }
}

class Tree {
    constructor(val) {
        let newNode = new Node(val)
        this.root = newNode;
    }

    insert(value, parentNode = this.root) {
        parentNode.child.push(new Node(value));
    }

    traverse(node, callback) {

        callback(node);
        if (node.child.length !== 0) {
            for (let i = 0; i < node.child.length; i++) {
                this.traverse(node.child[i], callback);
            }

        }
    }
}

export default Tree;