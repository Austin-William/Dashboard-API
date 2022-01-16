import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import youtubeApi from "../api/youtube";
import "../styles/Youtube.css";

class Searchbar extends React.Component {
    state = {
        term: ''
    };
    handleChange = (event) => {
        this.setState({
            term: event.target.value
        });
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state.term);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input className="Youtube-searchbar" placeholder="Search a video" onChange={this.handleChange} name='video-search' type="text" value={this.state.term} />
            </form>
        )
    }
}

const VideoDetail = ({ video }) => {
    if (!video) {
        return (
            <div className="Youtube-loading">Waiting a video selected</div>
        );
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    console.log(typeof (video));
    return (
        <div className="Youtube-video">
            <Card className="Youtube-card-player">
                <Card.Header className="Youtube-card-header">
                    <iframe className="Youtube-iframe" src={videoSrc} allowFullScreen title='Video player' />
                </Card.Header>
                <Card.Title className='Youtube-videos-title'>
                    {video.snippet.title}
                </Card.Title>
                <Card.Text>
                    {video.snippet.description}
                </Card.Text>
            </Card>
        </div>
    )
}

const VideoItem = ({ video, handleVideoSelect }) => {
    return (
        <div onClick={() => handleVideoSelect(video)} className='Youtube-item'>
            <Row>
                <Col xs={12} md={6}>
                    <Card className="Youtube-card">
                        <img className='Youtube-image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description} />
                        <h4 className='Youtube-videos-title '>
                            {video.snippet.title}
                        </h4>
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

const VideoList = ({ videos, handleVideoSelect }) => {
    const renderedVideos = videos.map((video) => {
        return (
            <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
        );
    });

    return (
        <div className='Youtube-videos-list'>
            <hr className="Youtube-hr" />
            {renderedVideos}
        </div>
    );
};

class Youtube extends React.Component {

    state = {
        videos: [],
        selectedVideo: null
    }
    handleSubmit = async (termFromSearchBar) => {
        const response = await youtubeApi.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })
        this.setState({
            videos: response.data.items
        })
    };
    handleVideoSelect = (video) => {
        this.setState({ selectedVideo: video })
    }
    render() {
        return (
            <div className="Youtube">
                <div className="Youtube-cardgroup">
                    <Card className="Youtube-card">
                        <Card.Title className="Youtube-card-title">
                            Search something cool !
                        </Card.Title>
                        <Card.Body className="Youtube-card-body">
                            <Searchbar handleFormSubmit={this.handleSubmit} />
                        </Card.Body>
                    </Card>
                    <Card className="Youtube-card-videos">
                        <div className="Youtube-videos-column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="Youtube-videos-list">
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos} />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

}

export default Youtube;