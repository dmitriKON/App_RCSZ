import React, { Component } from 'react';
import { Card, Container, Row, Col, Button } from "reactstrap";
import { NavLink } from 'react-router-dom';

class HomeCategoryButton extends Component {
    constructor(props) {
       super(props); // name, link
    }

    render() {
        return(
            <NavLink to={`${this.props.link}`}>
                <button className='homeCategoryBtn'>
                    {this.props.name}
                </button>
            </NavLink>    
        )
    }
}

export default HomeCategoryButton;