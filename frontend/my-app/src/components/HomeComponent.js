import { Component } from 'react';
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import ManagerHome from './ManagerHomeComponent';
import Footer from './FooterComponent';


const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

class Home extends Component {
    constructor(props) {
       super(props);
    }

    render() {
        return (
            <div className='homeBody'>
                <Header/>
                <ManagerHome/>
                <Footer/>
            </div>            
        )
    }
}

export default connect(mapStateToProps)(Home);