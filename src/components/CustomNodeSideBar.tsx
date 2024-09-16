"use client";
import React from 'react';
import StartNode from './StartNode';
import ProcessNode from './ProcessNode';
import ConditionNode from './ConditionNode';
import EndNode from './EndNode';
import { Button } from 'antd';

interface PropsTypes {
  onSubmit: () => void;
}
function CustomNodeSideBar({ onSubmit }: PropsTypes) {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ padding: '10px', width: '150px', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <Button type="primary" onClick={onSubmit}>Save</Button>
      <div className="description"><p style={{ color: 'black' }}>Drag these nodes to the canvas:</p></div>
          <StartNode onDragStart={onDragStart} />
          <ConditionNode onDragStart={onDragStart} />
          <ProcessNode onDragStart={onDragStart}/>
          <EndNode onDragStart={onDragStart} />
          
    </aside>
  );
}

export default CustomNodeSideBar;
