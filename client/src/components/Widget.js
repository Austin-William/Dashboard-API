import React from 'react';
import "../styles/Widget.css";

function Widget(props) {
    return (
        <div className="widget">
            <h1>{props.title}</h1>
            <div className="widget-content">
                {props.children}
            </div>
        </div>
    );
}

export default Widget;