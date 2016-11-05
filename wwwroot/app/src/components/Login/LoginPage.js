import React, { Component } from 'react';
import { ApiRequest } from '../../services/ApiRequest';
import  ApiRequestsErrorHandler  from '../../services/ApiRequestsErrorHandler';

import './login.css'

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldShowErrorMsg: false,
            errorMsg: ''
        };
    }

    hideErrorMsg() {
        this.setState({ shouldShowErrorMsg: false });
    }

    showErrorMsg(msg) {
        this.setState({ shouldShowErrorMsg: true, errorMsg: msg });
    }

    loginSuccessfully() {
        this.props.router.push('/pantry');
    }

    failedLogin(err) {
        this.showErrorMsg(ApiRequestsErrorHandler.getErrorMessage(err));
    }
    
    login() {
        this.hideErrorMsg();

        var email = this.refs.email.value;
        var password = this.refs.password.value;

        var user = { email, password };

        ApiRequest
            .login(user)
            .then(this.loginSuccessfully.bind(this), this.failedLogin.bind(this));
    }


    render() {
        return (
            <div>
                <h3> Login </h3>
                <input type="email" ref="email" placeholder="john@doe.com" />
                <br />
                <br />
                <input type="password" ref="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                <br />
                <br />
                <button onClick={(event) => this.login()}> Login </button>
                <br />
                <div className="login__error-msg { this.state.shouldShowErrorMsg? 'login__error-msg--hidden' : ''}">
                    {this.state.errorMsg}
                </div>
            </div>
        );

    }
}