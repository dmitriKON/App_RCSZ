import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label } from "reactstrap";
import { connect } from 'react-redux';
// import html2canvas from "html2canvas";

import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import ResponseObject from '../components/ResponseObjectComponent';
import { get_objects_sorted_by, get_store_products_by_upc, get_prom_or_non_prom_product, add_object, update_object, delete_object, get_n_of_sold_product } from '../features/shared/axiosRequests';
import { printResults } from '../features/shared/printUtil';

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

 class ManagerGoodsInStore extends Component {
    constructor(props) {
       super(props);

       this.state = {
            searchTypeDisplayed: null,
            searchProductsResult: null,
            searchByUPCResult: null,
            searchNumberOfSoldProductResult: null
       }

       this.getProducts = this.getProducts.bind(this);
       this.getProductByUPC = this.getProductByUPC.bind(this);

       this.addGood = this.addGood.bind(this)
       this.updateGood = this.updateGood.bind(this)
       this.deleteGood = this.deleteGood.bind(this)

       this.getNumberOfSoldProductByDates = this.getNumberOfSoldProductByDates.bind(this)
       
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
        let res = await get_store_products_by_upc(this.props.jwt, e.target.elements.searchProductByUPC.value)
        this.setState({ searchTypeDisplayed: 'upc', searchByUPCResult: res  })
    }


    async addGood(e) {
        e.preventDefault()
        if (!e.target.elements.id_product.value || !e.target.elements.selling_price.value || !e.target.elements.products_number.value || !e.target.elements.promotional_product.value) return
        let res = await add_object(this.props.jwt, {
            "obj_data": {
                "id_product": e.target.elements.id_product.value,
                "selling_price": e.target.elements.selling_price.value,
                "products_number": e.target.elements.products_number.value,
                "promotional_product": (e.target.elements.promotional_product.value) ? true : false
              },
              "table_name": "Store_Product"
        })
        this.clearSearchResult()
    }

    async updateGood(e) {
        e.preventDefault()
        if (!e.target.elements.UPC.value) return
        let reqObj = {
            "filter_data": {
                "UPC": e.target.elements.UPC.value,
              },
            "obj_data": {
              },
              "table_name": "Store_Product"
        }


        if(e.target.elements.id_product.value) reqObj.obj_data.id_product = e.target.elements.id_product.value;
        if(e.target.elements.selling_price.value) reqObj.obj_data.selling_price = e.target.elements.selling_price.value;
        if(e.target.elements.products_number.value) reqObj.obj_data.products_number = e.target.elements.products_number.value;
        if(e.target.elements.promotional_product.value) reqObj.obj_data.promotional_product = (e.target.elements.promotional_product.value == '0') ? false : true;

        let res = await update_object(this.props.jwt, reqObj)
        this.clearSearchResult()
    }

    async deleteGood(e) {
        e.preventDefault()
        if (!e.target.elements.UPC.value) return
        let res = await delete_object(this.props.jwt, {
            "filter_data": {
              "UPC": e.target.elements.UPC.value
            },
            "table_name": "Store_Product"
        })
        this.clearSearchResult()
    }

    async getNumberOfSoldProductByDates(e) {
        e.preventDefault()
        if (!e.target.elements.fromDay.value || !e.target.elements.fromMonth.value || !e.target.elements.fromYear.value
             || !e.target.elements.toDay.value || !e.target.elements.toMonth.value || !e.target.elements.toYear.value || !e.target.elements.searchProductByUPC.value) return

        let res = await get_n_of_sold_product(this.props.jwt, e.target.elements.searchProductByUPC.value, `${e.target.elements.fromYear.value}-${e.target.elements.fromMonth.value}-${e.target.elements.fromDay.value}`,
        `${e.target.elements.toYear.value}-${e.target.elements.toMonth.value}-${e.target.elements.toDay.value}`)


        this.setState({ searchTypeDisplayed: 'number', searchNumberOfSoldProductResult: res  })
    }

    clearSearchResult() {
        this.setState({
            searchTypeDisplayed: null,
            searchProductsResult: null,
            searchByUPCResult: null,
            searchNumberOfSoldProductResult: null})
    }

    // async handleDownloadImage () {
    //     // const element = (this.state.searchTypeDisplayed === 'upc') ? document.getElementById('print2') : document.getElementById('print1'),
    //     const element =  document.getElementById("result"),
    //     canvas = await html2canvas([element]),
    //     data = canvas.toDataURL('image/jpg'),
    //     link = document.createElement('a');
     
    //     link.href = data;
    //     link.download = 'downloaded-image.jpg';
     
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   };

    render() {
        let searchByUPCElement = (this.state.searchByUPCResult) ? (
            <ResponseObject obj={this.state.searchByUPCResult} title='product_name'  id="result2"/>  
        ) : <>no name :c</>

        let allSearchProductsResultElement = (this.state.searchProductsResult) ? (
            <>
                {this.state.searchProductsResult.map(el => 
                    <ResponseObject obj={el} title='product_name'/>
                )}              
            </>
 
        ) : <>no all :c</>

        let searchNumberOfSoldProductElement = (this.state.searchNumberOfSoldProductResult) ?<ResponseObject obj={this.state.searchNumberOfSoldProductResult}/> : <>no sold :c</>

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
            case 'number':
                searchResult = searchNumberOfSoldProductElement;
                break;    
            default:
                break;
        }
        
        let addGoodForm = 
        <Form onSubmit={e => this.addGood(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                <Row>
                    <Label htmlFor='id_product' sm={3}>id_product</Label>
                    <Col sm={9}>
                        <Input name='id_product' id='id_product'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='selling_price' sm={3}>selling_price</Label>
                    <Col sm={9}>
                        <Input name='selling_price' id='selling_price'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='products_number' sm={3}>products_number</Label>
                    <Col sm={9}>
                        <Input name='products_number' id='products_number'></Input>
                    </Col>
                </Row>       
                <Row>
                    <Label htmlFor='promotional_product' sm={3}>promotional_product</Label>
                    <Col sm={9}>
                        <Input name='promotional_product' id='promotional_product'></Input>
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
                    <Label htmlFor='UPC' sm={3} style={{'color':'red'}}>UPC</Label>
                    <Col sm={9}>
                        <Input name='UPC' id='UPC'></Input>
                    </Col>
                </Row> 
                <Row>
                    <Label htmlFor='id_product' sm={3}>id_product</Label>
                    <Col sm={9}>
                        <Input name='id_product' id='id_product'></Input>
                    </Col>
                </Row>  
                <Row>
                    <Label htmlFor='selling_price' sm={3}>selling_price</Label>
                    <Col sm={9}>
                        <Input name='selling_price' id='selling_price'></Input>
                    </Col>
                </Row>                
                <Row>
                    <Label htmlFor='products_number' sm={3}>products_number</Label>
                    <Col sm={9}>
                        <Input name='products_number' id='products_number'></Input>
                    </Col>
                </Row>       
                <Row>
                    <Label htmlFor='promotional_product' sm={3}>promotional_product</Label>
                    <Col sm={9}>
                        <Input name='promotional_product' id='promotional_product'></Input>
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
                    <Label htmlFor='UPC' sm={3}>UPC</Label>
                    <Col sm={9}>
                        <Input name='UPC' id='UPC'></Input>
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
                    <Row style={{ "marginBottom": "15px" }}>
                        <Form onSubmit={e => this.getProductByUPC(e)}>
                            <Row className="form-group">
                                <Col xs={2} style={{'textAlign': 'right'}}>
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
                        <Form onSubmit={e => this.getNumberOfSoldProductByDates(e)}>
                            <Row>
                                <Col sm={3}>
                                    <Input name='fromDay' id='fromDay' placeholder='Day'/>
                                    <Input name='fromMonth' id='fromMonth' placeholder='Month'/>
                                    <Input name='fromYear' id='fromYear' placeholder='Year'/>
                                </Col>
                                <Col sm={6} style={{'textAlign': 'center'}}>
                                    <div>
                                        <Input name='searchProductByUPC' id='searchProductByUPC' placeholder='UPC'/>
                                    </div>
                                    <Button size='lg' type='submit' block>Get number of sold good</Button>
                                </Col>
                                <Col sm={3}>
                                    <Input name='toDay' id='toDay' placeholder='Day'/>
                                    <Input name='toMonth' id='toMonth' placeholder='Month'/>
                                    <Input name='toYear' id='toYear' placeholder='Year'/>
                                </Col>                                  
                            </Row>
                        </Form>
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
                            if (this.state.searchProductsResult != null) {
                                printResults(this.state.searchProductsResult)
                            } else {
                                alert("Nothing to print!")
                            }
                        }}>
                                Print results
                        </Button>
                    </Row>
                    <Row id='result1'>
                        {searchResult}
                    </Row>
                    {/* <Row>
                        <Button onClick={this.handleDownloadImage}>Save</Button>
                    </Row> */}
                </Container>
                <Footer/>
            </div>
        )
    }
}
export default connect(mapStateToProps)(ManagerGoodsInStore);