import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { forwardRef, useRef, useCallback, useState, useEffect, useMemo } from 'react';

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

const TaskNode = ({ node, positions, onPositionUpdate, isOver, treeRef, ghostPosition }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: node.id,
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id: node.id,
  });

  const coordRef = useRef(null);

  //calculates on mount and transform 
  useEffect(() => {
    if (coordRef.current && !isDragging) {

      const containerRec = treeRef.current.getBoundingClientRect();
      const rect = coordRef.current.getBoundingClientRect();
      const x = rect.left - containerRec.left + rect.width / 2 + treeRef.current.scrollLeft;
      const y = rect.top - containerRec.top + rect.height / 2 + treeRef.current.scrollTop;      // Only update if position actually changed
      if (!positions.current[node.id] ||
        positions.current[node.id].x !== x ||
        positions.current[node.id].y !== y) {
        onPositionUpdate(node.id, x, y);
      }
    }
  }, [isDragging, node.id]);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: 0.5,
    zIndex: 1000
  } : ghostPosition ? {
    opacity: 0.4,
    position: 'absolute',
    left: ghostPosition.x,
    top: ghostPosition.y,
    zIndex: 999
  } : {
    zIndex: 10
  };

  return (
    <div
      ref={(el) => {
        setNodeRef(el);
        setDropRef(el);
        coordRef.current = el;
      }}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-4 bg-white border-2 rounded-lg shadow-sm cursor-move w-48 text-center transition-colors
        ${isOver ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300' : 'border-gray-300 hover:border-gray-400'}
        ${isDragging ? 'shadow-2xl' : ''}`}
    >
      <div className="font-medium text-sm">{node.name}</div>
    </div>
  );
};

//recursive func to render the nodeIds
const Branch = ({ nodeId, dataMap, positions, onPositionUpdate, activeId, overId, ghostPosition, treeRef }) => {
  const node = dataMap[nodeId];
  if (!node) return null;

  const childIds = Object.keys(dataMap).filter(id => dataMap[id].parentId === nodeId);

  return (
    <div className="flex flex-col items-center">
      <div className="p-6">
        <TaskNode
          node={node}
          positions={positions}
          onPositionUpdate={onPositionUpdate}
          isOver={overId === node.id && activeId !== node.id}
          ghostPosition={ghostPosition && ghostPosition.nodeId === node.id ? ghostPosition : null}
          treeRef={treeRef}
        />
      </div>
      {childIds.length > 0 && (
        <div className="flex flex-row gap-8">
          {childIds.map(childId => (
            <Branch
              key={childId}
              nodeId={childId}
              dataMap={dataMap}
              positions={positions}
              onPositionUpdate={onPositionUpdate}
              activeId={activeId}
              overId={overId}
              ghostPosition={ghostPosition}
              treeRef={treeRef}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Wbs = () => {
  const positions = useRef({});
  const treeRef = useRef(null);
  const [dataMap, setDataMap] = useState(() => {
    const map = {};
    initialData.forEach(item => { map[item.id] = { ...item }; });
    return map;
  });
  const [lineVersion, setLineVersion] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [ghostPosition, setGhostPosition] = useState(null);

  const rootIds = useMemo(() =>
    Object.keys(dataMap).filter(id => !dataMap[id].parentId),
    [dataMap]
  );

  const onPositionUpdate = useCallback((id, x, y) => {
    positions.current[id] = { x, y };
    setLineVersion(v => v + 1);
  }, []);

  const calculateGhostPosition = useCallback((draggedId, targetId) => {
    if (!positions.current[targetId]) return null;

    const targetPos = positions.current[targetId];
    const childrenOfTarget = Object.keys(dataMap).filter(
      id => dataMap[id].parentId === targetId
    );

    // Calculate where the dragged node would appear as a child
    const childIndex = childrenOfTarget.length;
    const spacing = 200; // Approximate spacing between children
    const offsetX = (childIndex - childrenOfTarget.length / 2) * spacing;

    return {
      nodeId: draggedId,
      x: targetPos.x + offsetX,
      y: targetPos.y + 150 // Approximate vertical offset
    };
  }, [dataMap]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { over } = event;
    const newOverId = over ? over.id : null;
    setOverId(newOverId);

    if (newOverId && activeId && newOverId !== activeId) {
      const ghost = calculateGhostPosition(activeId, newOverId);
      setGhostPosition(ghost);
    } else {
      setGhostPosition(null);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const draggedNode = dataMap[active.id];
      const targetNode = dataMap[over.id];

      // Check if target is descendant of dragged
      let isDescendant = false;
      let current = targetNode;
      while (current && current.parentId) {
        if (current.parentId === active.id) {
          isDescendant = true;
          break;
        }
        current = dataMap[current.parentId];
      }

      if (!isDescendant) {
        const oldParentId = draggedNode.parentId;

        // Update the data map
        setDataMap(prev => ({
          ...prev,
          [active.id]: { ...prev[active.id], parentId: over.id }
        }));

        // Force line redraw
        setLineVersion(v => v + 1);
      }
    }

    setActiveId(null);
    setOverId(null);
    setGhostPosition(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div ref={treeRef} className="relative min-h-screen p-20 bg-gray-50  w-full overflow-auto">
        <div className="">
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {Object.values(dataMap).map(node => {
              if (!node.parentId) return null;
              const start = positions.current[node.parentId];
              const end = positions.current[node.id];
              if (!start || !end) return null;

              const isDraggingThis = activeId === node.id;

              return (
                <line
                  key={`${node.id}-${lineVersion}`}
                  x1={start.x} y1={start.y}
                  x2={end.x} y2={end.y}
                  stroke={isDraggingThis ? "#d1d5db" : "#374151"}
                  strokeWidth="2"
                  strokeDasharray={isDraggingThis ? "5,5" : "0"}
                  opacity={isDraggingThis ? 0.3 : 1}
                />
              );
            })}

            {ghostPosition && overId && (
              (() => {
                const start = positions.current[overId];
                const end = { x: ghostPosition.x, y: ghostPosition.y };
                if (!start) return null;
                return (
                  <line
                    key="ghost-line"
                    x1={start.x} y1={start.y}
                    x2={end.x} y2={end.y}
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    opacity={0.6}
                  />
                );
              })()
            )}
          </svg>
        </div>

        <div className="inline-flex flex-row justify-center min-w-full gap-20 relative z-10">
          {rootIds.map(rootId => (
            <Branch
              key={rootId}
              nodeId={rootId}
              dataMap={dataMap}
              positions={positions}
              onPositionUpdate={onPositionUpdate}
              activeId={activeId}
              overId={overId}
              ghostPosition={ghostPosition}
              treeRef={treeRef}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};
