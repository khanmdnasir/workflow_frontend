"use client";
import React from 'react';

interface CustomNodeProps {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, text: string) => void;
}

function ConditionNode({ onDragStart }: CustomNodeProps) {
  return (
    <div
      onDragStart={(event) => onDragStart(event, "condition")}
      draggable
      style={{
        margin: 15,
        padding: 5,
        background: '#fff',
        cursor: 'grab',
        color: 'black',
        width: 60,  // Adjust width and height to make it fit your design
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        transform: 'rotate(45deg)',  // Rotates the square to make it a diamond
        transformOrigin: 'center',  // Ensures rotation is around the center
        border: '1px solid black',  // Optional: border around the diamond
      }}
    >
      <p style={{ margin: 0, transform: 'rotate(-45deg)' }}>IF</p>
    </div>
  );
}

export default ConditionNode;
