import React, { useState } from 'react'
import { Layout } from 'antd';
import './index.less'
import { Outlet } from "react-router-dom";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import Menus from './menus'
import Footers from './footers'


const { Header, Sider, Content } = Layout;


const BaseLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        setCollapsed(v => !v)
    };

    const menuList = [
        { key: 'home', link: '/', title: '首页', menuIcon: UserOutlined },
        {
            key: 'systemConfig',
            title: '系统',
            menuIcon: VideoCameraOutlined,
            children: [
                { key: 'system', link: '/system', title: '系统', menuIcon: UserOutlined }
            ],
        },
    ]

    return (
        <div className='base-layout'>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menus
                        menuList={menuList}
                        collapsed={collapsed}
                    ></Menus>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: "0 10px", fontSize: '20px' }}>
                        <div
                            onClick={() => { toggle() }}
                            className='header-icon'
                        >
                            {
                                collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                            }
                        </div>

                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Outlet />
                    </Content>

                </Layout>
            </Layout>
            <Footers />
        </div >
    )
}



export default React.memo(BaseLayout)