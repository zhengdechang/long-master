import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { changeLoading } from 'store/reducer/app/action'
// import { Button } from 'antd'
import { cornerstone } from '../../cornerstoneUtils'

const System = (props) => {
    useEffect(() => {
        let element = document.getElementById('dicomImage');
        let imageId = 'wadouri:https://9z04x8ykjr.codesandbox.io/000000.dcm';
        cornerstone(element, imageId, setTools)
        // let { cornerstoneTools } =
    }, [])


    const setTools = (cornerstoneTools) => {
        cornerstoneTools.setToolActive("FreehandRoi", { mouseButtonMask: 1 });
    }

    return (
        <div>
            <div
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
            </div>
        </div>
    )
}


export default React.memo(System)