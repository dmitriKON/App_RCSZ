import React, { Component } from 'react';
import { Card, Container, Row, Col, Button } from "reactstrap";
import HomeCategoryButton from '../components/HomeCategoryButtonComponent';

class CashierHome extends Component {
    constructor(props) {
       super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={6} style={{'textAlign': 'right'}}>
                        <HomeCategoryButton name='Goods' link='/home/cashier-goods'/>
                    </Col>
                    <Col sm={6} style={{'textAlign': 'left'}}>
                        <HomeCategoryButton name='Goods in Store' link='/home/cashier-goods-in-store'/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} style={{'textAlign': 'right'}}>
                        <HomeCategoryButton name='Checks' link='/home/cashier-checks'/>
                    </Col>
                    <Col sm={6} style={{'textAlign': 'left'}}>
                        <HomeCategoryButton name='Clients' link='/home/cashier-clients'/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CashierHome;