import React, { Component } from 'react';
import { Col } from "reactstrap";

class ResponseObject extends Component {
    constructor(props) {
       super(props); // obj, title
    }

    render() {
        return(
            <Col sm={12} className='responseObject'>
                <h3 style={{'margin': '15px 0 15px 0'}}>{this.props.obj[this.props.title] || false}</h3>
                {Object.keys(this.props.obj).map(key => 
                    <p>{key}: {this.props.obj[key]}</p>
                    )}
            </Col>  
        )
    }
}

export default ResponseObject;