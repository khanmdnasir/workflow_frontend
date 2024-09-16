"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopNav from '@/components/topNav';



const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    console.log("open", open);
    setOpen(!open);
  }

  return (
    <>
      <TopNav handleDrawer={handleDrawer} />
      <div>
        <Sidebar open={open} handleDrawer={handleDrawer}/>
              
        <main>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
