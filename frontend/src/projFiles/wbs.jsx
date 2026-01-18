import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useRef, useCallback, useState, useLayoutEffect, useMemo } from 'react';

//mock data replace with BACKEND CALL

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

//TASK NODE
const TaskNode = ({ node, positions, onPositionUpdate, isOver, contentRef, ghostPosition, lineVersion }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: node.id,
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id: node.id,
  });

  const coordRef = useRef(null);

  useLayoutEffect(() => {
    if (coordRef.current && contentRef.current && !isDragging) {
      const containerRect = contentRef.current.getBoundingClientRect();
      const nodeRect = coordRef.current.getBoundingClientRect();

      const x = nodeRect.left - containerRect.left + nodeRect.width / 2;
      const y = nodeRect.top - containerRect.top + nodeRect.height / 2;

      // change if pos update 
      if (!positions.current[node.id] ||
        Math.abs(positions.current[node.id].x - x) > 1 || // Add slight tolerance
        Math.abs(positions.current[node.id].y - y) > 1) {
        onPositionUpdate(node.id, x, y);
      }
    }
  }, [isDragging, node.id, node.parentId, onPositionUpdate, positions, contentRef, lineVersion]);

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
      className={`p-4 bg-white border-2 rounded-lg shadow-sm cursor-move w-48 text-center transition-colors relative
        ${isOver ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300' : 'border-gray-300 hover:border-gray-400'}
        ${isDragging ? 'shadow-2xl' : ''}`}
    >
      <div className="font-medium text-sm">{node.name}</div>
      {//conenctor dots
      }
      <div className="absolute -top-1 left-1/2 w-2 h-2 bg-gray-400 rounded-full -translate-x-1/2" />
      <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-gray-400 rounded-full -translate-x-1/2" />
    </div>
  );
};

const Branch = ({ nodeId, lineVersion, dataMap, positions, onPositionUpdate, activeId, overId, ghostPosition, contentRef }) => {
  const node = dataMap[nodeId];
  if (!node) return null;

  const childIds = Object.keys(dataMap).filter(id => dataMap[id].parentId === nodeId);

  return (
    <div className="flex flex-col items-center">
      <div className="p-6">
        <TaskNode
          lineVersion={lineVersion}
          node={node}
          positions={positions}
          onPositionUpdate={onPositionUpdate}
          isOver={overId === node.id && activeId !== node.id}
          ghostPosition={ghostPosition && ghostPosition.nodeId === node.id ? ghostPosition : null}
          contentRef={contentRef}
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
              contentRef={contentRef}
              lineVersion={lineVersion}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Wbs = () => {
  const positions = useRef({});
  const contentRef = useRef(null); // Ref for the inner content wrapper

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
    // Debounce this 
    setLineVersion(v => v + 1);
  }, []);

  const calculateGhostPosition = useCallback((draggedId, targetId) => {
    if (!positions.current[targetId]) return null;

    const targetPos = positions.current[targetId];
    const childrenOfTarget = Object.keys(dataMap).filter(
      id => dataMap[id].parentId === targetId
    );

    const childIndex = childrenOfTarget.length;
    const spacing = 200;
    const offsetX = (childIndex - childrenOfTarget.length / 2) * spacing;

    return {
      nodeId: draggedId,
      x: targetPos.x + offsetX,
      y: targetPos.y + 150
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

      // Check circular reference
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
        setDataMap(prev => ({
          ...prev,
          [active.id]: { ...prev[active.id], parentId: over.id }
        }));
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
      {/* Outer Scroll Container */}
      <div className="relative w-full h-screen overflow-auto bg-gray-50">

        {/* Inner Content Container - Scales with content size */}
        <div
          ref={contentRef}
          className="inline-flex flex-row justify-center min-w-full p-20 relative min-h-full"
        >

          {/* SVG moved INSIDE the content container so it grows with the tree */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {Object.values(dataMap).map(node => {
              if (!node.parentId) return null;
              const start = positions.current[node.parentId];
              const end = positions.current[node.id];

              if (!start || !end) return null;

              const isDraggingThis = activeId === node.id;

              const midY = start.y + (end.y - start.y) / 2;
              const path = `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;

              return (
                <path
                  key={`${node.id}-${lineVersion}`}
                  d={path}
                  fill="none"
                  stroke={isDraggingThis ? "#d1d5db" : "#9ca3af"}
                  strokeWidth="2"
                  strokeDasharray={isDraggingThis ? "5,5" : "0"}
                  opacity={isDraggingThis ? 0.5 : 1}
                />
              );
            })}

            {ghostPosition && overId && (() => {
              const start = positions.current[overId];
              if (!start) return null;
              const endX = ghostPosition.x;
              const endY = ghostPosition.y;
              const midY = start.y + (endY - start.y) / 2;

              return (
                <path
                  d={`M ${start.x} ${start.y} C ${start.x} ${midY}, ${endX} ${midY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              );
            })()}
          </svg>

          {/* Render Roots */}
          <div className="flex flex-row gap-20 relative z-10">
            {rootIds.map(rootId => (
              <Branch
                lineVersion={lineVersion}
                key={rootId}
                nodeId={rootId}
                dataMap={dataMap}
                positions={positions}
                onPositionUpdate={onPositionUpdate}
                activeId={activeId}
                overId={overId}
                ghostPosition={ghostPosition}
                contentRef={contentRef}
              />
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
};
