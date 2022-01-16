import React from 'react';
import { Card } from 'react-bootstrap';
import "../styles/Clock.css";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        time: new Date().toLocaleTimeString()
        };
    }
    
    componentDidMount() {
        this.timerID = setInterval(
        () => this.tick(),
        1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    tick() {
        this.setState({
        time: new Date().toLocaleTimeString()
        });
    }
    
    render() {
        return (
        <Card className="Clock">
            <Card.Body>
            <Card.Title className="Clock-title">{this.state.time}</Card.Title>
            </Card.Body>
        </Card>
        );
    }
}

export default Clock;