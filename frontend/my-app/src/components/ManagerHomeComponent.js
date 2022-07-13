import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import HomeCategoryButton from './HomeCategoryButtonComponent';

class ManagerHome extends Component {
    constructor(props) {
       super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col lg={6} className='colHomeCategoryButton' style={{'textAlign': 'right'}}>
                        <HomeCategoryButton name='Goods' link='/home/manager-goods'/>
                    </Col>
                    <Col lg={6} className='colHomeCategoryButton' style={{'textAlign': 'left'}}>
                        <HomeCategoryButton name='Groups' link='/home/manager-groups'/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ManagerHome;