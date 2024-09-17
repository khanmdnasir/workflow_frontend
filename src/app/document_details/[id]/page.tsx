"use client";
import { useCallback, useEffect, useState } from 'react';
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge, Node, Edge, Connection, NodeChange, EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Layout from '@/components/Layout';
import { StartNode, ProcessNode, ConditionNode, EndNode } from '@/components/NodeComponents';
import CustomNodeSideBar from '@/components/CustomNodeSideBar';
import axiosInstance from '@/store/axios';

const nodeTypes = {
  start: StartNode,
  process: ProcessNode,
  condition: ConditionNode,
  end: EndNode
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

function FlowDetails({params}) {
    const [name, setName] = useState('');
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/api/document/${params.id}`);
                console.log('response flow details', response)
                setNodes(response?.data.nodes);
                setEdges(response?.data.edges);
                setName(response?.data.name);
            } catch (error) {
                return {
                notFound: true,
                };
            }
        }
        fetchData();
        setLoading(false);
    },[])

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

    const handleName = (value: string) => {
        setName(value);
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        
        try {
            const response = await axiosInstance.put(`api/document/${params.id}/`, { "name": name, "nodes": nodes, "edges": edges}); // Backend login endpoint
        console.log("response", response);
        setSuccess("Document updated succesfully!");
        } catch (error: AxiosError) {
        console.log(error);
        setError(error?.message);
        }

        setLoading(false);
    };

    return (
        <Layout>
        <div style={{ display: 'flex', height: '90vh'}}>
            <CustomNodeSideBar onSubmit={handleSubmit} loading={loading} success={success} error={error} name={name} handleName={handleName}/>
            <div
            style={{ height: '100%', flexGrow: 1, border: '1px solid #ddd' }}
            onDrop={onDrop}
            onDragOver={onDragOver}
            
                >{loading ? "Loading..." :
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
                    </ReactFlow>}
            </div>
        </div>
        </Layout>
    );
}



export default FlowDetails;
