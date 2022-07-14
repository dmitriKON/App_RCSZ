import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { NavLink } from 'react-router-dom';
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

            goodByGroupList: [],

            goodByName_result: null,
            goodsByGroup_result: null,

            totalSum_result: null,
       }

       this.addGood = this.addGood.bind(this)
       this.updateGood = this.updateGood.bind(this)
       this.deleteGood = this.deleteGood.bind(this)
       this.getGoodByName = this.getGoodByName.bind(this)
       this.getGoodByGroup = this.getGoodByGroup.bind(this)

       this.getGroupsTotalSum = this.getGroupsTotalSum.bind(this)

       this.buySaleGood = this.buySaleGood.bind(this)

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

        this.setState({goodByName_result: res, searchTypeDisplayed: 'name'})
    }

    async getGoodByGroup(e) {
        e.preventDefault()

        if (e.target.elements.select_group.value === 'all') {
            this.setState({ goodList: await get_all_products(this.props.jwt), searchTypeDisplayed: 'all' })
        } else {
            let res = [...this.state.goodList].filter(good => good.group_name === e.target.elements.select_group.value)
            this.setState({ goodByGroupList: res, searchTypeDisplayed: 'group' })
        }
    }

    getGroupsTotalSum(e) {
        e.preventDefault()
        let goods = (e.target.elements.select_group_sum.value === 'all') ? 
            [...this.state.goodList] : [...this.state.goodList].filter(good => good.group_name === e.target.elements.select_group_sum.value)
        let value = 0
        for (let good of goods) {
            value += good.amount * good.price
        }
        this.setState({ totalSum_result: { name: e.target.elements.select_group_sum.value, sum: value}, searchTypeDisplayed: 'sum' })
    }

    async addGood(e) {
        e.preventDefault()
        if (!e.target.elements.name.value) {
            alert('Specify good')
            return
        }
        let reqObj = {
        }

        if(e.target.elements.name.value) reqObj.name = e.target.elements.name.value; else { alert('Specify good'); return }
        if(e.target.elements.amount.value) reqObj.amount = parseInt(e.target.elements.amount.value); else { alert('Specify good'); return }
        if(e.target.elements.about.value) reqObj.about = e.target.elements.about.value; else { alert('Specify good'); return }
        if(e.target.elements.producer.value) reqObj.producer = e.target.elements.producer.value; else { alert('Specify good'); return }
        if(e.target.elements.price.value) reqObj.price = parseFloat(e.target.elements.price.value); else { alert('Specify good'); return }
        if(e.target.elements.groupName.value) reqObj.group_name = e.target.elements.groupName.value; else { alert('Specify good'); return }

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
        this.clearSearchResult()
    }

    async buySaleGood(e, name) {
        e.preventDefault()
        let value = parseInt(e.target.elements.buySaleAmount.value);
        if (value === 0) return;

        let good = Object.assign(this.state.goodList.filter(el => el.goods_name === name)[0])
        console.log('good', good)
        if (!good) throw new Error('No such good to buy/sale')

        Object.defineProperty(good, 'name',
            Object.getOwnPropertyDescriptor(good, 'goods_name'));
        delete good.goods_name;
        good.amount = parseInt(good.amount)

        if (value < 0) {
            if (good.amount + value < 0) {
                alert('There is no such amount of items of this product.')
                return
            } else if (good.amount + value > 0){
                good.amount += value
                console.log('reqObj', good)
                await update_product(this.props.jwt, {'name': good.name, 'amount': good.amount})
            } else {
                console.log('NAME', good.name)
                await delete_product(this.props.jwt, good['name'])
            }
        } else {
            good.amount += value
            console.log('reqObj+', good)
            await update_product(this.props.jwt, {'name': good.name, 'amount': good.amount})
        }

        this.clearSearchResult()
    }

    async clearSearchResult() {
         this.setState({ 
            searchTypeDisplayed: null,

            goodList: await get_all_products(this.props.jwt),
            groupList: await get_all_groups(this.props.jwt),

            goodByGroupList: [],

            goodByName_result: null,
            goodsByGroup_result: null,

            totalSum_result: null,
        })
    }


    render() {
        let allProductsListElement = (this.state.goodList) ? (
            <>
                {this.state.goodList.map(el =>
                <Row style={{'border':'1px solid black'}}>
                    <ResponseObject obj={el} title='goods_name' sm={9} border='0px'/>
                    <Col sm={2} style={{"textAlign":"center"}}>
                        <Form onSubmit={(e, name) => this.buySaleGood(e, el.goods_name)}>
                            <br/><br/><br/><br/>
                            <h2>+ buy/sale -</h2>
                            <Input type='number' name='buySaleAmount' id='buySaleAmount'/>
                            <Button type='submit' style={{'marginTop':'1vh'}}>Save</Button>
                        </Form>                        
                    </Col>
                </Row>
                )}              
            </>
 
        ) : <>no all :c</>

        let searchByGroupElement = (this.state.goodByGroupList) ? (
            <>
                {this.state.goodByGroupList.map(el => 
                    <Row style={{'border':'1px solid black'}}>
                        <ResponseObject obj={el} title='goods_name' sm={9} border='0px'/>
                        <Col sm={2} style={{"textAlign":"center"}}>
                            <Form onSubmit={(e, name) => this.buySaleGood(e, el.goods_name)}>
                                <br/><br/><br/><br/>
                                <h2>+ buy/sale -</h2>
                                <Input type='number' name='buySaleAmount' id='buySaleAmount'/>
                                <Button type='submit' style={{'marginTop':'1vh'}}>Save</Button>
                            </Form>                        
                        </Col>
                    </Row>
                )}              
            </>
 
        ) : <>no group :c</>

        let byNameElemement = (this.state.goodByName_result) ? 
            <ResponseObject obj={this.state.goodByName_result} title='goods_name'/>
            : <>no name :c</>


        let sumElement = (this.state.totalSum_result) ?
            <>
                <ResponseObject obj={this.state.totalSum_result} title='name'/>
            </> : <></>


        let searchResult;
        switch(this.state.searchTypeDisplayed) {
            case 'all':
                searchResult = allProductsListElement;
                break;
            case 'name':
                searchResult = byNameElemement;
                break;    
            case 'group':
                searchResult = searchByGroupElement;
                break;
            case 'sum':
                searchResult = sumElement;
                break;
            default:
                break;
        }

        let searchByGroup_list = (this.state.groupList) ? 
        <>
            <option value={"all"}>All</option>
            {this.state.groupList.map(group => 
                <option value={`${group.name}`}>{group.name}</option>
            )}
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
                            {   (this.state.groupList) ?
                                this.state.groupList.map(
                                    obj => <option value={obj.name}>{obj.name}</option>
                                ) : <></>
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
                                <>
                                    <option disabled selected value={''}>select an option</option>
                                    { 
                                    (this.state.groupList) ?
                                    this.state.groupList.map(
                                        obj => <option value={obj.name}>{obj.name}</option>
                                    ) : <></>
                                }
                                </>
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
                    <Row>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <NavLink to='/home'>Home</NavLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>Goods</BreadcrumbItem>
                        </Breadcrumb>
                    </Row>
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
                        <Form onSubmit={e => this.getGroupsTotalSum(e)}>
                            <Row>
                                <Col sm={3}></Col> 
                                <Col sm={6} style={{'textAlign': 'center'}}>
                                    <Button size='lg' type='submit' block>Get total sum</Button>
                                </Col>
                                <Col sm={2}>
                                    <Input type="select" name='select_group_sum' id='select_group_sum'>
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
                        {searchResult}
                    </Row>
                </Container>
                <Footer/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ManagerGoods);