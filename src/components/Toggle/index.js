import React from "react";
import "./style.css";

export default function Toggle({ toggled, onClick }) {
    return (
        <div className="w-1 h-1" onClick={onClick} className={`toggle${toggled ? " night" : ""}`}>
            <div className="notch">
                <div className="crater" />
                <div className="crater" />
            </div>
            <div>
                <div className="shape sm" />
                <div className="shape sm" />
                <div className="shape md" />
                <div className="shape lg" />
            </div>
        </div>
    );
}