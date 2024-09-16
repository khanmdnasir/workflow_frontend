"use client"
import React from 'react';
import Link from 'next/link';
import { Drawer } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface SidebarProps {
    open: boolean;
    handleDrawer: () => void;
}

const Sidebar = ({ open, handleDrawer }: SidebarProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [loading, setLoading] = React.useState<boolean>(false);
    const items = ["document 1", "document 2", "document 3"]
    
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
            items.map((item, index)=>{
                return (
                    <Link href="/document" key={`${item}${index}`} style={{
                        display: 'block',
                        color: 'black',
                        fontWeight: '500',
                        fontSize: 20,
                        borderBottom: '1px solid grey',
                    }}>
                        <p >{item}</p>
                    </Link>
                );
            })
        }
      </Drawer>
    </>
  );
};

export default Sidebar;
