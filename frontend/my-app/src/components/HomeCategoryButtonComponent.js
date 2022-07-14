import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class HomeCategoryButton extends Component {
    // props: name, link
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