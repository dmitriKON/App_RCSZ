import React, { Component } from 'react';
import { Col } from "reactstrap";

class ResponseObject extends Component {
    constructor(props) {
       super(props); // obj, title, sm, border
    }

    render() {
        let style = {
            "padding": "4vh 4vh 4vh 4vh",
            "border": this.props.border || '1px solid black'
        }
        return(
            <Col sm={this.props.sm || 12} className='responseObject' style={style}>
                <h3 style={{'margin': '15px 0 15px 0'}}>{this.props.obj[this.props.title] || false}</h3>
                {Object.keys(this.props.obj).map(key => 
                    <p>{key}: {this.props.obj[key]}</p>
                    )}
            </Col>  
        )
    }
}

export default ResponseObject;