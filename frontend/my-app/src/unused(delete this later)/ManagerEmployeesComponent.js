import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label } from "reactstrap";
import { connect } from 'react-redux';
// import html2canvas from "html2canvas";

import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import ResponseObject from '../components/ResponseObjectComponent';
import { get_objects_sorted_by, get_employee_info, add_object, update_object, delete_object } from '../features/shared/axiosRequests';
import { printResults } from '../features/shared/printUtil';

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

 class ManagerEmployees extends Component {
    constructor(props) {
       super(props);

       this.state = {
            searchAllResult: null,
            searchCashiersResult: null,
            searchBySurnameResult: null,
            searchTypeDisplayed: null,
       }

       this.getEmployees = this.getEmployees.bind(this);
       this.getCashiers = this.getCashiers.bind(this);
       this.getEmployeeBySurname = this.getEmployeeBySurname.bind(this)

       this.addClient = this.addClient.bind(this)
       this.updateClient = this.updateClient.bind(this)
       this.deleteClient = this.deleteClient.bind(this)
       
       this.clearSearchResult = this.clearSearchResult.bind(this)

    //    this.handleDownloadImage = this.handleDownloadImage.bind(this)
    }

    async getEmployees () {
        if (!this.state.searchAllResult) {
            let res = await get_objects_sorted_by(this.props.jwt, 'Employee', 'empl_surname');
            this.setState({ searchAllResult: res })
        }
        this.setState({searchTypeDisplayed: 'all'})
    }

    async getCashiers() {
        if (!this.state.searchCashiersResult) {
            let res = await get_objects_sorted_by(this.props.jwt, 'Employee', 'empl_surname');
            res = res.filter(el => el.empl_role === 'Cashier')
            this.setState({ searchCashiersResult: res })
        }
        this.setState({searchTypeDisplayed: 'cashiers'})
    }

    async getEmployeeBySurname(e) {
        if (!e.target.elements.empl_surname.value) return
        e.preventDefault()
        let res = await get_employee_info(this.props.jwt, e.target.elements.empl_surname.value)
        this.setState({searchTypeDisplayed: 'surname', searchBySurnameResult: res})
    }

    async addClient(e) {
        e.preventDefault()
        let reqObj = {
            'obj_data': {
            },
            'table_name': 'Employee'
        }

        if(e.target.elements.city.value) reqObj.obj_data.city = e.target.elements.city.value; else return
        if(e.target.elements.date_of_birth.value) reqObj.obj_data.date_of_birth = e.target.elements.date_of_birth.value; else return
        if(e.target.elements.date_of_start.value) reqObj.obj_data.date_of_start = e.target.elements.date_of_start.value; else return
        if(e.target.elements.empl_name.value) reqObj.obj_data.empl_name = e.target.elements.empl_name.value; else return
        if(e.target.elements.empl_patronymic.value) reqObj.obj_data.empl_patronymic = e.target.elements.empl_patronymic.value; else return
        if(e.target.elements.empl_surname.value) reqObj.obj_data.empl_surname = e.target.elements.empl_surname.value; else return
        if(e.target.elements.empl_role.value) reqObj.obj_data.empl_role = e.target.elements.empl_role.value; else return
        if(e.target.elements.phone_number.value) reqObj.obj_data.phone_number = e.target.elements.phone_number.value; else return
        if(e.target.elements.street.value) reqObj.obj_data.street = e.target.elements.street.value; else return
        if(e.target.elements.zip_code.value) reqObj.obj_data.zip_code = e.target.elements.zip_code.value; else return
        if(e.target.elements.salary.value) reqObj.obj_data.salary = e.target.elements.salary.value; else return

        let res = await add_object(this.props.jwt, reqObj)

        this.clearSearchResult()
    }

    async updateClient(e) {

        e.preventDefault()
        if (!e.target.elements.id_employee.value) return
        let reqObj = {
            'filter_data': {
                'id_employee': e.target.elements.id_employee.value
            },
            'obj_data': {
            },
            "table_name": "Employee"
        }

        if(e.target.elements.city.value) reqObj.obj_data.city = e.target.elements.city.value;
        if(e.target.elements.date_of_birth.value) reqObj.obj_data.date_of_birth = e.target.elements.date_of_birth.value;
        if(e.target.elements.date_of_start.value) reqObj.obj_data.date_of_start = e.target.elements.date_of_start.value;
        if(e.target.elements.empl_name.value) reqObj.obj_data.empl_name = e.target.elements.empl_name.value;
        if(e.target.elements.empl_patronymic.value) reqObj.obj_data.empl_patronymic = e.target.elements.empl_patronymic.value;
        if(e.target.elements.empl_surname.value) reqObj.obj_data.empl_surname = e.target.elements.empl_surname.value;
        if(e.target.elements.empl_role.value) reqObj.obj_data.empl_role = e.target.elements.empl_role.value;
        if(e.target.elements.phone_number.value) reqObj.obj_data.phone_number = e.target.elements.phone_number.value;
        if(e.target.elements.street.value) reqObj.obj_data.street = e.target.elements.street.value;
        if(e.target.elements.zip_code.value) reqObj.obj_data.zip_code = e.target.elements.zip_code.value;
        if(e.target.elements.salary.value) reqObj.obj_data.salary = e.target.elements.salary.value;

        if (!reqObj.obj_data) return
        let res = await update_object(this.props.jwt, reqObj)
        this.clearSearchResult()
    }

    async deleteClient(e) {
        e.preventDefault()
        if (!e.target.elements.id_employee.value) return
        let res = await delete_object(this.props.jwt, {
            "filter_data": {
              "id_employee": e.target.elements.id_employee.value
            },
            "table_name": "Employee"
        })
        this.clearSearchResult()
    }

    clearSearchResult() {
        this.setState({
            searchAllResult: null,
            searchCashiersResult: null,
            searchBySurnameResult: null,
            searchTypeDisplayed: null,})
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
        let searchAllElement = (this.state.searchAllResult) ?
            <>
                {this.state.searchAllResult.map(el => 
                    <ResponseObject obj={el} title='empl_surname'/>
                )}
            </> : <></>

        let searchCashiersElement = (this.state.searchCashiersResult) ?
            <>
                {this.state.searchCashiersResult.map(el => 
                    <ResponseObject obj={el} title='empl_surname'/>
                )}
            </> : <></>

        let searchBySurnameElement = (this.state.searchBySurnameResult) ?
            <ResponseObject obj={this.state.searchBySurnameResult} title='empl_surname'/> : <></>

        let searchResult;
        switch(this.state.searchTypeDisplayed) {
            case 'all':
                searchResult = searchAllElement;
                break;
            case 'cashiers':
                searchResult = searchCashiersElement;
                break;
            case 'surname':
                searchResult = searchBySurnameElement;
                break;
            default:
                break;    
        }

        
        let updateClientForm = 
        <Form onSubmit={e => this.updateClient(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                <Row>
                    <Label htmlFor='id_employee' sm={3} style={{'color': 'red'}}>id_employee</Label>
                    <Col sm={9}>
                        <Input name='id_employee' id='id_employee'/>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='city' sm={3}>city</Label>
                    <Col sm={9}>
                        <Input name='city' id='city'></Input>
                    </Col>
                </Row>                
                <Row>
                    <Label htmlFor='date_of_birth' sm={3}>date_of_birth</Label>
                    <Col sm={9}>
                        <Input name='date_of_birth' id='date_of_birth'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='date_of_start' sm={3}>date_of_start</Label>
                    <Col sm={9}>
                        <Input name='date_of_start' id='date_of_start'></Input>
                    </Col>
                </Row>                
                <Row>
                    <Label htmlFor='empl_name' sm={3}>empl_name</Label>
                    <Col sm={9}>
                        <Input name='empl_name' id='empl_name'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='empl_surname' sm={3}>empl_surname</Label>
                    <Col sm={9}>
                        <Input name='empl_surname' id='empl_surname'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='empl_patronymic' sm={3}>empl_patronymic</Label>
                    <Col sm={9}>
                        <Input name='empl_patronymic' id='empl_patronymic'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='empl_role' sm={3}>empl_role</Label>
                    <Col sm={9}>
                        <Input name='empl_role' id='empl_role'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='phone_number' sm={3}>phone_number</Label>
                    <Col sm={9}>
                        <Input name='phone_number' id='phone_number'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='salary' sm={3}>salary</Label>
                    <Col sm={9}>
                        <Input name='salary' id='salary'></Input>
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
                    <Label htmlFor='date_of_birth' sm={3}>date_of_birth</Label>
                    <Col sm={9}>
                        <Input name='date_of_birth' id='date_of_birth'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='date_of_start' sm={3}>date_of_start</Label>
                    <Col sm={9}>
                        <Input name='date_of_start' id='date_of_start'></Input>
                    </Col>
                </Row>                
                <Row>
                    <Label htmlFor='empl_name' sm={3}>empl_name</Label>
                    <Col sm={9}>
                        <Input name='empl_name' id='empl_name'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='empl_surname' sm={3}>empl_surname</Label>
                    <Col sm={9}>
                        <Input name='empl_surname' id='empl_surname'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='empl_patronymic' sm={3}>empl_patronymic</Label>
                    <Col sm={9}>
                        <Input name='empl_patronymic' id='empl_patronymic'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='empl_role' sm={3}>empl_role</Label>
                    <Col sm={9}>
                        <Input name='empl_role' id='empl_role'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='phone_number' sm={3}>phone_number</Label>
                    <Col sm={9}>
                        <Input name='phone_number' id='phone_number'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='salary' sm={3}>salary</Label>
                    <Col sm={9}>
                        <Input name='salary' id='salary'></Input>
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
                    <Label htmlFor='id_employee' sm={3}>id_employee</Label>
                    <Col sm={9}>
                        <Input name='id_employee' id='id_employee'></Input>
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
                        <Form onSubmit={e => this.getEmployeeBySurname(e)}>
                            <Row className="form-group">
                                <Col xs={2} style={{'textAlign': 'right'}}>
                                    <Button onClick={this.clearSearchResult} color="warning">Clear</Button></Col>
                                <Col xs={8}>
                                    <div>
                                        <Input name='empl_surname' id='empl_surname' placeholder='surname'/>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <Button type='submit' color='primary'>Search</Button><br/>
                                </Col>
                            </Row>
                        </Form>
                    </Row>

                    <Row style={{ "marginBottom": "15px" }}>
                        <Col sm={3}></Col>
                        <Col sm={6} style={{'textAlign': 'center'}}>
                            <Button size='lg' type='submit' onClick={this.getEmployees} block>Get employees</Button>
                        </Col>
                    </Row>

                    <Row style={{ "marginBottom": "15px" }}>
                        <Col sm={3}></Col>
                        <Col sm={6} style={{'textAlign': 'center'}}>
                            <Button size='lg' type='submit' onClick={this.getCashiers} block>Get cashiers</Button>
                        </Col>
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
                            if (this.state.searchAllResult == null && this.state.searchCashiersResult == null && this.state.searchBySurnameResult == null) {
                                alert("Nothing to print!")
                                return;
                            }
                            if (this.state.searchAllResult != null) {
                                printResults(this.state.searchAllResult)
                                return
                            }
                            if (this.state.searchCashiersResult != null) {
                                printResults(this.state.searchCashiersResult)
                                return
                            }
                            if (this.state.searchBySurnameResult != null) {
                                printResults(this.state.searchBySurnameResult)
                                return
                            }
                        }}>
                                Print results
                        </Button>
                    </Row>
                    <Row>
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
export default connect(mapStateToProps)(ManagerEmployees);