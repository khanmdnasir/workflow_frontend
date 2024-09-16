"use client";
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Input } from "antd";

interface NodeProps {
  isConnectable: boolean;
}

export const StartNode = ({ isConnectable }: NodeProps) => (
  <div style={{ padding: 2, background: '#fff', border: '1px solid black',width: 80, height: 20, borderRadius: '5px',display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Input placeholder="Start" variant="borderless" style={{ textAlign: 'center' }}/>
    <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
  </div>
);

export const ProcessNode = ({ isConnectable }: NodeProps) => (
  <div style={{ padding: 2, background: '#fff', border: '1px solid black', width: 80, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      

    <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    <Input placeholder="Process" variant="borderless"/>
  </div>
);

export const ConditionNode = ({ isConnectable }: NodeProps) => (
  <div
    style={{
      padding: 0,
      background: '#fff',
      border: '1px solid black',
      width: 40,   // Width and height should be the same for a diamond shape
      height: 40,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Input placeholder="If" variant="borderless" style={{ textAlign: 'center',  }} />
   
    <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
    <Handle type="source" id="a" position={Position.Left} isConnectable={isConnectable} />
    <Handle type="source" id="b" position={Position.Right} isConnectable={isConnectable} />
    
    
    
  </div>
);

export const EndNode = ({ isConnectable }: NodeProps) => (
  <div style={{ padding: 2, background: '#fff', border: '1px solid black',width: 80, height: 20, borderRadius: '5px',display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
    <Input placeholder="End" variant="borderless" style={{ textAlign: 'center' }}/>
  </div>
);
