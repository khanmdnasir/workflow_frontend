"use client";
import { useCallback, useState } from 'react';
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge, Node, Edge, Connection, NodeChange, EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Layout from '@/components/Layout';
import { StartNode, ProcessNode, ConditionNode, EndNode } from '@/components/NodeComponents';
import CustomNodeSideBar from '@/components/CustomNodeSideBar';

const nodeTypes = {
  start: StartNode,
  process: ProcessNode,
  condition: ConditionNode,
  end: EndNode
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const nodeType = event.dataTransfer.getData('application/reactflow');
      if (!nodeType) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: `${nodes.length + 1}`, // Assign a new unique ID
        type: nodeType,
        position,
        data: { label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onSubmit = () => {
    console.log("nodes", nodes);
    console.log("edges", edges)
  }

  return (
    <Layout>
      <div style={{ display: 'flex', height: '90vh'}}>
        <CustomNodeSideBar onSubmit={onSubmit} />
        <div
          style={{ height: '100%', flexGrow: 1, border: '1px solid #ddd' }}
          onDrop={onDrop}
          onDragOver={onDragOver}
          
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </Layout>
  );
}

export default Flow;