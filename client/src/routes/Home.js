import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import ButtonComponent from "../components/Button";
import "../styles/Home.css";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.responseGoogleFail = (response) => {
            console.log("Fail : ", response);
        }
        this.responseGoogle = (response) => {
            console.log("Success : ", response);
        }

        this.state = {
            login: false,
            items: [],
        }
        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        fetch('/api/firebase')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    items: result
                });
            });
    }

    changeState() {
        if (this.responseGoogle) {
            this.setState({
                login: true
            })
        }
    }

    render() {
        const { login } = this.state;
        const { items } = this.state;
        console.log(items);
        console.log(items.clientId);
        let title = login ? "WELCOME TO YOUR DASHBOARD !" : "DASHBOARD";
        return (
            <body className="Home" style={{ backgroundImage: `url("/images/img-home.jpg")`, backgroundRepeat: 'no-repeat', height: '1080px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="Home-container">
                    <div className="Home-container-title" class="mb-5">
                        <h1 className="Home-title" >{title}</h1>
                    </div>
                    <div className="Home-container-button" class="text-center">
                        {
                            !login ?
                                <Link to="/login/">
                                    <ButtonComponent className="Home-login-button" variant="outline-light" size="lg">
                                        Sign in
                                    </ButtonComponent>
                                </Link> : null
                        }
                    </div>
                    <div className="Home-container-button" class="mx-auto my-5 text-center">
                        {
                            !login ?
                                <GoogleLogin
                                    clientId={"132214192804-oh969ab9n0d4rob3tor78nepo5d7qfuj.apps.googleusercontent.com"}
                                    render={(renderProps) => (
                                        <ButtonComponent onClick={() => { renderProps.onClick(); this.changeState() }} className="Home-login-button-google" variant="outline-light" size="lg">
                                            Connect with Google
                                        </ButtonComponent>
                                    )}
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogleFail}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}
                                />
                                :
                                <div className="Home-container-button" class="text-center">
                                    <Link to="/dashboard/">
                                        <ButtonComponent className="Home-start-button" variant="outline-light" size="lg">
                                            Let's start
                                        </ButtonComponent>
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
            </body>
        );
    }
}

export default Home;