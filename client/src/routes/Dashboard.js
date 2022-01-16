import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardGroup } from "react-bootstrap";
import "../styles/Dashboard.css";
import HeaderDashboard from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import Weather from "../components/Weather";
import Reddit from "../components/Reddit";
import Youtube from "../components/Youtube";
import Twitter from "../components/Twitter";
import Github from "../components/Github";
import UnsplashComponent from "../components/Unsplash";
import {
    FaCloud,
    FaGithub,
    FaReddit,
    FaTwitter,
    FaYoutube,
    FaImage,
} from "react-icons/fa";
import Clock from "../components/Clock";
// import Twitterfeed from "../components/TweetFeed";

function Dashboard() {

    const [ip, setIp] = useState("");

    const getData = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        setIp(res.data.IPv4);
        if (res.data.IPv4 !== undefined) {
            const dataIP = {
                ip: ip,
            };
            await axios.post("/api/host", dataIP);
        }
    };

    useEffect(() => {
        getData();
    });

    return (
        <div
            className="Dashboard"
            style={{
                backgroundImage: `url("/images/img-dashboard.jpg")`,
                backgroundRepeat: "repeat",
                height: "100%",
                backgroundSize: "cover",
            }}
        >
            <HeaderDashboard />
            <div className="Dashboard-container">
                <Clock />
                <div className="Dashboard-board">
                    <CardGroup>
                        <Card className="Dashboard-board-cards" bg="dark">
                            <h2 className="Dashboard-board-widgets-reddit-title">
                                <FaReddit className="Dashboard-icon" />
                                Reddit
                            </h2>
                            <div className="Dashboard-board-widgets-reddit">
                                <Reddit />
                            </div>
                        </Card>
                        <Card className="Dashboard-board-cards" bg="dark">
                            <h2 className="Dashboard-board-widgets-twitter-title">
                                <FaTwitter className="Dashboard-icon" />
                                Twitter
                            </h2>
                            <div className="Dashboard-board-widgets-twitter">
                                <Twitter />
                            </div>
                        </Card>
                    </CardGroup>

                    <hr className="Dashboard-hr" />

                    <CardGroup>
                        <Card className="Dashboard-board-cards" bg="dark">
                            <h2 className="Dashboard-board-widgets-github-title">
                                <FaGithub className="Dashboard-icon" />
                                Github
                            </h2>
                            <div className="Dashboard-board-widgets-github">
                                <Github />
                            </div>
                        </Card>
                        <Card className="Dashboard-board-cards" bg="dark">
                            <h2 className="Dashboard-board-widgets-unsplash-title">
                                <FaImage className="Dashboard-icon" />
                                Unsplash
                            </h2>
                            <div className="Dashboard-board-widgets-unsplash">
                                <UnsplashComponent />
                            </div>
                        </Card>
                    </CardGroup>

                    <hr className="Dashboard-hr" />

                    <Card className="Dashboard-board-cards" bg="dark">
                        <h2 className="Dashboard-board-widgets-youtube-title">
                            <FaYoutube className="Dashboard-icon" />
                            Youtube
                        </h2>
                        <div className="Dashboard-board-widgets-youtube">
                            <Youtube />
                        </div>
                    </Card>

                    <hr className="Dashboard-hr" />

                    <Card className="Dashboard-board-cards" bg="dark">
                        <h2 className="Dashboard-board-widgets-meteo-title">
                            <FaCloud className="Dashboard-icon" />
                            Weather
                        </h2>
                        <div className="Dashboard-board-widgets-meteo">
                            <Weather />
                        </div>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
