import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../api/firebase";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/RegisterScreen.css";

class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            correctEmail: false,
            confirmPassword: "",
            errorMessage: "",
            registerd: false,
        };
    }

    handleClick(event) {
        const auth = getAuth(firebaseApp);
        createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then(() => {
                this.setState({
                    correctEmail: true,
                });
            }).catch(() => {
                this.setState({
                    errorMessage: "Invalid email or password : email already used or password too short (min 6 characters)",
                });
            });
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errorMessage: "Your password and confirm password are not the same" });
        }
        if (this.state.password === this.state.confirmPassword && this.state.correctEmail && this.state.password !== "" && this.state.email !== "") {
            this.setState({ registerd: true });
        }
    }

    render() {
        return (
            <div className="RegisterScreen">
                <Header />
                <div className="RegisterScreen-container">
                    <div>
                        <h1 class="mt-5" className="RegisterScreen-title">Register</h1>
                    </div>
                    <form className="RegisterScreen-form">
                        <div class="form-group" className="RegisterScreen-label-email">
                            <label for="exampleInputEmail1">Email address</label>
                            <input
                                onChange={(newValue) => this.setState({ email: newValue.target.value })}
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email" />
                        </div>
                        <div class="form-group" className="RegisterScreen-label-password">
                            <label for="password">Password</label>
                            <input
                                onChange={(newValue) => this.setState({ password: newValue.target.value })}
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Password" />
                        </div>
                        <div class="form-group" className="RegisterScreen-label-confirm-password">
                            <label for="password">Confirm your password</label>
                            <input
                                onChange={(newValue) => this.setState({ confirmPassword: newValue.target.value })}
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Confirm your password" />
                        </div>
                        <div className="RegisterScreen-error-message-connection">
                            {
                                (this.state.errorMessage && !this.state.correctEmail) ?
                                    <p className="RegisterScreen-error-message">
                                        {this.state.errorMessage}
                                    </p>
                                    :
                                    null
                            }
                        </div>
                        <hr className="RegisterScreen-hr" />
                        <div className="RegisterScreen-already-account">
                            <Link to="/login" className="RegisterScreen-already-account-link">
                                Already have an account ?
                            </Link>
                        </div>
                        {
                            this.state.registerd ?
                                <Link to="/login">
                                    <ButtonComponent onClick={(event) => this.handleClick(event)} className="RegisterScreen-register-button" variant="outline-light" size="lg">Login with your account</ButtonComponent>
                                </Link>
                                :
                                <ButtonComponent onClick={(event) => this.handleClick(event)} className="RegisterScreen-register-button" variant="outline-light" size="lg">Submit</ButtonComponent>
                        }
                    </form>
                </div>
                <Footer />
            </div>
        )
    }
}

export default RegisterScreen;