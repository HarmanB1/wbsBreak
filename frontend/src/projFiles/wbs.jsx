import { DndContext } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";



const initialData = [
  { id: "1", parentId: null, name: "Phase 1: Foundation", status: "In Progress", effort: "High" },
  { id: "2", parentId: "1", name: "Setup Database", status: "Done", effort: "Low" },
  { id: "3", parentId: "1", name: "Auth System", status: "Review", effort: "Med" },
  { id: "4", parentId: null, name: "Phase 2: UI Design", status: "To Do", effort: "High" },
  { id: "5", parentId: "4", name: "Figma Mockups", status: "To Do", effort: "Low" },
  { id: "6", parentId: "4", name: "Component Library", status: "To Do", effort: "Med" },
];

/*Tree class defs*/

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

  rootVal() {
    return this.root;
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


const TaskNode = ({ node }) => {
  const { attributes, listeners, setNodeRef, transform, } = useDraggable({ id: "box", });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  }
  return (
    <div className="relative" {...listeners} {...attributes}>
      <div ref={setNodeRef} style={style}>

      </div>

    </div>

  )
}

const RecRender = (root) => {
  root &&
    (
      <TaskNode node={root} />
    )
  root.children.map((child) => RecRender({ child }));
}


export const Wbs = ({ Tree }) => {

  return (< DndContext >


  </DndContext >
  )


};
