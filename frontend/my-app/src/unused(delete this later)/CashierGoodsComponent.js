import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input } from "reactstrap";
import { connect } from 'react-redux';

import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import ResponseObject from '../components/ResponseObjectComponent';
import { get_objects_sorted_by, search_product_by_name, search_products_by_category } from '../features/shared/axiosRequests';

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

 class CashierGoods extends Component {
    constructor(props) {
       super(props);

       this.state = {
            searchTypeDisplayed: null,
            productsList: null,
            searchByNameResult: null,
            searchByCategoryNumberResult: null,
       }

       this.getAllProducts = this.getAllProducts.bind(this);
       this.getProductByName = this.getProductByName.bind(this);
       this.getProductsByCategoryNumber = this.getProductsByCategoryNumber.bind(this);

       this.clearSearchResult = this.clearSearchResult.bind(this)
    }

    async getAllProducts () {
        if (!this.state.productsList) {
            let res = await get_objects_sorted_by(this.props.jwt, 'Product', 'product_name')
            this.setState({ productsList: res })
        }
        
        this.setState({ searchTypeDisplayed: 'all' })
    }

    async getProductByName (e) {
        e.preventDefault()
        let res = await search_product_by_name(this.props.jwt, e.target.elements.searchProductByName.value)
        this.setState({ searchByNameResult: res })
        
        this.setState({ searchTypeDisplayed: 'name' })
    }

    async getProductsByCategoryNumber (e) {
        e.preventDefault()
        let res = await search_products_by_category(this.props.jwt, e.target.elements.searchProductsByCategoryNumber.value)
        this.setState({ searchByCategoryNumberResult: res })
    
        this.setState({ searchTypeDisplayed: 'category' })
    }

    clearSearchResult() {
        this.setState({ searchTypeDisplayed: null, productsList: null, searchByNameResult: null, searchByCategoryNumberResult: null })
    }


    render() {
        let allProductsListElement = (this.state.productsList) ? (
            <>
                {this.state.productsList.map(el => 
                    <ResponseObject obj={el} title='product_name'/>
                )}              
            </>
 
        ) : <>no all :c</>

        let searchByNameElement = (this.state.searchByNameResult) ? (
            <>
                {this.state.searchByNameResult.map(el => 
                    <ResponseObject obj={el} title='product_name'/>
                )}              
            </>
 
        ) : <>no name :c</>

        let searchByCategoryElement = (this.state.searchByCategoryNumberResult) ? (
            <>
                {this.state.searchByCategoryNumberResult.map(el => 
                    <ResponseObject obj={el} title='product_name'/>
                )}              
            </>
 
        ) : <>no category :c</>


        let searchResult;
        switch(this.state.searchTypeDisplayed) {
            case 'all':
                searchResult = allProductsListElement;
                break;
            case 'name':
                searchResult = searchByNameElement;
                break;
            case 'category':
                searchResult = searchByCategoryElement;
                break;
            default:
                break;
        }
        

        return (
            <div>
                <Header/>
                <Container>
                    <Row style={{'marginBottom': '15px'}}>
                        <Form onSubmit={e => this.getProductByName(e)}>
                            <Row className="form-group">
                                <Col xs={2} style={{'textAlign': 'right'}}>
                                    <Button onClick={this.clearSearchResult} color="warning">Clear</Button>
                                </Col>
                                <Col xs={8}>
                                    <div>
                                        <Input name='searchProductByName' id='searchProductByName' placeholder='Product name'/>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <Button type='submit' color='primary'>Search</Button><br/>
                                </Col>
                            </Row>
                        </Form>
                        <Form onSubmit={e => this.getProductsByCategoryNumber(e)}>
                            <Row className="form-group">
                                <Col xs={2}></Col>
                                <Col xs={8}>
                                    <div>
                                        <Input name='searchProductsByCategoryNumber' id='searchProductsByCategoryNumber' placeholder='Product category number'/>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <Button type='submit' color='primary'>Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                    <Row>
                        <Col sm={3}></Col> 
                        <Col sm={6} style={{'textAlign': 'center'}}>
                            <Button size='lg' onClick={this.getAllProducts} block>All Goods</Button>
                        </Col> 
                    </Row>
                    <Row>
                        {searchResult}
                    </Row>
                </Container>
                <Footer/>
            </div>
        )
    }
}
export default connect(mapStateToProps)(CashierGoods);