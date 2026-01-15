import { DndContext, useDraggable } from "@dnd-kit/core";
import { useRef, useCallback, useState, useEffect, useMemo } from 'react';

const initialData = [
  { id: "1", parentId: null, name: "Phase 1: Foundation" },
  { id: "2", parentId: "1", name: "Setup Database" },
  { id: "3", parentId: "1", name: "Auth System" },
  { id: "4", parentId: null, name: "Phase 2: UI Design" },
  { id: "5", parentId: "4", name: "Figma Mockups" },
  { id: "6", parentId: "4", name: "Component Library" },
  { id: "7", parentId: null, name: "Phase 3: Backend" },
  { id: "8", parentId: "7", name: "API Routes" },
  { id: "9", parentId: "7", name: "Data Models" },
  { id: "10", parentId: "2", name: "PostgreSQL Setup" },
  { id: "11", parentId: "2", name: "Migration Scripts" },
  { id: "12", parentId: "5", name: "Design System" },
  { id: "13", parentId: "6", name: "Button Components" },
  { id: "14", parentId: "6", name: "Form Components" },
];
class TreeNode {
  constructor(data) {
    this.id = data.id;
    this.parentId = data.parentId;
    this.name = data.name;
    this.children = [];
  }
}

const TaskNode = ({ node, onMove }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: node.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: 10
  };

  const coordRef = useRef(null);

  useEffect(() => {
    if (coordRef.current) {
      const rect = coordRef.current.getBoundingClientRect();
      onMove(
        node.id,
        rect.left + rect.width / 2 + window.scrollX,
        rect.top + rect.height / 2 + window.scrollY
      );
    }
  }, [transform, node.id, onMove]);

  return (
    <div
      ref={(el) => { setNodeRef(el); coordRef.current = el; }}
      style={style} {...listeners} {...attributes}
      className="p-4 bg-white border border-black rounded shadow-sm cursor-move w-40 text-center relative"
    >
      {node.name}
    </div>
  );
};

export const Wbs = () => {
  const reg = useRef({});
  const [, setRender] = useState(0);

  const updateReg = useCallback((id, x, y) => {
    reg.current[id] = { x, y };
    setRender(p => p + 1);
  }, []);

  const { roots, allNodes } = useMemo(() => {
    const map = {};
    const results = [];
    initialData.forEach(item => { map[item.id] = new TreeNode(item); });
    initialData.forEach(item => {
      if (item.parentId && map[item.parentId]) {
        map[item.parentId].children.push(map[item.id]);
      } else {
        results.push(map[item.id]);
      }
    });
    return { roots: results, allNodes: Object.values(map) };
  }, []);

  const renderTree = (node) => (
    <div key={node.id} className="flex flex-col items-center">
      <div className="p-10">
        <TaskNode node={node} onMove={updateReg} />
      </div>
      <div className="flex flex-row gap-4">
        {node.children.map(child => renderTree(child))}
      </div>
    </div>
  );

  return (
    <DndContext>
      <div className="relative min-h-screen p-20">
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {allNodes.map(node => {
            const start = reg.current[node.parentId];
            const end = reg.current[node.id];
            if (!start || !end) return null;
            return (
              <line
                key={node.id}
                x1={start.x} y1={start.y}
                x2={end.x} y2={end.y}
                stroke="black" strokeWidth="2"
              />
            );
          })}
        </svg>

        <div className="flex flex-row justify-center gap-20 relative z-10">
          {roots.map(root => renderTree(root))}
        </div>
      </div>
    </DndContext>
  );
};
