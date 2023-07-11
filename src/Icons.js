import React, { useState } from 'react'
import * as FontAwsome from "react-icons/fa";

const Icons = (props) => {

    const { iconName, size, color } = props;
    const icon = React.createElement(FontAwsome[iconName]);
    

    return (
        <div style={{ fontSize: size, color: color }}> {icon}</div >
    )
}
export default Icons;