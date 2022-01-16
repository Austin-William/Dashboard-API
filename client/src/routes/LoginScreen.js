import React from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../api/firebase";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/LoginScreen.css";

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            message: "",
            connected: false
        };
    }

    handleClick(event) {

        const auth = getAuth(firebaseApp);
        signInWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then(() => {
                this.setState({
                    connected: true,
                    message: "Logged in successfully"
                })
            }).catch(() => {
                this.setState({ message: "Can't log in, please check your email and password" });
            });

        onAuthStateChanged(auth, user => {
            if (this.state.connected) {
                this.setState({ message: "Logged in successfully" });
                this.setState({ connected: true });
            } else {
                this.setState({ message: "Can't log in, please check your email and password" });
            }
        });
    }

    render() {
        return (
            <div className="LoginScreen">
                <Header />
                <div className="LoginScreen-container">
                    <div>
                        <h1 class="mt-5" className="LoginScreen-title">Login</h1>
                    </div>
                    <form className="LoginScreen-form">
                        <div class="form-group" className="LoginScreen-label-email">
                            <label for="emailValue">Email address</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        @
                                    </span>
                                </div>
                                <input
                                    onChange={(newValue) => this.setState({ email: newValue.target.value })}
                                    type="email"
                                    class="form-control"
                                    id="emailValue"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email" />
                            </div>
                        </div>
                        <div class="form-group" className="LoginScreen-label-password">
                            <label for="passwordValue">Password</label>
                            <input
                                onChange={(newValue) => this.setState({ password: newValue.target.value })}
                                type="password"
                                class="form-control"
                                id="passwordValue"
                                placeholder="Password" />
                            <div className="LoginScreen-error-message-connection">
                                {
                                    this.state.connected ?
                                        <small className="LoginScreen-small-missing">
                                            {this.state.message}
                                        </small>
                                        :
                                        <small className="LoginScreen-small-connected">
                                            {this.state.message}
                                        </small>
                                }
                            </div>
                        </div>
                        <hr className="LoginScreen-hr" />
                        <div className="LoginScreen-already-account">
                            <Link to="/register" className="LoginScreen-already-account-link">
                                Create an account
                            </Link>
                        </div>
                        {
                            this.state.connected ?
                                <Link to="/dashboard">
                                    <ButtonComponent
                                        onClick={(event) => this.handleClick(event)}
                                        className="LoginScreen-login-button"
                                        variant="btn btn-success"
                                        size="lg">
                                        Start
                                    </ButtonComponent>
                                </Link>
                                : <ButtonComponent
                                    onClick={(event) => this.handleClick(event)}
                                    className="LoginScreen-login-button"
                                    variant="outline-light"
                                    size="lg">
                                    Submit
                                </ButtonComponent>
                        }
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
};

export default LoginScreen;