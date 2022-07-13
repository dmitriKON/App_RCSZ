import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label } from "reactstrap";
import { connect } from 'react-redux';

import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import ResponseObject from '../components/ResponseObjectComponent';
import { get_objects_sorted_by, get_customer_by_surname, update_customer, add_customer } from '../features/shared/axiosRequests';

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

 class CashierClients extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
             searchTypeDisplayed: null,
             searchClientsResult: null,
             searchBySurnameResult: null,
        }
 
        this.getClients = this.getClients.bind(this);
        this.getClientBySurname = this.getClientBySurname.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.addCustomer = this.addCustomer.bind(this);

        this.clearSearchResult = this.clearSearchResult.bind(this)
     }
 
     async getClients () {
        if (!this.state.searchClientsResult) {
            let res = await get_objects_sorted_by(this.props.jwt, 'Customer_Card', 'cust_surname')
            this.setState({ searchClientsResult: res })
        }
        
        this.setState({ searchTypeDisplayed: 'all' })
     }
 
     async getClientBySurname (e) {
         e.preventDefault()
         let res = await get_customer_by_surname(this.props.jwt, e.target.elements.searchClientBySurname.value)
         this.setState({ searchTypeDisplayed: 'surname', searchBySurnameResult: res })
     }

     async updateCustomer(e) {
        e.preventDefault()
        if (!e.target.elements.card_number.value) return
        let reqObj = {
            'filter_data': {
                'card_number': e.target.elements.card_number.value
            },
            'obj_data': {
            }
        }

        if(e.target.elements.city.value) reqObj.obj_data.city = e.target.elements.city.value
        if(e.target.elements.cust_name.value) reqObj.obj_data.cust_name = e.target.elements.cust_name.value
        if(e.target.elements.cust_patronymic.value) reqObj.obj_data.cust_patronymic = e.target.elements.cust_patronymic.value
        if(e.target.elements.cust_surname.value) reqObj.obj_data.cust_surname = e.target.elements.cust_surname.value
        if(e.target.elements.percent.value) reqObj.obj_data.percent = e.target.elements.percent.value
        if(e.target.elements.phone_number.value) reqObj.obj_data.phone_number = e.target.elements.phone_number.value
        if(e.target.elements.street.value) reqObj.obj_data.street = e.target.elements.street.value
        if(e.target.elements.zip_code.value) reqObj.obj_data.zip_code = e.target.elements.zip_code.value


        if (!reqObj.obj_data) return
        let res = await update_customer(this.props.jwt, reqObj)

        this.clearSearchResult()
     }

     clearSearchResult() {
        this.setState({ searchTypeDisplayed: null, searchClientsResult: null, searchBySurnameResult: null })
     }

     async addCustomer(e) {
        e.preventDefault()
        // if (!e.target.elements.card_number.value) return
        let reqObj = {
            'obj_data': {
            }
        }

        if(e.target.elements.city.value) reqObj.obj_data.city = e.target.elements.city.value; else return
        if(e.target.elements.cust_name.value) reqObj.obj_data.cust_name = e.target.elements.cust_name.value; else return
        if(e.target.elements.cust_patronymic.value) reqObj.obj_data.cust_patronymic = e.target.elements.cust_patronymic.value; else return
        if(e.target.elements.cust_surname.value) reqObj.obj_data.cust_surname = e.target.elements.cust_surname.value; else return
        if(e.target.elements.percent.value) reqObj.obj_data.percent = e.target.elements.percent.value; else return
        if(e.target.elements.phone_number.value) reqObj.obj_data.phone_number = e.target.elements.phone_number.value; else return
        if(e.target.elements.street.value) reqObj.obj_data.street = e.target.elements.street.value; else return
        if(e.target.elements.zip_code.value) reqObj.obj_data.zip_code = e.target.elements.zip_code.value; else return

        let res = await add_customer(this.props.jwt, reqObj)

        this.clearSearchResult()
     }

     clearSearchResult() {
        this.setState({ searchTypeDisplayed: null, searchClientsResult: null, searchBySurnameResult: null })
     }
 

     render() {
         let searchBySurnameElement = (this.state.searchBySurnameResult) ? (
             <ResponseObject obj={this.state.searchBySurnameResult[0]} title='cust_surname'/>  
         ) : <>no name :c</>
 
         let allsearchClientsResultElement = (this.state.searchClientsResult) ? (
             <>
                 {this.state.searchClientsResult.map(el => 
                     <ResponseObject obj={el} title='cust_surname'/>
                 )}              
             </>
  
         ) : <>no all :c</>
 
 
         let searchResult;
         switch(this.state.searchTypeDisplayed) {
             case 'all':
                 searchResult = allsearchClientsResultElement;
                 break;
             case 'surname':
                 searchResult = searchBySurnameElement;
                 break;
             default:
                 break;
         }
         
         let updateCustomerForm = 
            <Form onSubmit={e => this.updateCustomer(e)}>
                <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                    <Row>
                        <Label htmlFor='card_number' sm={3} style={{'color': 'red'}}>card_number</Label>
                        <Col sm={9}>
                            <Input name='card_number' id='card_number'/>
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlFor='city' sm={3}>city</Label>
                        <Col sm={9}>
                            <Input name='city' id='city'></Input>
                        </Col>
                    </Row>                
                    <Row>
                        <Label htmlFor='cust_name' sm={3}>cust_name</Label>
                        <Col sm={9}>
                            <Input name='cust_name' id='cust_name'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlFor='cust_patronymic' sm={3}>cust_patronymic</Label>
                        <Col sm={9}>
                            <Input name='cust_patronymic' id='cust_patronymic'></Input>
                        </Col>
                    </Row>                
                    <Row>
                        <Label htmlFor='cust_surname' sm={3}>cust_surname</Label>
                        <Col sm={9}>
                            <Input name='cust_surname' id='cust_surname'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlFor='percent' sm={3}>percent</Label>
                        <Col sm={9}>
                            <Input name='percent' id='percent'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlFor='phone_number' sm={3}>phone_number</Label>
                        <Col sm={9}>
                            <Input name='phone_number' id='phone_number'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlFor='street' sm={3}>street</Label>
                        <Col sm={9}>
                            <Input name='street' id='street'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlFor='zip_code' sm={3}>zip_code</Label>
                        <Col sm={9}>
                            <Input name='zip_code' id='zip_code'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Button type='submit' color='info' size="lg">Update</Button>
                    </Row>
                </Container>       
            </Form>

            let addCustomerForm = 
            <Form onSubmit={e => this.addCustomer(e)}>
                <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                    <Row>
                        <Label htmlFor='city' sm={3}>city</Label>
                        <Col sm={9}>
                            <Input name='city' id='city'></Input>
                        </Col>
                    </Row>                
                    <Row>
                        <Label htmlFor='cust_name' sm={3}>cust_name</Label>
                        <Col sm={9}>
                            <Input name='cust_name' id='cust_name'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlFor='cust_patronymic' sm={3}>cust_patronymic</Label>
                        <Col sm={9}>
                            <Input name='cust_patronymic' id='cust_patronymic'></Input>
                        </Col>
                    </Row>                
                    <Row>
                        <Label htmlFor='cust_surname' sm={3}>cust_surname</Label>
                        <Col sm={9}>
                            <Input name='cust_surname' id='cust_surname'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlFor='percent' sm={3}>percent</Label>
                        <Col sm={9}>
                            <Input name='percent' id='percent'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlFor='phone_number' sm={3}>phone_number</Label>
                        <Col sm={9}>
                            <Input name='phone_number' id='phone_number'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlFor='street' sm={3}>street</Label>
                        <Col sm={9}>
                            <Input name='street' id='street'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlFor='zip_code' sm={3}>zip_code</Label>
                        <Col sm={9}>
                            <Input name='zip_code' id='zip_code'></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Button type='submit' color='danger' size="lg">Add</Button>
                    </Row>
                </Container>       
            </Form>
 
         return (
             <div>
                 <Header/>
                 <Container>
                     <Row style={{ "marginBottom": "15px" }}>
                         <Form onSubmit={e => this.getClientBySurname(e)}>
                             <Row className="form-group">
                                 <Col xs={2} style={{'textAlign': 'right'}}>
                                    <Button onClick={this.clearSearchResult} color="warning">Clear</Button>
                                 </Col>
                                 <Col xs={8}>
                                     <div>
                                         <Input name='searchClientBySurname' id='searchClientBySurname' placeholder='Surname'/>
                                     </div>
                                 </Col>
                                 <Col xs={2}>
                                     <Button type='submit' color='primary'>Search</Button>
                                 </Col>
                             </Row>
                         </Form>
                     </Row>
                     <Row style={{ "marginBottom": "15px" }}>
                        <Col sm={3}></Col>
                        <Col sm={6} style={{'textAlign': 'center'}}>
                            <Button size='lg' onClick={this.getClients} block>All Clients</Button>
                        </Col>
                        <Col sm={3}>
                        </Col>    
                     </Row>
                     <Row>
                        <Col md={6}>
                            {updateCustomerForm}
                        </Col>
                        <Col md={6}>
                            {addCustomerForm}
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

export default connect(mapStateToProps)(CashierClients);