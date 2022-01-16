import React from "react";
import { Card, CardGroup, Col } from "react-bootstrap";
import "../styles/Github.css";

const API = 'https://api.github.com/users';

class Search extends React.Component {

    handleForm(e) {
        e.preventDefault();
        this.props.fetchProfile(this.refs.username.value);
    }

    render() {
        return (
            <Card className="Github-card">
                <form onSubmit={this.handleForm.bind(this)}>
                    <input className="Github-searchbar" type="search" ref="username" placeholder="Username" />
                </form>
            </Card>
        )
    }
}

class Profile extends React.Component {
    render() {
        let data = this.props.data;

        if (data.notFound === 'Not Found')
            return (
                <div className="Github-not-found">
                    <h2>Wanna search someone ?</h2>
                </div>
            );
        else {
            return (
                <Card className="Github-card">
                    <div className="Github-profile-user">
                        <Card.Img className="Github-card-image" src={data.avatar} alt={data.username}/>
                        <Card className="Github-card-user">
                            <Card.Body className="Github-card-body">
                                <a href={data.url} target="_blank" rel="noreferrer">
                                    {data.username}
                                </a>
                                <h5>
                                    {data.name}
                                </h5>
                            </Card.Body>
                            <Card.Footer className="Github-card-footer">
                                <i>{data.location}</i>
                                {data.bio}
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className="Github-profile-repo">
                        <CardGroup>
                            <Card className="Github-card-repo">
                                <i>
                                    {data.followers}
                                </i>
                                <span>
                                    Followers
                                </span>
                            </Card>
                            <Card className="Github-card-repo">
                                <i>
                                    {data.repos}
                                </i>
                                <span>
                                    Repositoriy
                                </span>
                            </Card>
                            <Card className="Github-card-repo">
                                <i>
                                    {data.following}
                                </i>
                                <span>
                                    Following
                                </span>
                            </Card>
                        </CardGroup>
                    </div>
                </Card>
            );
        }
    }
}

class Github extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'austin-william',
            name: '',
            avatar: '',
            location: '',
            bio: '',
            repos: '',
            followers: '',
            following: '',
            homeUrl: '',
            notFound: ''
        }
    }

    fetchProfile(username) {
        let url = `${API}/${username}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    username: data.login,
                    name: data.name,
                    avatar: data.avatar_url,
                    location: data.location,
                    repos: data.public_repos,
                    bio: data.bio,
                    followers: data.followers,
                    following: data.following,
                    homeUrl: data.html_url,
                    notFound: data.message
                })
            })
            .catch((error) => console.log('Could not fetch user data from Github api : ' + error))
    }

    componentDidMount() {
        this.fetchProfile(this.state.username);
    }

    render() {
        return (
            <div className="Github">
                <Col>
                    <Search fetchProfile={this.fetchProfile.bind(this)} />
                    <Profile data={this.state} />
                </Col>
            </div>
        )
    }
}

export default Github;