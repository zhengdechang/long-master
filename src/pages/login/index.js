import React from 'react'

import { Button } from 'antd'
import { HomeConfig } from 'services/config'
import services from 'services'



export default function Login() {

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
        <div>
            登录
            <Button onClick={() => { test({ "serverName": "yssfbp-fpcs", "serverPath": "/sys/100011", "tradeId": "100011", "userId": "admin", "keycode": "31389261fe87ef80023336158746359f", "busiData": { "userId": "admin", "optionType": "collectionMenuList", "userID": "admin" } }) }}> 点击</Button>
        </div>
    )
}
