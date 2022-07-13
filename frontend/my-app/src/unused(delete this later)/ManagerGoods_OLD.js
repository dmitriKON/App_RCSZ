import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label } from "reactstrap";
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ResponseObject from './ResponseObjectComponent';
import { get_objects_sorted_by, get_products_by_category, add_object, update_object, delete_object } from '../features/shared/axiosRequests';
import { printResults } from '../features/shared/printUtil';

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

 class ManagerGoods extends Component {
    constructor(props) {
       super(props);

       this.state = {
            searchTypeDisplayed: null,
            productsList: null,
            searchByCategoryNumberResult: null,
       }

       this.getAllProducts = this.getAllProducts.bind(this);
       this.getProductsByCategoryNumber = this.getProductsByCategoryNumber.bind(this);

       this.addGood = this.addGood.bind(this)
       this.updateGood = this.updateGood.bind(this)
       this.deleteGood = this.deleteGood.bind(this)

       this.clearSearchResult = this.clearSearchResult.bind(this)
    }

    async getAllProducts () {
        if (!this.state.productsList) {
            let res = await get_objects_sorted_by(this.props.jwt, 'Product', 'product_name')
            this.setState({ productsList: res })
        }
        
        this.setState({ searchTypeDisplayed: 'all' })
    }


    async getProductsByCategoryNumber (e) {
        e.preventDefault()
        let res = await get_products_by_category(this.props.jwt, e.target.elements.searchProductsByCategoryNumber.value)
        this.setState({ searchByCategoryNumberResult: res })
    
        this.setState({ searchTypeDisplayed: 'category' })
    }

    async addGood(e) {
        e.preventDefault()
        if (!e.target.elements.category_number.value || !e.target.elements.characteristics_name.value || !e.target.elements.product_name.value) return
        let res = await add_object(this.props.jwt, {
            "obj_data": {
                "category_number": e.target.elements.category_number.value,
                "characteristics_name": e.target.elements.characteristics_name.value,
                "product_name": e.target.elements.product_name.value
              },
              "table_name": "Product"
        })
        this.clearSearchResult()
    }

    async updateGood(e) {
        e.preventDefault()
        if (!e.target.elements.id_product.value) return
        let reqObj = {
            "filter_data": {
                "id_product": e.target.elements.id_product.value,
              },
            "obj_data": {
              },
              "table_name": "Product"
        }

        if(e.target.elements.category_number.value) reqObj.obj_data.category_number = e.target.elements.category_number.value;
        if(e.target.elements.characteristics_name.value) reqObj.obj_data.characteristics_name = e.target.elements.characteristics_name.value;
        if(e.target.elements.product_name.value) reqObj.obj_data.product_name = e.target.elements.product_name.value;

        let res = await update_object(this.props.jwt, reqObj)
        this.clearSearchResult()
    }

    async deleteGood(e) {
        e.preventDefault()
        if (!e.target.elements.id_product.value) return
        let res = await delete_object(this.props.jwt, {
            "filter_data": {
              "id_product": e.target.elements.id_product.value
            },
            "table_name": "Product"
        })
        this.clearSearchResult()
    }

    clearSearchResult() {
        this.setState({ searchTypeDisplayed: null, productsList: null, searchByCategoryNumberResult: null })
    }


    render() {
        let allProductsListElement = (this.state.productsList) ? (
            <>
                {this.state.productsList.map(el => 
                    <ResponseObject obj={el} title='product_name'/>
                )}              
            </>
 
        ) : <>no all :c</>

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
            case 'category':
                searchResult = searchByCategoryElement;
                break;
            default:
                break;
        }

        let addGoodForm = 
        <Form onSubmit={e => this.addGood(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                <Row>
                    <Label htmlFor='category_number' sm={3}>category_number</Label>
                    <Col sm={9}>
                        <Input name='category_number' id='category_number'></Input>
                    </Col>
                </Row>                
                <Row>
                    <Label htmlFor='characteristics_name' sm={3}>characteristics_name</Label>
                    <Col sm={9}>
                        <Input name='characteristics_name' id='characteristics_name'></Input>
                    </Col>
                </Row>       
                <Row>
                    <Label htmlFor='product_name' sm={3}>product_name</Label>
                    <Col sm={9}>
                        <Input name='product_name' id='product_name'></Input>
                    </Col>
                </Row>
                <Row>
                    <Button type='submit' color='success' size="lg">Add</Button>
                </Row>
            </Container>       
        </Form>
        
        let updateGoodForm = 
        <Form onSubmit={e => this.updateGood(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                <Row>
                    <Label htmlFor='id_product' sm={3}>id_product</Label>
                    <Col sm={9}>
                        <Input name='id_product' id='id_product'></Input>
                    </Col>
                </Row>  
                <Row>
                    <Label htmlFor='category_number' sm={3}>category_number</Label>
                    <Col sm={9}>
                        <Input name='category_number' id='category_number'></Input>
                    </Col>
                </Row>                
                <Row>
                    <Label htmlFor='characteristics_name' sm={3}>characteristics_name</Label>
                    <Col sm={9}>
                        <Input name='characteristics_name' id='characteristics_name'></Input>
                    </Col>
                </Row>       
                <Row>
                    <Label htmlFor='product_name' sm={3}>product_name</Label>
                    <Col sm={9}>
                        <Input name='product_name' id='product_name'></Input>
                    </Col>
                </Row>
                <Row>
                    <Button type='submit' color='info' size="lg">Update</Button>
                </Row>
            </Container>       
        </Form>
        
        let deleteGoodForm = 
        <Form onSubmit={e => this.deleteGood(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                <Row>
                    <Label htmlFor='id_product' sm={3}>id_product</Label>
                    <Col sm={9}>
                        <Input name='id_product' id='id_product'></Input>
                    </Col>
                </Row>
                <Row>
                    <Button type='submit' color='danger' size="lg">Delete</Button>
                </Row>
            </Container>       
        </Form>

        return (
            <div>
                <Header/>
                <Container>
                    <Row style={{'marginBottom': '15px'}}>
                        <Form onSubmit={e => this.getProductsByCategoryNumber(e)}>
                            <Row className="form-group">
                                <Col xs={2}  style={{'textAlign': 'right'}}>
                                    <Button onClick={this.clearSearchResult} color="warning">Clear</Button>
                                </Col>
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
                        <Col xs={12}>
                            {addGoodForm}
                        </Col>
                        <Col xs={12}>
                            {updateGoodForm}
                        </Col>
                        <Col xs={12}>
                            {deleteGoodForm}
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={() => {
                            if (this.state.productsList != null) {
                                printResults(this.state.productsList)
                            } else {
                                alert("Nothing to print!")
                            }
                        }}>
                                Print results
                        </Button>
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
export default connect(mapStateToProps)(ManagerGoods);