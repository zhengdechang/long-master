import React, { useState } from 'react'
import { Layout } from 'antd';
import './index.less'
import { Outlet } from "react-router-dom";
import {
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import Menus from './menus'
import Footers from './footers'


const { Header, Sider, Content } = Layout;


const BaseLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false)

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
                <Header style={{ padding: "0 10px", fontSize: '20px', display: 'flex' }}>
                    <div className="logo">
                        企业管理系统
                    </div>
                </Header>
                <Layout>
                    <Sider
                        className="site-layout-background"
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                    >
                        <div className="logo" />
                        <Menus
                            menuList={menuList}
                            collapsed={collapsed}
                            setCollapsed={setCollapsed}
                        ></Menus>
                    </Sider>
                    <Layout >
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
            </Layout>
            <Footers />
        </div >
    )
}



export default React.memo(BaseLayout)