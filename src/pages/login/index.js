import React from 'react'
import { HomeConfig } from 'services/config'
import services from 'services'
import './index.less'
import { Form, Input, Button, Checkbox, } from 'antd';
import { AppstoreTwoTone } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
    let navigate = useNavigate();

    const onFinish = (values) => {
        localStorage.setItem('token', 'dev')
        navigate('/ ')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const test = async (params) => {
        const { code, data } = await services({
            url: HomeConfig.Test,
            method: "post",
            data: { ...params }
        });
        if (code === "200" && data) {
            console.log(data)
        }
    };

    return (
        <div className='container'>
            <div className='content'>
                <div className='title'>
                    <div className='title-header'>
                        <span className='logo'>
                            <AppstoreTwoTone />
                        </span>
                        <span className='logo-title'>
                            企业管理系统
                        </span>
                    </div>
                    <div className='title-desc'>
                        Ant Design 是西湖区最具影响力的 Web 设计规范
                    </div>
                </div>
                <div className='form'>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名称"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入你的用户名',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入你的密码',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
