import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { changeJwt } from '../features/redux/ActionCreators';
import Login from './LoginComponent'
import Home from './HomeComponent'  
import ManagerGoods from './ManagerGoodsComponent';
import ManagerGroups from './ManagerGroupsComponent'

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }
 
 const mapDispatchToProps = (dispatch) => ({
    changeJwt: (jwt) => dispatch(changeJwt(jwt)),
 });

class Main extends Component {
    constructor(props) {
       super(props);
    }
    
    render() {
        if (!this.props.jwt) {
            return(
                <Login changeJwt={this.props.changeJwt}/>
            )
        }
        else {
            return (
                <Switch>
                    <Route exact path="/" component={() => <Home/>} />
                    <Route exact path="/home" component={() => <Home/>} />
                    <Route path="/home/manager-goods" component={() => <ManagerGoods/>} />
                    <Route path="/home/manager-groups" component={() => <ManagerGroups/>} />
                    <Redirect to="/home" />
                </Switch>                
            )
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
