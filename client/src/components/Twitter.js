import React, { useState, useEffect } from "react";
import { Card, CardGroup, Row } from "react-bootstrap";
import { FaCrosshairs } from "react-icons/fa";
import axios from "axios";
import ButtonComponent from "./Button";
import "../styles/Twitter.css";

function Twitter() {

    const [trends, setTrends] = useState([]);
    const [woeid, setWoeid] = useState('1');

    useEffect(() => {
        const getTrends = () => {
            axios.get('/twitter/trends', {
            params: {
                woeid: woeid,
            }
        }).then(response => {
            setTrends(response.data[0].trends);
        }).catch(error => {
            console.log(error);
        });
        }
        getTrends();
    }, [woeid]);

    function handleClickLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((showPosition) => {
                axios.get('/twitter/location', {
                    params: {
                        lat: showPosition.coords.latitude,
                        long: showPosition.coords.longitude,
                    }
                }).then(response => {
                    setWoeid(response.data[0].woeid);
                }).catch(error => {
                    console.log(error);
                }
                );
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function listTrends() {
        return (
            <Row xs={1} md={2} className="Twitter-row">
                {trends.map((trend) => {
                    return (
                        <Card className="Twitter-card-trends" key={trend.query}>
                            <Card.Body>
                                <Card.Title className="Twitter-card-title">
                                    <a href={trend.url} target="_blank" rel="noopener noreferrer">
                                        {trend.name}
                                    </a>
                                </Card.Title>
                                <Card.Text className="Twitter-card-text">
                                    {trend.tweet_volume}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Row>
        )
    }

    return (
        <div className="Twitter">
            <Card className="Twitter-card">
                <Card.Title className="Twitter-card-title-location">
                    Localisation
                </Card.Title>
                <CardGroup className="Twitter-cardgroup">
                    <Card.Body className="Twitter-card-body">
                        <select class="form-select" onChange={e => setWoeid(e.target.value)}>
                            <option value='1'>Worldwide</option>
                            <option value='23424819'>France</option>
                            <option value='23424975'>United Kingdom</option>
                            <option value='23424768'>Brazil</option>
                            <option value='23424829'>Germany</option>
                            <option value='23424900'>Mexico</option>
                            <option value='23424775'>Canada</option>
                            <option value='23424977'>USA</option>
                        </select>
                    </Card.Body>
                    <ButtonComponent className="Twitter-button" onClick={handleClickLocation}>
                        <FaCrosshairs />
                    </ButtonComponent>
                </CardGroup>
            </Card>
                {listTrends()}
        </div>
    );
}

export default Twitter;