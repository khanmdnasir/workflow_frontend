"use client";
import React from 'react';

interface CustomNodeProps {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, text: string) => void;
}
function ProcessNode({ onDragStart}: CustomNodeProps) {

  return (
    <div
    onDragStart={(event) => onDragStart(event, "process")}
    draggable
    style={{ margin: 10, padding: 5, width: 80, background: '#fff', cursor: 'grab', border: "1px solid black", color: 'black', textAlign: 'center' }}
    >
    <p>Process</p>
    </div>
  );
}

export default ProcessNode;
