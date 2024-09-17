"use client";
import React from 'react';
import StartNode from './StartNode';
import ProcessNode from './ProcessNode';
import ConditionNode from './ConditionNode';
import EndNode from './EndNode';
import { Button, Input } from 'antd';

interface PropsTypes {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  success: string;
  error: string;
  name: string;
  handleName: (value: string) => void;
}
function CustomNodeSideBar({ onSubmit,loading, success, error, name, handleName }: PropsTypes) {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ padding: '10px', width: '150px', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {success && <p style={{color: 'blue'}}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Input placeholder="Document Name" style={{ textAlign: 'center', marginBottom: 5 }} onChange={(e) => handleName(e.target.value)} value={name} />
      <Button type="primary" onClick={(e)=>onSubmit} disabled={loading}>{loading ? "Saving" : "Save"}</Button>
      <div className="description"><p style={{ color: 'black' }}>Drag these nodes to the canvas:</p></div>
          <StartNode onDragStart={onDragStart} />
          <ConditionNode onDragStart={onDragStart} />
          <ProcessNode onDragStart={onDragStart}/>
          <EndNode onDragStart={onDragStart} />
          
    </aside>
  );
}

export default CustomNodeSideBar;
