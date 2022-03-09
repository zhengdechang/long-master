/**
 * 基础框架 底部内容
 * @author long 
 */

import React from "react";
import moment from "moment";

const Footers = () => {
    return (
        <footer className="long-footer">
            <span>系统日期 ：{moment().format("YYYY年MM月DD日")}</span>
        </footer>
    );
};


export default Footers
