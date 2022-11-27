// loading组件
import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import { Button } from 'antd'
import "./index.less";

import { useSelector, useDispatch } from 'react-redux'
import store from 'store'
import { changeDcmEnabledTools, storeTool, changeMeasurementList } from 'store/reducer/cornerstone/action'
// import src from '../../assets/1_1_pp'


/**DICOM dependency */
import dicomParser from "dicom-parser"
import Hammer from "hammerjs";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader"
import * as cornerstoneFileImageLoader from "cornerstone-file-image-loader"
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader"
let src = require('../../assets/1_1_pp')

//init cornerstone
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneFileImageLoader.external.cornerstone = cornerstone
cornerstoneWebImageLoader.external.cornerstone = cornerstone

cornerstoneTools.init(
    {
        showSVGCursors: true,
    }
);


const DicomViewer = React.forwardRef((props, ref) => {
    const { tool } = props

    /** get the imageId */
    // const [ImageId, setImageId] = useState('wadouri:https://9z04x8ykjr.codesandbox.io/000000.dcm');
    // const [ImageId, setImageId] = useState('wadors:https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs/studies/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.1/series/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.2/instances/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.8/frames/1');
    /** display image */

    const [ImageId, setImageId] = useState('wadouri:example://1');
    const [image, setImage] = useState(null)

    const [dicomImage, setDicomImage] = useState(null)

    /** zoom multiple  */
    const [zoom, setZoom] = useState(1);


    const [mprPlane, setMprPlane] = useState('');  //sagittal


    const dicomImageRef = useRef(null)

    const [measureList, setMeasureList] = useState([])

    const dispatch = useDispatch();




    useImperativeHandle(ref, () => {
        return {
            setActiveTools,
            disableAllTools,
            disabledTools,
            reset,
            download,
            removeTools,
            setPassiveTools,
        }
    })


    const measurementRemove = (key) => {
        const newMeasureList = measureList.filter(item => item.key !== key)
        setMeasureList(newMeasureList)
    }

    const removeTools = (key) => {
        const element = dicomImage
        let measure = measureList.filter(i => i.key == key)[0]
        cornerstoneTools.removeToolState(element, measure.tool, measure.data)
        cornerstone.updateImage(element)
        measurementRemove(key)
    }



    useEffect(() => {
        setDicomImage(dicomImageRef.current)
        displayImageFromImageId(props.ImageId || ImageId, dicomImageRef.current)
    }, [])


    useEffect(() => {
        if (!tool || !dicomImage) return
        dicomImage.addEventListener("cornerstonetoolsmeasurementcompleted", onMeasurementCompleted)
        return () => {
            dicomImage.removeEventListener("cornerstonetoolsmeasurementcompleted", onMeasurementCompleted)
        }
    }, [tool])




    // helper function used by the tool button handlers to disable the active tool
    // before making a new tool active
    const disableAllTools = () => {
        const canvas = document.querySelectorAll(`#viewer-${props.elementId}`)[0]
        canvas.style = {
            "cursor": "pointer"
        }
        cornerstoneTools.setToolEnabled('Length')
        cornerstoneTools.setToolEnabled('Pan')
        cornerstoneTools.setToolEnabled('Magnify')
        cornerstoneTools.setToolEnabled('Angle')
        cornerstoneTools.setToolEnabled('RectangleRoi')
        cornerstoneTools.setToolEnabled('Eraser')
        cornerstoneTools.setToolEnabled('Wwwc')
        cornerstoneTools.setToolEnabled('ZoomTouchPinch')
        cornerstoneTools.setToolEnabled('Probe')
        cornerstoneTools.setToolEnabled('EllipticalRoi')
        cornerstoneTools.setToolEnabled('FreehandRoi')
        cornerstoneTools.setToolEnabled('StackScrollMouseWheel')

        // dispatch(storeTool(' '))
    }

    const enableTool = (element) => {

        // if (dcmEnableTool) return
        // Enable all tools we want to use with this element
        const WwwcTool = cornerstoneTools.WwwcTool
        const LengthTool = cornerstoneTools['LengthTool']
        const PanTool = cornerstoneTools.PanTool
        const ZoomTouchPinchTool = cornerstoneTools.ZoomTouchPinchTool
        const ZoomTool = cornerstoneTools.ZoomTool
        const ProbeTool = cornerstoneTools.ProbeTool
        const EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool
        const RectangleRoiTool = cornerstoneTools.RectangleRoiTool
        const FreehandRoiTool = cornerstoneTools.FreehandRoiTool
        const AngleTool = cornerstoneTools.AngleTool
        const MagnifyTool = cornerstoneTools.MagnifyTool
        const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool
        const Bidirectional = cornerstoneTools.BidirectionalTool
        const EraserTool = cornerstoneTools.EraserTool;  // 橡皮擦工具

        console.log('cornerstoneTools: ', cornerstoneTools);
        // console.log(cornerstoneTools.import('wadouri:https://9z04x8ykjr.codesandbox.io/000000.dcm'), '2')


        cornerstoneTools.addToolForElement(element, MagnifyTool)
        cornerstoneTools.addToolForElement(element, AngleTool)
        cornerstoneTools.addToolForElement(element, WwwcTool)
        cornerstoneTools.addToolForElement(element, LengthTool)
        cornerstoneTools.addToolForElement(element, PanTool)
        cornerstoneTools.addToolForElement(element, ZoomTouchPinchTool)
        cornerstoneTools.addToolForElement(element, ZoomTool)
        cornerstoneTools.addToolForElement(element, ProbeTool)
        cornerstoneTools.addToolForElement(element, EllipticalRoiTool)
        cornerstoneTools.addToolForElement(element, RectangleRoiTool)
        cornerstoneTools.addToolForElement(element, FreehandRoiTool)
        cornerstoneTools.addToolForElement(element, StackScrollMouseWheelTool)
        cornerstoneTools.addToolForElement(element, EraserTool)
        cornerstoneTools.addToolForElement(element, Bidirectional)
        // store.dispatch(changeDcmEnabledTools(true))
        // 
    }

    // Listen for changes to the viewport so we can update the text overlays in the corner
    const onImageRendered = (e) => {
        const viewport = cornerstone.getViewport(e.target)

        let zoom = Math.round(viewport.scale.toFixed(2) * 100)
        setZoom(zoom)

        document.getElementById(
            `mrtopleft-${props.elementId}`
        ).textContent = `${props.patientsName}`

        document.getElementById(
            `mrtopright-${props.elementId}`
        ).textContent = `${viewport.displayedAreas?.brhc.x}x${viewport.displayedAreas?.brhc.y}`

        document.getElementById(
            `mrbottomleft-${props.elementId}`
        ).textContent = `WW/WC: ${Math.round(viewport.voi.windowWidth)}/${Math.round(viewport.voi.windowCenter)}`

        document.getElementById(
            `mrbottomright-${props.elementId}`
        ).textContent = `Zoom: ${zoom}%`

        document.getElementById(
            `mrtopcenter-${props.elementId}`
        ).textContent = ``
        document.getElementById(
            `mrbottomcenter-${props.elementId}`
        ).textContent = ``
        document.getElementById(
            `mrleftcenter-${props.elementId}`
        ).textContent = ``
        document.getElementById(
            `mrrightcenter-${props.elementId}`
        ).textContent = ``

        if (mprPlane === 'sagittal') {
            document.getElementById(
                `mrtopcenter-${props.elementId}`
            ).textContent = `S`
            document.getElementById(
                `mrbottomcenter-${props.elementId}`
            ).textContent = `I`
            document.getElementById(
                `mrleftcenter-${props.elementId}`
            ).textContent = `A`
            document.getElementById(
                `mrrightcenter-${props.elementId}`
            ).textContent = `P`

        } else if (mprPlane === 'axial') {
            document.getElementById(
                `mrtopcenter-${props.elementId}`
            ).textContent = `A`
            document.getElementById(
                `mrbottomcenter-${props.elementId}`
            ).textContent = `P`
            document.getElementById(
                `mrleftcenter-${props.elementId}`
            ).textContent = `R`
            document.getElementById(
                `mrrightcenter-${props.elementId}`
            ).textContent = `L`

        } else if (mprPlane === 'coronal') {
            document.getElementById(
                `mrtopcenter-${props.elementId}`
            ).textContent = `S`
            document.getElementById(
                `mrbottomcenter-${props.elementId}`
            ).textContent = `I`
            document.getElementById(
                `mrleftcenter-${props.elementId}`
            ).textContent = `R`
            document.getElementById(
                `mrrightcenter-${props.elementId}`
            ).textContent = `L`
        }

        // if (this.referenceLines.isScoutDraw) {
        //     this.referenceLines.isScoutDraw = false
        //     this.referenceLinesDraw()
        // }

        // if (this.mpr.isSliceLocation) {
        //     this.mpr.isSliceLocation = false
        //     this.mprSliceLocationDraw()
        // }

        // if (this.isDicom && this.state.visibleCinePlayer && this.numberOfFrames > 1) {
        //     document.getElementById(
        //         `frameLabel-${props.elementId}`
        //     ).textContent = `${this.state.frame} / ${this.numberOfFrames}`
        //     if (this.state.inPlay) {
        //         let frame = this.state.frame === this.numberOfFrames ? 1 : this.state.frame + 1
        //         this.setState({ frame: frame })
        //     }
        // }

        // this.props.onRenderedImage(props.elementId)
    }


    const onNewImage = (e, element) => {

        const viewport = cornerstone.getViewport(element)

        const brhc = {
            x: e.detail.image.width,
            y: e.detail.image.height
        }
        viewport.displayedAreas = {
            brhc,
        }
        cornerstone.setViewport(element, viewport)
    }

    const displayImageFromImageId = (ImageId, dicomImage) => {
        const element = dicomImage
        element.addEventListener("cornerstonenewimage", (e) => onNewImage(e, element))
        element.addEventListener("cornerstoneimagerendered", onImageRendered)
        // element.addEventListener("cornerstonetoolsmeasurementadded", onMeasurementAdded)
        // element.addEventListener("cornerstonetoolsmeasurementmodified", this.onMeasurementModified)
        // element.addEventListener("cornerstonetoolsmeasurementcompleted", onMeasurementCompleted)
        cornerstone.enable(element)


        // this.PatientsName = image.data.string('x00100010')
        // this.sopInstanceUid = this.getSopInstanceUID()

        // let stack = { currentImageIdIndex: 0, imageIds: "" }
        // this.numberOfFrames = image.data.intString('x00280008')
        // if (this.numberOfFrames > 0) {
        //     let imageIds = []
        //     for (var i = 0; i < this.numberOfFrames; ++i) {
        //         imageIds.push(imageId + "?frame=" + i)
        //     }
        //     stack.imageIds = imageIds
        // }

        // const fileNames = require('../../assets/1_1_pp')
        // 
        // const res = cornerstoneWADOImageLoader.wadouri.fileManager.add(fileNames)
        // let url = 'https://domvja9iplmyu.cloudfront.net/dicomweb/studies/1.3.6.1.4.1.14519.5.2.1.3023.4024.215308722288168917637555384485/series/1.3.6.1.4.1.14519.5.2.1.3023.4024.161252729707561121988132072635/instances/1.3.6.1.4.1.14519.5.2.1.3023.4024.695497651422324742316464845052/frames/1'
        // fetch(url).then(res => res.blob()).then(blob => {
        //     // console.log(blob.arrayBuffer().then(res => console.log(res)))
        //     const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(blob);
        //     console.log('imageId: ',cornerstoneWADOImageLoader, imageId);
        cornerstone.loadAndCacheImage(ImageId).then(function (image) {
            //mount image
            cornerstone.displayImage(element, image);
            // this.image = image
            setImage(image)
            enableTool(element)
        });
        // });
        // 





        // if (this.numberOfFrames > 1) {
        //     cornerstoneTools.addStackStateManager(element, ['stack', 'playClip']);
        //     cornerstoneTools.addToolState(element, 'stack', stack)
        //     this.setState({ frame: 1 })
        // }

        // // Load the possible measurements from DB and save in the store 
        // db.measurement.where('sopinstanceuid').equals(this.sopInstanceUid).each(measure => {
        //     //
        //     this.measurementSave(measure)
        //     cornerstoneTools.addToolState(element, measure.tool, measure.data)
        //     this.runTool(measure.tool)
        //     cornerstone.updateImage(element)
        //     cornerstoneTools.setToolEnabled(measure.tool)
        // }).then(() => {
        //     //if (this.useIsNormal) {
        //     this.props.setActiveMeasurements(this.measurements)
        //     this.props.setActiveDcm(this) // {image: this.image, element: this.dicomImage, isDicom: this.isDicom}     
        //     this.props.setIsOpenStore({ index: props.elementId, value: true })
        //     //} 
        // })

    }

    const setActiveTools = (toolsName, mouseButtonNumber = 1) => {
        cornerstoneTools.setToolActive(toolsName, { mouseButtonMask: mouseButtonNumber })
    }
    const setPassiveTools = (toolsName) => {
        cornerstoneTools.setToolPassive(toolsName)
    }

    const disabledTools = () => {
        // cornerstone.disable(dicomImage)
    }

    const download = () => {
        cornerstoneTools.SaveAs(dicomImage, 'fileimage')
        return
        let type = 'jpg'
        const element = dicomImage
        const viewport = cornerstone.getViewport(element)
        const canvas = document.querySelectorAll(`#viewer-${props.elementId} .cornerstone-canvas`)[0]
        const zoom = viewport.scale.toFixed(2)
        const cols = image.columns * zoom
        const rows = image.rows * zoom
        // let myCanvas = document.createElement('canvas')
        let myCanvas = getCanvas(canvas,
            Math.round(canvas.width / 2 - cols / 2),
            Math.round(canvas.height / 2 - rows / 2),
            cols, rows)

        let a = document.createElement("a")
        a.href = myCanvas.toDataURL(`image/${type}`)
        a.download = `${props.patientsName}.${type}`
        document.body.appendChild(a) // Required for this to work in FireFox
        a.click()
    }

    const getCanvas = (canvas, x, y, width, height) => {
        // create a temp canvas
        const newCanvas = document.createElement('canvas')
        // set its dimensions
        newCanvas.width = width
        newCanvas.height = height
        // draw the canvas in the new resized temp canvas 
        newCanvas.getContext('2d').drawImage(canvas, x, y, width, height, 0, 0, width, height)
        return newCanvas
    }

    //claer  
    const reset = () => {

        const element = dicomImage
        const defaultViewport = cornerstone.getDefaultViewportForImage(element, image)
        let viewport = cornerstone.getViewport(element)
        viewport.voi.windowWidth = defaultViewport.voi.windowWidth
        viewport.voi.windowCenter = defaultViewport.voi.windowCenter
        viewport.invert = false
        cornerstone.setViewport(element, viewport)

    }


    /** measure tools data*/
    const onMeasurementCompleted = (e) => {
        if (!tool) return
        const measure = {
            key: Math.random() * 100,
            tool: tool,
            note: '',
            data: e.detail.measurementData
        }

        if (tool === "FreehandRoi") {
            setTimeout(() => {
                setMeasureList((measureList) => {
                    return [
                        ...measureList,
                        measure,
                    ]
                })
            }, 500)
        } else {
            setMeasureList((measureList) => {
                return [
                    ...measureList,
                    measure,
                ]
            })
        }
    }


    useEffect(() => {

        dispatch(changeMeasurementList(measureList))
    }, [measureList]);



    const overlay = props.overlay
    return (
        <div className={`dicom-viewer`} key={`viewer-${props.elementId}`}>
            <div
                style={{
                    width: '512px',
                    height: '512px',
                    position: "relative",
                    color: '#FFFFFF',
                    fontSize: '1.00em',
                    textShadow: '1px 1px #000000',
                    // visibility: visible
                }}
                onContextMenu={() => false}
                className="cornerstone-enabled-image"
            >

                <div
                    key={`viewer-${props.elementId}`}
                    id={`viewer-${props.elementId}`}
                    ref={dicomImageRef}
                    className="viewer"
                >
                </div>
                <div
                    id={`mrtopleft-${props.elementId}`}
                    style={{ position: "absolute", top: 0, left: 3, display: overlay ? "" : "none" }}
                >

                </div>
                <div
                    id={`mrtopright-${props.elementId}`}
                    style={{ position: "absolute", top: 0, right: 3, display: overlay ? "" : "none" }}
                >

                </div>
                <div
                    id={`mrbottomright-${props.elementId}`}
                    style={{ position: "absolute", bottom: 0, right: 3, display: overlay ? "" : "none" }}
                >

                </div>
                <div
                    id={`mrbottomleft-${props.elementId}`}
                    style={{ position: "absolute", bottom: 0, left: 3, display: overlay ? "" : "none" }}
                >

                </div>

                <div
                    id={`mrtopcenter-${props.elementId}`}
                    style={{ position: "absolute", top: 0, width: '60px', left: '50%', marginLeft: '0px', display: overlay ? "" : "none" }}
                >

                </div>

                <div
                    id={`mrleftcenter-${props.elementId}`}
                    style={{ position: "absolute", top: '50%', width: '30px', left: 3, marginLeft: '0px', display: overlay ? "" : "none" }}
                >

                </div>

                <div
                    id={`mrrightcenter-${props.elementId}`}
                    style={{ position: "absolute", top: '50%', width: '30px', right: 3, marginRight: '-20px', display: overlay ? "" : "none" }}
                >
                </div>

                <div
                    id={`mrbottomcenter-${props.elementId}`}
                    style={{ position: "absolute", bottom: 0, width: '60px', left: '50%', marginLeft: '0px', display: overlay ? "" : "none" }}
                ></div>
            </div>
        </div>
    );
});
export default React.memo(DicomViewer);
