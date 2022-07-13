import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut, profile } from '../features/redux/ActionCreators';
import {
    Container,
    Col, Row,
    Modal, ModalHeader, ModalBody, Button,} from 'reactstrap';
import { NavLink } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

 const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut()),
    profile: (jwt) => dispatch(profile(jwt)),
 });

class Header extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            isSelfInfoModalOpen: false,  
            isLogOutModelOpen: false,
            isNavOpen: false,
            selfInfo: null,
        };

        this.toggleSelfInfo = this.toggleSelfInfo.bind(this);
        this.toggleLogOutModal = this.toggleLogOutModal.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleSelfInfo() {
        this.setState({isSelfInfoModalOpen: !this.state.isSelfInfoModalOpen});
     }
     
    toggleLogOutModal() {
        this.setState({isLogOutModelOpen: !this.state.isLogOutModelOpen});
     }

     toggleNav() {
        this.setState({isNavOpen: !this.state.isNavOpen});
     }

     componentDidMount() {
     }

     render() {

        return (
            <div className="container header" style={{'maxWidth': 'inherit'}}>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10} style={{'textAlign': 'center'}}>
                        <NavLink to="/home" id='headerLogo'>ZLAGODA</NavLink>
                    </Col>
                    <Col md={1} style={{'textAlign': 'right', 'display': 'flex', 'alignItems': 'center',}}>
                        <Button onClick={this.toggleLogOutModal} style={{'background':'#8badc4'}} size="lg">Log Out</Button>
                    </Col>
                </Row>
            
            <Modal isOpen={this.state.isLogOutModelOpen} toggle={this.toggleLogOutModal}>
                <ModalHeader toggle={this.toggleLogOutModal}>Do you really want to log out?</ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col sm={6} style={{'textAlign': 'center'}}>
                                <Button onClick={this.props.logOut} size={'lg'} color="success">Yes</Button>
                            </Col>
                            <Col sm={6} style={{'textAlign': 'center'}}>
                                <Button onClick={this.toggleLogOutModal} size={'lg'} color="danger">No</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);