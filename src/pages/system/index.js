import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { changeLoading } from 'store/reducer/app/action'
import { Button } from 'antd'
import DicomViewer from "../../components/dicomViewer"
import { storeTool } from 'store/reducer/cornerstone/action'
import store from 'store'
const System = (props) => {

    const [toolActive, setToolActive] = useState('')

    const dispatch = useDispatch();


    useEffect(() => {
        // let element = document.getElementById('dicomImage');
        // let imageId = 'wadouri:https://9z04x8ykjr.codesandbox.io/000000.dcm';
        // cornerstone(element, imageId, setTools)
        // let { cornerstoneTools } =

    }, [])

    const ref = useRef(null)

    const cornerstoneState = useSelector((state) => state.cornerstone);



    // useEffect(() => {
    //     // store.subscribe()是redux提供的，监测store更新的函数
    //     store.subscribe(() => {
    //         console.log(store.getState(), '3')
    //         // 当store数据更新后执行 setUpdate() ，组件重新加载，实现界面store数据更新
    //         setMeasurementList(store.getState().cornerstone.measurementList)
    //     })
    // }, [])


    const toolExecute = (tool) => {
        if (tool === 'referencelines') {
            // this.referenceLinesToggle()
        } else if (tool === 'serieslink') {
            // this.seriesLinkToggle()
        } else {
            dispatch(storeTool(tool))   //store tool
            setToolActive(tool)
            ref.current.setActiveTools(tool)
        }
    }

    const toolPassive = (tool) => {
        ref.current.setPassiveTools(tool)
    }

    const removeTools = (index) => {
        ref.current.removeTools(index)
    }

    return (
        <div>
            <ul style={{ display: 'flex' }}>
                {
                    cornerstoneState.measurementList.map((item, index) => {
                        return (
                            <li key={item.key}>
                                {item.tool}
                                <Button onClick={() => { removeTools(item.key) }} type='primary'>
                                    点击
                                </Button>
                            </li>
                        )
                    })
                }
            </ul>

            <DicomViewer
                elementId="example"
                overlay={true}
                patientsName='obaba'
                ref={ref}
                toolActive={toolActive}
                tool={cornerstoneState.tool}
            />
            <Button onClick={() => toolExecute('Bidirectional')} type='primary'>
                Bidirectional
            </Button>
            <Button onClick={() => toolExecute('Pan')} type='primary'>
                pan
            </Button>
            <Button onClick={() => toolExecute('Angle')} type='primary'>
                Angle
            </Button>
            <Button onClick={() => toolPassive('Angle')} type='primary'>
                AnglePassive
            </Button>
            <Button onClick={() => toolExecute('RectangleRoi')} type='primary'>
                RectangleRoi
            </Button>
            <Button onClick={() => toolExecute('Eraser')} type='primary'>
                Eraser
            </Button>
            <Button onClick={() => ref.current.disableAllTools()} type='primary'>
                disabled
            </Button>
            <Button onClick={() => ref.current.disabledTools()} type='primary'>
                disabledOne
            </Button>
            <Button onClick={() => ref.current.reset()} type='primary'>
                reset
            </Button>
            <Button onClick={() => ref.current.download()} type='primary'>
                download
            </Button>
            {/* <div
                style={{
                    width: 512,
                    height: 512,
                    position: "relative",
                    display: "inline-block",
                    color: "white"
                }}
                onContextMenu={() => false}
                className="cornerstone-enabled-image"
                unselectable="on"
            // onMouseDown={() => false}
            >
                <div
                    id="dicomImage"
                    style={{
                        width: 512,
                        height: 512,
                        top: 0,
                        left: 0,
                        position: "absolute"
                    }}
                />
            </div> */}
        </div>
    )
}


export default System