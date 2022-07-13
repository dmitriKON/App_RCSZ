import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label } from "reactstrap";
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ResponseObject from './ResponseObjectComponent';
import { get_product_by_name } from '../features/shared/axiosRequests';
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

            goodList: null,
            groupList: null,

            goodsByGroup_result: null,
       }

       this.getGoodByName = this.getGoodByName.bind(this)
       this.getGoodByGroup = this.getGoodByGroup.bind(this)

       this.clearSearchResult = this.clearSearchResult.bind(this)
    }

    componentDidMount() {
        this.setState({
            // goodsList: await //get all goods
            // groupList: await //get all groups
        })
    }

    async getGoodByName(e) {
        e.preventDefault()
        if (!e.target.elements.name.value) {
            alert('Enter name')
            return
        }
        
        let res = await get_product_by_name(this.props.jwt, e.target.elements.name.value)

        this.setState({searchTypeDisplayed: 'name'})
    }

    async getGoodByGroup(e) {
        e.preventDefault()

        if (e.target.elements.select_group.value === 'all') {
            // this.setState({ goodList: await ..., searchTypeDisplayed: 'all' })
        } else {
            // payload with group name equal to e.target.elements.select_group.value
            // this setState({ goodsByGroup_result: await ..., searchTypeDisplayed: 'group' })
        }
    }

    async addGood(e) {
        e.preventDefault()
        // if (!e.target.elements.category_number.value || !e.target.elements.characteristics_name.value || !e.target.elements.product_name.value) return
        // await add_object(this.props.jwt, {
        //     "obj_data": {
        //         "category_number": e.target.elements.category_number.value,
        //         "characteristics_name": e.target.elements.characteristics_name.value,
        //         "product_name": e.target.elements.product_name.value
        //       },
        //       "table_name": "Product"
        // })
        this.clearSearchResult()
    }

    async updateGood(e) {
        e.preventDefault()
        // if (!e.target.elements.id_product.value) return
        // let reqObj = {
        //     "filter_data": {
        //         "id_product": e.target.elements.id_product.value,
        //       },
        //     "obj_data": {
        //       },
        //       "table_name": "Product"
        // }

        // if(e.target.elements.category_number.value) reqObj.obj_data.category_number = e.target.elements.category_number.value;
        // if(e.target.elements.characteristics_name.value) reqObj.obj_data.characteristics_name = e.target.elements.characteristics_name.value;
        // if(e.target.elements.product_name.value) reqObj.obj_data.product_name = e.target.elements.product_name.value;

        // await update_object(this.props.jwt, reqObj)
        this.clearSearchResult()
    }

    async deleteGood(e) {
        e.preventDefault()
        // if (!e.target.elements.id_product.value) return
        // await delete_object(this.props.jwt, {
        //     "filter_data": {
        //       "id_product": e.target.elements.id_product.value
        //     },
        //     "table_name": "Product"
        // })
        this.clearSearchResult()
    }

    clearSearchResult() {
        for (let key of this.state) this.setState({ key: null })
        // this.setState({ searchTypeDisplayed: null, productsList: null, searchByCategoryNumberResult: null })
    }


    render() {
        // let allProductsListElement = (this.state.productsList) ? (
        //     <>
        //         {this.state.productsList.map(el => 
        //             <ResponseObject obj={el} title='product_name'/>
        //         )}              
        //     </>
 
        // ) : <>no all :c</>


        // let searchResult;
        // switch(this.state.searchTypeDisplayed) {
        //     case 'all':
        //         searchResult = allProductsListElement;
        //         break;
        //     case 'category':
        //         searchResult = searchByCategoryElement;
        //         break;
        //     default:
        //         break;
        // }

        let searchByGroup_list = (this.state.groupList) ? 
        <>
            <option value={"all"}>All</option>
            {this.state.groupList.map(group => {
                <option value={`${group.name}`}>{group.name}</option>
            })}
        </> : <option value={"all"}>All</option>

        let addGoodForm = 
        <Form onSubmit={e => this.addGood(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                <Row>
                    <Label htmlFor='name' sm={3}>name</Label>
                    <Col sm={9}>
                        <Input name='name' id='name'></Input>
                    </Col>
                </Row> 
                <Row>
                    <Label htmlFor='description' sm={3}>description</Label>
                    <Col sm={9}>
                        <Input name='description' id='description'></Input>
                    </Col>
                </Row> 
               
                <Row>
                    <Label htmlFor='producer' sm={3}>producer</Label>
                    <Col sm={9}>
                        <Input name='producer' id='producer'></Input>
                    </Col>
                </Row>       
                <Row>
                    <Label htmlFor='price' sm={3}>price</Label>
                    <Col sm={9}>
                        <Input name='price' id='price'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='group' sm={3}>group name</Label>
                    <Col sm={9}>
                        <Input name='group' id='group'></Input>
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
                    <Label htmlFor='name' sm={3}>name</Label>
                    <Col sm={9}>
                        <Input name='name' id='name'></Input>
                    </Col>
                </Row> 
                <Row>
                    <Label htmlFor='description' sm={3}>description</Label>
                    <Col sm={9}>
                        <Input name='description' id='description'></Input>
                    </Col>
                </Row> 
               
                <Row>
                    <Label htmlFor='producer' sm={3}>producer</Label>
                    <Col sm={9}>
                        <Input name='producer' id='producer'></Input>
                    </Col>
                </Row>       
                <Row>
                    <Label htmlFor='price' sm={3}>price</Label>
                    <Col sm={9}>
                        <Input name='price' id='price'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='group' sm={3}>group name</Label>
                    <Col sm={9}>
                        <Input name='group' id='group'></Input>
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
                    <Label htmlFor='name' sm={3}>good's name</Label>
                    <Col sm={9}>
                        <Input name='name' id='name'></Input>
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
                        <Form onSubmit={e => this.getGoodByName(e)}>
                            <Row className="form-group">
                                <Col xs={2}  style={{'textAlign': 'right'}}>
                                    <Button onClick={this.clearSearchResult} color="warning">Clear</Button>
                                </Col>
                                <Col xs={8}>
                                    <div>
                                        <Input name='name' id='name' placeholder='name'/>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <Button type='submit' color='primary'>Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                    <Row>
                        <Form onSubmit={e => this.getGoodByGroup(e)}>
                            <Row>
                                <Col sm={3}></Col> 
                                <Col sm={6} style={{'textAlign': 'center'}}>
                                    <Button size='lg' type='submit' block>Get goods</Button>
                                </Col>
                                <Col sm={2}>
                                    <Input type="select" name='select_group' id='select_group'>
                                        {searchByGroup_list}
                                    </Input>
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
                        {/* {searchResult} */}
                    </Row>
                </Container>
                <Footer/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ManagerGoods);