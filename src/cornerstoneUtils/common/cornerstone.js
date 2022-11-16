import dicomParser from "dicom-parser"
import Hammer from "hammerjs";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneMath from "cornerstone-math";
import cornerstoneWADOImageLoader
    from 'cornerstone-wado-image-loader'

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

//initialization
cornerstoneTools.init(
    {
        showSVGCursors: true,
    }
);

const toolsList = {
    FreehandRoi: "FreehandRoiTool", // 多边形标注
    ZoomMouseWheel: "ZoomMouseWheelTool", // 滑轮放大
    Pan: "PanTool", // 平移工具
}

function cornerstoneCommon(element, imageId, dynamicFun) {
    //get the element
    element = element || document.getElementById('root');

    //get the imageId
    imageId = imageId || 'wadouri:https://9z04x8ykjr.codesandbox.io/000000.dcm';

    // image enable the dicomImage element
    cornerstone.enable(element);

    cornerstoneTools.store.state.tools = []     //resolve rhe tools repetition warming
    Object.keys(toolsList).map(item => {
        cornerstoneTools.addTool(cornerstoneTools[toolsList[item]])
        return false
    })
    // 多边形标注
    // cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool)
    // // 滑轮放大
    // cornerstoneTools.addTool(cornerstoneTools.ZoomMouseWheelTool)
    // // 平移工具
    // cornerstoneTools.addTool(cornerstoneTools.PanTool)

    cornerstone.loadAndCacheImage(imageId).then(function (image) {
        //mount image
        cornerstone.displayImage(element, image);
        // example
        // cornerstoneTools.setToolActive("FreehandRoi", { mouseButtonMask: 2 });       

        //other operations
        dynamicFun && dynamicFun(cornerstoneTools)
    });
    return {
        cornerstoneTools,
        cornerstoneWADOImageLoader
    }
}


export default cornerstoneCommon