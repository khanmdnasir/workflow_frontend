"use client"
import React from 'react';

interface CustomNodeProps {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, text: string) => void;
}
function EndNode({onDragStart}: CustomNodeProps) {

  return (
    <div
    onDragStart={(event) => onDragStart(event, "end")}
    draggable
    style={{ margin: 10, padding: 5, width: 80, background: '#fff', cursor: 'grab', border: "1px solid black",  color: 'black', borderRadius: 20, textAlign: 'center', }}
    >
    <p>End</p>
    </div>
  );
}

export default EndNode;
