import React, { Component } from 'react';
import { Col, Row, Button, Form, Input, Label } from 'reactstrap';
import axios from 'axios';

import '.././App.css';
import { requestUrl } from '../features/shared/urls';

class Login extends Component {

    constructor(props) {
       super(props);
       
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault()
        if (!e.target.elements.username.value) {
            alert('Enter username')
            return
        } else if (!e.target.elements.password.value) {
            alert('Enter password')
            return
        }
        await axios.post(requestUrl + 'login', {username: e.target.elements.username.value, password: e.target.elements.password.value})
        .then((response) => {
            this.props.changeJwt(response.data.jwt)
        })
        .catch(err => console.log(err));
    }

    render () {
        return (
            <div className="container loginContainer">
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Row className="form-group">
                        <Label htmlFor="username" md={2}>Phone Number</Label>
                        <Col md={10}>
                            <Input name="username" id="username" />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="password" md={2}>Password</Label>
                        <Col md={10}>
                            <Input type="password" name="password" id="password" placeholder="********"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={6}></Col>
                        <Col md={4}>
                            <Button type='submit' color='primary' size="lg">Log in</Button>
                        </Col>
                    </Row>     
                </Form>
            </div>
        )
    }
}

export default Login;