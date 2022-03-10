import React from 'react'
import { useDispatch } from 'react-redux'
import { changeLoading } from 'store/reducer/app/action'
import { Button } from 'antd'

export default function System() {
    const dispatch = useDispatch();

    //    const loading = useSelector((state) => state.app.loading);

    const changeLoadings = () => {
        dispatch(changeLoading(true));
    }

    const test = async (params) => {
        changeLoadings()

    };

    return (
        <div>
            系统
            <Button onClick={() => { test() }}> 点击</Button>
        </div>
    )
}
