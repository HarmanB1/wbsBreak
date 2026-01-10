import { DndContext } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";



const initialData = [
  { id: "1", parentId: null, name: "Phase 1: Foundation", status: "In Progress", effort: "High" },
  { id: "2", parentId: "1", name: "Setup Database", status: "Done", effort: "Low" },
  { id: "3", parentId: "1", name: "Auth System", status: "Review", effort: "Med" },
  { id: "4", parentId: null, name: "Phase 2: UI Design", status: "To Do", effort: "High" },
  { id: "5", parentId: "4", name: "Figma Mockups", status: "To Do", effort: "Low" },
  { id: "6", parentId: "4", name: "Component Library", status: "To Do", effort: "Med" },
];

class TreeNode {
  constructor(data) {
    this.id = data.id;
    this.parent = data.parent;
    this.name = data.name;
    this.status = data.status;
    this.children = data.children;
  }


}

class Tree {
  constructor(rootValue) {
    this.root = new TreeNode(rootValue);
  }
  addChild(node, parentNode) {
    parentNode.children.push(node);
    node.parent = parentNode;

  }

  killChild(node) {
    parent.node.children.push(...node.children);
    parent.children.filter(item => item != node);

    node.children.map(item => item.parent = node.parent);
    node.parent = null;



  }

  killFamily(node) {
    node.parent = null;
    if (!node.children.length) {
      return;
    } else {
      node.children.forEach(child => this.killFamily(child));

    }
    node.children = [];
  }

}


export const Wbs = () => {


};
