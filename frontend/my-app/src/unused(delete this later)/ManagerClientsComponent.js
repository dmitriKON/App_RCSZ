import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label } from "reactstrap";
import { connect } from 'react-redux';

import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import ResponseObject from '../components/ResponseObjectComponent';
import { get_objects_sorted_by, get_customer_info, add_object, update_object, delete_object, get_n_of_sold_product } from '../features/shared/axiosRequests';
import {
    printResults
} from '../features/shared/printUtil';

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

 class ManagerClients extends Component {
    constructor(props) {
       super(props);

       this.state = {
            searchResult: null,
       }

       this.getClients = this.getClients.bind(this);

       this.addClient = this.addClient.bind(this)
       this.updateClient = this.updateClient.bind(this)
       this.deleteClient = this.deleteClient.bind(this)

       this.getNumberOfSoldProductByDates = this.getNumberOfSoldProductByDates.bind(this)
       
       this.clearSearchResult = this.clearSearchResult.bind(this)
    }

    async getClients (e) {
        e.preventDefault()
        let res = (e.target.elements.percent.value) ? await get_customer_info(this.props.jwt, e.target.elements.percent.value) : await get_objects_sorted_by(this.props.jwt, 'Customer_Card', 'cust_surname');
        
        this.setState({ searchResult: res })
    }


    async addClient(e) {
        e.preventDefault()
        let reqObj = {
            'obj_data': {
            },
            'table_name': 'Customer_Card'
        }

        if(e.target.elements.city.value) reqObj.obj_data.city = e.target.elements.city.value; else return
        if(e.target.elements.cust_name.value) reqObj.obj_data.cust_name = e.target.elements.cust_name.value; else return
        if(e.target.elements.cust_patronymic.value) reqObj.obj_data.cust_patronymic = e.target.elements.cust_patronymic.value; else return
        if(e.target.elements.cust_surname.value) reqObj.obj_data.cust_surname = e.target.elements.cust_surname.value; else return
        if(e.target.elements.percent.value) reqObj.obj_data.percent = e.target.elements.percent.value; else return
        if(e.target.elements.phone_number.value) reqObj.obj_data.phone_number = e.target.elements.phone_number.value; else return
        if(e.target.elements.street.value) reqObj.obj_data.street = e.target.elements.street.value; else return
        if(e.target.elements.zip_code.value) reqObj.obj_data.zip_code = e.target.elements.zip_code.value; else return

        let res = await add_object(this.props.jwt, reqObj)

        this.clearSearchResult()
    }

    async updateClient(e) {

        e.preventDefault()
        if (!e.target.elements.card_number.value) return
        let reqObj = {
            'filter_data': {
                'card_number': e.target.elements.card_number.value
            },
            'obj_data': {
            },
            "table_name": "Customer_Card"
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
        let res = await update_object(this.props.jwt, reqObj)
        this.clearSearchResult()
    }

    async deleteClient(e) {
        e.preventDefault()
        if (!e.target.elements.card_number.value) return
        let res = await delete_object(this.props.jwt, {
            "filter_data": {
              "card_number": e.target.elements.card_number.value
            },
            "table_name": "Customer_Card"
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
            searchResult: null})
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
        let searchResult = (this.state.searchResult) ?
            <>
                {this.state.searchResult.map(el => 
                    <ResponseObject obj={el} title='cust_surname'/>
                )}              
            </> : <></>
        
        let updateClientForm = 
        <Form onSubmit={e => this.updateClient(e)}>
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

        let addClientForm = 
        <Form onSubmit={e => this.addClient(e)}>
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
        
        let deleteClientForm = 
        <Form onSubmit={e => this.deleteClient(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                <Row>
                    <Label htmlFor='card_number' sm={3}>card_number</Label>
                    <Col sm={9}>
                        <Input name='card_number' id='card_number'></Input>
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
                        <Form onSubmit={e => this.getClients(e)}>
                            <Row>
                                <Col sm={1}></Col>
                                <Col sm={2} >
                                    <Button onClick={this.clearSearchResult} color="warning" block>Clear</Button>
                                </Col> 
                                <Col sm={6} style={{'textAlign': 'center'}}>
                                    <Button size='lg' type='submit' block>Get clients</Button>
                                </Col>
                                <Col sm={2}>
                                    <Input style={{'textAlign': 'center'}} name='percent' id='percent' placeholder='%'/>
                                </Col>                            
                            </Row>
                        </Form> 
                    </Row>

                    <Row>
                        <Col xs={12}>
                            {addClientForm}
                        </Col>
                        <Col xs={12}>
                            {updateClientForm}
                        </Col>
                        <Col xs={12}>
                            {deleteClientForm}
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={() => {
                            if (this.state.searchResult != null) {
                                printResults(this.state.searchResult)
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
                </Container>
                <Footer/>
            </div>
        )
    }
}
export default connect(mapStateToProps)(ManagerClients);