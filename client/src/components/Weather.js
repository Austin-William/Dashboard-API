import React, { useState } from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import "../styles/Weather.css";

const api = {
    key: "757cc44a754526bba2a64ebfd024d172",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {

    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const fetchWeather = () => {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
            })
    }

    const search = evt => {
        if (evt.key === "Enter") {
            fetchWeather();
        }
    }

    React.useEffect(() => {
        setInterval(fetchWeather, 10000);
    });

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

    return (
        <div className="Weather">
            <CardGroup className="Weather-cardgroup">
                <Card className="Weather-card">
                    <main className={
                        (typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? "Weather-warm" : "Weather-cold") : ""
                    }>
                        <Card.Title className="Weather-card-title">
                            Search a city
                        </Card.Title>
                        <Card.Body className="Weather-card-body">
                            <Card.Text className="Weather-card-text">
                                <div className="Weather-search">
                                    <input
                                        type="text"
                                        className="Weather-searchbar"
                                        placeholder="Search..."
                                        onChange={evt => setQuery(evt.target.value)}
                                        value={query}
                                        onKeyPress={search}
                                    />
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </main>
                </Card>
                {(typeof weather.main != "undefined") ? (
                    <Card className="Weather-card">
                        <Card.Body className="Weather-card-body">
                            <Card.Title className="Weather-card-title">Location</Card.Title>
                            <Card.Text className="Weather-card-text">
                                <div className="Weather-location-container">
                                    <div className="Weather-location">
                                        {weather.name}, {weather.sys.country}
                                    </div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : ('')}
                {(typeof weather.main != "undefined") ? (
                    <Card className="Weather-card">
                        <Card.Body className="Weather-card-body">
                            <Card.Title className="Weather-card-title">Date</Card.Title>
                            <Card.Text className="Weather-card-text">
                                <div className="Weather-location-container">
                                    <div className="Weather-location-date">
                                        {dateBuilder(new Date())}
                                    </div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : ('')}
                {(typeof weather.main != "undefined") ? (
                    <Card className="Weather-card">
                        <Card.Body className="Weather-card-body">
                            <Card.Title className="Weather-card-title">Temperature</Card.Title>
                            <Card.Text className="Weather-card-text">
                                <div className="Weather-location-container">
                                    <div className="Weather-location-weather">
                                        {Math.round(weather.main.temp)}°C
                                    </div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : ('')}
                {(typeof weather.main != "undefined") ? (
                    <Card className="Weather-card">
                        <Card.Body className="Weather-card-body">
                            <Card.Title className="Weather-card-title">Sky status</Card.Title>
                            <Card.Text className="Weather-card-text">
                                <div className="Weather-location-container">
                                    <div className="Weather-location-status">
                                        {weather.weather[0].main}
                                    </div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : ('')}
            </CardGroup>
        </div>
    )
}

export default Weather;