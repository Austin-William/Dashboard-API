import React from "react";
import "../styles/Error.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Error() {
    return (
        <div className="Error">
            <Header />
            <div className="Error-container">
                <h1 className="Error-title">Error</h1>
                <p className="Error-text">
                    This page doesn't exist.  Would you like to come back to the {"  "}
                    <a href="/"rel="noopener noreferrer" className="Error-link">
                        homepage
                    </a>
                    ?
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default Error;