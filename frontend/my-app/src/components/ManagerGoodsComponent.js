import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label } from "reactstrap";
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ResponseObject from './ResponseObjectComponent';
import { get_product_by_name, update_product, get_all_groups, get_all_products, delete_product, create_product } from '../features/shared/axiosRequests';
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

            goodList: [],
            groupList: [],

            goodsByGroup_result: null,
       }

       this.getGoodByName = this.getGoodByName.bind(this)
       this.getGoodByGroup = this.getGoodByGroup.bind(this)

       this.clearSearchResult = this.clearSearchResult.bind(this)
    }

    async componentDidMount() {
        this.setState({
            goodList: await get_all_products(this.props.jwt),
            groupList: await get_all_groups(this.props.jwt)
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
        if (!e.target.elements.name.value) {
            alert('Specify good')
            return
        }
        let reqObj = {
        }

        if(e.target.elements.name.value) reqObj.name = e.target.elements.name.value;
        if(e.target.elements.amount.value) reqObj.amount = parseInt(e.target.elements.amount.value);
        if(e.target.elements.about.value) reqObj.about = e.target.elements.about.value;
        if(e.target.elements.producer.value) reqObj.producer = e.target.elements.producer.value;
        if(e.target.elements.price.value) reqObj.price = parseFloat(e.target.elements.price.value);
        if(e.target.elements.groupName.value) reqObj.group_name = e.target.elements.groupName.value;

        await create_product(this.props.jwt, reqObj)

        this.clearSearchResult()
    }

    async updateGood(e) {
        e.preventDefault()
        if (!e.target.elements.name.value) {
            alert('Specify good')
            return
        }
        let reqObj = {
        }

        if(e.target.elements.name.value) reqObj.name = e.target.elements.name.value;
        if(e.target.elements.amount.value) reqObj.amount = parseInt(e.target.elements.amount.value);
        if(e.target.elements.about.value) reqObj.about = e.target.elements.about.value;
        if(e.target.elements.producer.value) reqObj.producer = e.target.elements.producer.value;
        if(e.target.elements.price.value) reqObj.price = parseFloat(e.target.elements.price.value);
        if(e.target.elements.groupName.value) reqObj.group_name = e.target.elements.groupName.value;

        await update_product(this.props.jwt, reqObj)
        this.clearSearchResult()
    }

    async deleteGood(e) {
        e.preventDefault()
        if (!e.target.elements.name.value) {
            alert('Specify good')
            return
        }
        
        await delete_product(this.props.jwt,  e.target.elements.name.value)
        // await delete_object(this.props.jwt, {
        //     "filter_data": {
        //       "id_product": e.target.elements.id_product.value
        //     },
        //     "table_name": "Product"
        // })
        this.clearSearchResult()
    }

    clearSearchResult() {
         this.setState({ 
            searchTypeDisplayed: null,

            // goodList: [],
            // groupList: [],

            goodsByGroup_result: null, })
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
                    <Label htmlFor='amount' sm={3}>amount</Label>
                    <Col sm={9}>
                        <Input name='amount' id='amount'></Input>
                    </Col>
                </Row> 
                <Row>
                    <Label htmlFor='about' sm={3}>description</Label>
                    <Col sm={9}>
                        <Input name='about' id='about'></Input>
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
                    <Label htmlFor='groupName' sm={3}>group name</Label>
                    <Col sm={9}>
                        <Input type="select" name='groupName' id='groupName'>
                            {
                                this.state.groupList.map(
                                    obj => <option value={obj.name}>{obj.name}</option>
                                )
                            }
                        </Input>
                    </Col>
                </Row>
                <Row>
                    <Button type='submit' color='success' size="lg">ADD</Button>
                </Row>
            </Container>       
        </Form>
        
        let updateGoodForm = 
        <Form onSubmit={e => this.updateGood(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
            <Row>
                    <Label htmlFor='name' sm={3} style={{'color': 'red'}}>name</Label>
                    <Col sm={9}>
                        <Input name='name' id='name'></Input>
                    </Col>
                </Row> 
                <Row>
                    <Label htmlFor='amount' sm={3}>amount</Label>
                    <Col sm={9}>
                        <Input name='amount' id='amount'></Input>
                    </Col>
                </Row> 
                <Row>
                    <Label htmlFor='about' sm={3}>description</Label>
                    <Col sm={9}>
                        <Input name='about' id='about'></Input>
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
                    <Label htmlFor='groupName' sm={3}>group name</Label>
                    <Col sm={9}>
                        <Input type="select" name='groupName' id='groupName'>
                            {
                                this.state.groupList.map(
                                    obj => <option value={obj.name}>{obj.name}</option>
                                )
                            }
                        </Input>
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
                        <Input type="select" name='name' id='name'>
                            {
                                this.state.goodList.map(
                                    obj => <option value={obj.goods_name}>{obj.goods_name}</option>
                                )
                            }
                        </Input>
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