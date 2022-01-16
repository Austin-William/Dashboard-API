import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Help.css";

function Help() {
    return (
        <div className="Help">
            <Header />
            <div className="Help-container">
                <h1 className="Help-title">Help</h1>
                <p className="Help-text">
                    This is a simple help page. You can find more information about the
                    application in the{" "}
                    <a href="ripepitech.eu" target="_blank" rel="noopener noreferrer" className="Help-link">
                        README.md
                    </a>
                    .
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default Help;