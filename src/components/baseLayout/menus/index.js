import React from 'react'
import { Menu } from 'antd';
import './index.less'
import { Link } from "react-router-dom";
import {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Menus = (props) => {
    const { menuList, collapsed, setCollapsed } = props
    //递归渲染菜单
    const getNavMenuItems = (data = []) => {

        return data.map(((item, index) => {
            if (!!item.children?.length) {  //如果有子节点，继续递归调用，直到没有子节点
                return (
                    <SubMenu
                        title={item.title}
                        icon={item.menuIcon ? <item.menuIcon /> : <UserOutlined />}
                        key={item.key}
                    >
                        {getNavMenuItems(item.children)}
                    </SubMenu>
                )
            }
            //没有子节点就返回当前的父节点
            return (
                <Menu.Item
                    key={item.key}
                    title={item.title}
                    icon={item.menuIcon ? <item.menuIcon /> : <UserOutlined />}
                >
                    <Link to={item.link}>{item.title}</Link>
                </Menu.Item >)

        })
        )
    }

    return (
        <div className='menu'>
            <Menu mode="inline" >
                {getNavMenuItems(menuList)}
            </Menu>
            <div className='bottom-icon'>
                <div
                    onClick={() => { setCollapsed(v => !v) }}
                    className='header-icon'
                    style={{ paddingLeft: collapsed ? '34px' : '19px' }}
                >
                    {
                        collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                </div>
            </div>
        </div >
    )
}



export default React.memo(Menus)