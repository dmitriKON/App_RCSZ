import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input } from "reactstrap";
import { connect } from 'react-redux';

import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import ResponseObject from '../components/ResponseObjectComponent';
import { get_objects_sorted_by, get_product_info_by_upc, get_prom_or_non_prom_product } from '../features/shared/axiosRequests';

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

 class CashierGoodsInStore extends Component {
    constructor(props) {
       super(props);

       this.state = {
            searchTypeDisplayed: null,
            searchProductsResult: null,
            searchByUPCResult: null,
       }

       this.getProducts = this.getProducts.bind(this);
       this.getProductByUPC = this.getProductByUPC.bind(this);
       
       this.clearSearchResult = this.clearSearchResult.bind(this)
    }

    async getProducts (e) {
        e.preventDefault()
        let sortBy = e.target.elements.product_sort_by_options.value
        let res;
        switch (e.target.elements.product_promotional_filter.value) {
            case 'all': {
                res = await get_objects_sorted_by(this.props.jwt, 'Store_Product', sortBy)
                break;
            }
            case 'promotional': {
                res = await get_prom_or_non_prom_product(this.props.jwt, true, sortBy == 'product_name')
                break;
            }
            case 'non-promotional': {
                res = await get_prom_or_non_prom_product(this.props.jwt, false, sortBy == 'product_name')
                break;
            }
        }
        
        this.setState({ searchProductsResult: res })
        this.setState({ searchTypeDisplayed: e.target.elements.product_promotional_filter.value })
    }

    async getProductByUPC (e) {
        e.preventDefault()
        let res = await get_product_info_by_upc(this.props.jwt, e.target.elements.searchProductByUPC.value)
        this.setState({ searchByUPCResult: res })
        
        this.setState({ searchTypeDisplayed: 'upc' })
    }

    clearSearchResult() {
        this.setState({ searchTypeDisplayed: null, searchProductsResult: null, searchByUPCResult: null })
    }

    render() {
        let searchByUPCElement = (this.state.searchByUPCResult) ? (
            <ResponseObject obj={this.state.searchByUPCResult} title='product_name'/>  
        ) : <>no name :c</>

        let allSearchProductsResultElement = (this.state.searchProductsResult) ? (
            <>
                {this.state.searchProductsResult.map(el => 
                    <ResponseObject obj={el} title='product_name'/>
                )}              
            </>
 
        ) : <>no all :c</>


        let searchResult;
        switch(this.state.searchTypeDisplayed) {
            case 'all':
            case 'promotional':
            case 'non-promotional':
                searchResult = allSearchProductsResultElement;
                break;    
            case 'upc':
                searchResult = searchByUPCElement;
                break;
            default:
                break;
        }
        

        return (
            <div>
                <Header/>
                <Container>
                    <Row style={{ "marginBottom": "15px" }}>
                        <Form onSubmit={e => this.getProductByUPC(e)}>
                            <Row className="form-group">
                                <Col xs={2}>
                                    <Button onClick={this.clearSearchResult} color="warning">Clear</Button></Col>
                                <Col xs={8}>
                                    <div>
                                        <Input name='searchProductByUPC' id='searchProductByUPC' placeholder='UPC'/>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <Button type='submit' color='primary'>Search</Button><br/>
                                </Col>
                            </Row>
                        </Form>
                        {/* <Form onSubmit={e => this.getProductsByCategoryNumber(e)}>
                            <Row className="form-group">
                                <Col xs={2}></Col>
                                <Col xs={8}>
                                    <div style={{'marginBottom': '15px'}}>
                                        <Input name='searchProductsByCategoryNumber' id='searchProductsByCategoryNumber' placeholder='Product category number'/>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <Button type='submit' color='primary'>Search</Button>
                                </Col>
                            </Row>
                        </Form> */}
                    </Row>
                    <Row style={{ "marginBottom": "15px" }}>
                        <Form onSubmit={e => this.getProducts(e)}>
                            <Row>
                                <Col sm={1}></Col>
                                <Col sm={2}>
                                    <Input type="select" name='product_sort_by_options' id='product_sort_by_options'>
                                        <option value={"product_name"}>Name</option>
                                        <option value={"products_number"}>Number</option>
                                    </Input>
                                </Col> 
                                <Col sm={6} style={{'textAlign': 'center'}}>
                                    <Button size='lg' type='submit' block>Search goods</Button>
                                </Col>
                                <Col sm={2}>
                                    <Input type="select" name='product_promotional_filter' id='product_promotional_filter'>
                                        <option value={"all"}>All</option>
                                        <option value={"promotional"}>Promotional</option>
                                        <option value={"non-promotional"}>Non-promotional</option>
                                    </Input>
                                </Col>                            
                            </Row>
                        </Form>    
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
export default connect(mapStateToProps)(CashierGoodsInStore);