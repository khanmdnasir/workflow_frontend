"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Drawer } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import axiosInstance from '@/store/axios';

interface SidebarProps {
    open: boolean;
    handleDrawer: () => void;
}

interface Items {
  _id: string;
  name: string;
}

const Sidebar = ({ open, handleDrawer }: SidebarProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
      const response = await axiosInstance.get('/api/documents/'); // Backend login endpoint
      console.log("response", response);
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
    }
    fetchData()
    setLoading(false);
  },[])
    
  return (
    <>
      <Drawer
        title="Documents"
        placement={'left'}
        closable={true}
        onClose={handleDrawer}
        open={open}
        loading={loading}
        key={'left'}
      >
        {isAuthenticated &&
            items.map((item: Items, index)=>{
                return (
                  <Link href={`/document_details/${item._id}`} key={`item${index}`} style={{
                        display: 'block',
                        color: 'black',
                        fontWeight: '500',
                        fontSize: 20,
                        borderBottom: '1px solid grey',
                    }}>
                        <p >{item.name}</p>
                    </Link>
                );
            })
        }
      </Drawer>
    </>
  );
};

export default Sidebar;
