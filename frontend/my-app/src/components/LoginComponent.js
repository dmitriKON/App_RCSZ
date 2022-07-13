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
        await axios.post(requestUrl + 'login', {username: e.target.elements.phone_number.value, password: e.target.elements.password.value})
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
                        <Label htmlFor="phone_number" md={2}>Phone Number</Label>
                        <Col md={10}>
                            <Input name="phone_number" id="phone_number" />
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