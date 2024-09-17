// components/Navbar.tsx
import { Layout, Menu } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, MenuUnfoldOutlined, LoginOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/authSlice';

const { Header } = Layout;

interface NavbarProps {
    handleDrawer: () => void;
}

const Navbar = ({ handleDrawer }: NavbarProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" >
                <Link href="/">Workflow</Link>
                
            </Menu.Item>
            <Menu.Item key="2" icon={<MenuUnfoldOutlined />} onClick={handleDrawer}>
            </Menu.Item>
            <Menu.Item key="3" >
                <Link href="/document">New Document</Link>
            </Menu.Item>
            {isAuthenticated ?
                <>
                    <Menu.Item key="5" icon={<UserOutlined />}>
                        <Link href="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<SettingOutlined />}>
                        <Link href="/settings">Settings</Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<LogoutOutlined />} onClick={()=>dispatch(logout())}>
                        <Link href="#">Logout</Link>
                    </Menu.Item>
                </>:
                <>
                
                    <Menu.Item key="5" icon={<LoginOutlined />}>
                        <Link href="/login">Login</Link>
                    </Menu.Item>
                </>
            }
            
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
