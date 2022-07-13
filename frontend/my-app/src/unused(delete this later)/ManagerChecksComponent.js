import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label } from "reactstrap";
import { connect } from 'react-redux';

import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import ResponseObject from '../components/ResponseObjectComponent';
import { delete_object, get_cashier_checks_info, get_all_checks_info, get_cashier_checks_sum, get_all_checks_sum } from '../features/shared/axiosRequests';
import { printResults } from '../features/shared/printUtil';

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

 class ManagerChecks extends Component {
        constructor(props) {
            super(props);
            
            this.state = {
                searchTypeDisplayed: null,
                cashierDatesResult: null,
                datesResult: null,
                cashierSumResult: null,
                datesSumResult: null,
            }

            this.getChecks_cashierDates = this.getChecks_cashierDates.bind(this);
            this.getChecks_dates = this.getChecks_dates.bind(this);
            this.getSum_cashier = this.getSum_cashier.bind(this);
            this.getSum_dates = this.getSum_dates.bind(this);
            this.deleteCheck = this.deleteCheck.bind(this);

            this.clearSearchResult = this.clearSearchResult.bind(this)
         }
     
         async getChecks_cashierDates (e) {
            e.preventDefault()
            if (!e.target.elements.fromDay.value || !e.target.elements.fromMonth.value || !e.target.elements.fromYear.value
                 || !e.target.elements.toDay.value || !e.target.elements.toMonth.value || !e.target.elements.toYear.value || !e.target.elements.id_employee.value) return
            let res = await get_cashier_checks_info(this.props.jwt, e.target.elements.id_employee.value, 
                `${e.target.elements.fromYear.value}-${e.target.elements.fromMonth.value}-${e.target.elements.fromDay.value}`,
                `${e.target.elements.toYear.value}-${e.target.elements.toMonth.value}-${e.target.elements.toDay.value}`)
            this.setState({ searchTypeDisplayed: 'cashierDates', cashierDatesResult: res})
         }

         async getChecks_dates (e) {
            e.preventDefault()
            if (!e.target.elements.fromDay.value || !e.target.elements.fromMonth.value || !e.target.elements.fromYear.value
                 || !e.target.elements.toDay.value || !e.target.elements.toMonth.value || !e.target.elements.toYear.value) return
            let res = await get_all_checks_info(this.props.jwt,
                `${e.target.elements.fromYear.value}-${e.target.elements.fromMonth.value}-${e.target.elements.fromDay.value}`,
                `${e.target.elements.toYear.value}-${e.target.elements.toMonth.value}-${e.target.elements.toDay.value}`)
            this.setState({ searchTypeDisplayed: 'dates', datesResult: res})
         }

         async getSum_cashier(e) {
            e.preventDefault()
            if (!e.target.elements.fromDay.value || !e.target.elements.fromMonth.value || !e.target.elements.fromYear.value
                 || !e.target.elements.toDay.value || !e.target.elements.toMonth.value || !e.target.elements.toYear.value || !e.target.elements.id_employee.value) return
            let res = await get_cashier_checks_sum(this.props.jwt, e.target.elements.id_employee.value, 
                `${e.target.elements.fromYear.value}-${e.target.elements.fromMonth.value}-${e.target.elements.fromDay.value}`,
                `${e.target.elements.toYear.value}-${e.target.elements.toMonth.value}-${e.target.elements.toDay.value}`)
            this.setState({ searchTypeDisplayed: 'cashierSum', cashierSumResult: res})
         }

         async getSum_dates(e) {
            e.preventDefault()
            if (!e.target.elements.fromDay.value || !e.target.elements.fromMonth.value || !e.target.elements.fromYear.value
                 || !e.target.elements.toDay.value || !e.target.elements.toMonth.value || !e.target.elements.toYear.value) return
            let res = await get_all_checks_sum(this.props.jwt,
                `${e.target.elements.fromYear.value}-${e.target.elements.fromMonth.value}-${e.target.elements.fromDay.value}`,
                `${e.target.elements.toYear.value}-${e.target.elements.toMonth.value}-${e.target.elements.toDay.value}`)
            this.setState({ searchTypeDisplayed: 'datesSum', datesSumResult: res})
         }

         async deleteCheck(e) {
            e.preventDefault()
            if (!e.target.elements.check_number.value) return
            await delete_object(this.props.jwt, {
                "filter_data": {
                  "check_number": e.target.elements.check_number.value
                },
                "table_name": "Cheque"
            })
            this.clearSearchResult()
         }

         clearSearchResult() {
            this.setState({
                searchTypeDisplayed: null,
                cashierDatesResult: null,
                datesResult: null,
                cashierSumResult: null,
                datesSumResult: null,})
        }

         render() {
             let cashierDates_Element = (this.state.cashierDatesResult) ? (
                 <>
                     {this.state.cashierDatesResult.map(el => 
                         <ResponseObject obj={el}/>
                     )}              
                 </>
             ) : <>no checks :c</>

             let dates_Element = (this.state.datesResult) ? (
                 <>
                    {this.state.datesResult.map(el => 
                        <ResponseObject obj={el}/>
                    )}              
                </>
             ) : <>no checks :c</>

             let cashierSum_Element = (this.state.cashierSumResult) ? 
                <ResponseObject obj={this.state.cashierSumResult}/>
                : <>no checks :c</>
     
            let datesSum_Element = (this.state.datesSumResult) ? 
                <ResponseObject obj={this.state.datesSumResult}/>
                : <>no checks :c</>

             let searchResult;
             switch(this.state.searchTypeDisplayed) {
                 case 'cashierDates':
                    searchResult = cashierDates_Element;
                    break;
                 case 'dates':
                     searchResult = dates_Element;
                     break;
                 case 'cashierSum':
                     searchResult = cashierSum_Element;
                     break;
                case 'datesSum':
                    searchResult = datesSum_Element;
                    break;
                 default:
                     break;
             }
             
             return (
                 <div>
                     <Header/>
                     <Container>
                        <Row>
                            <Col sm={4}></Col>
                            <Col sm={4} >
                                <Button onClick={this.clearSearchResult} color="warning" block>Clear</Button>
                            </Col> 
                        </Row>
                        <Row style={{'marginBottom':'25px'}}>
                            <Form onSubmit={e => this.getChecks_cashierDates(e)}>
                                <Row>
                                    <Col sm={3}>
                                        <Input name='fromDay' id='fromDay' placeholder='Day'/>
                                        <Input name='fromMonth' id='fromMonth' placeholder='Month'/>
                                        <Input name='fromYear' id='fromYear' placeholder='Year'/>
                                    </Col>
                                    <Col sm={6} style={{'textAlign': 'center'}}>
                                        <div>
                                            <Input name='id_employee' id='id_employee' placeholder='id_employee'/>
                                        </div>
                                        <Button size='lg' type='submit' color='primary' block>Get checks of employee</Button>
                                    </Col>
                                    <Col sm={3}>
                                        <Input name='toDay' id='toDay' placeholder='Day'/>
                                        <Input name='toMonth' id='toMonth' placeholder='Month'/>
                                        <Input name='toYear' id='toYear' placeholder='Year'/>
                                    </Col>                                  
                                </Row>
                            </Form>
                        </Row>
                        <Row style={{'marginBottom':'25px'}}>
                            <Form onSubmit={e => this.getChecks_dates(e)}>
                                <Row>
                                    <Col sm={3}>
                                        <Input name='fromDay' id='fromDay' placeholder='Day'/>
                                        <Input name='fromMonth' id='fromMonth' placeholder='Month'/>
                                        <Input name='fromYear' id='fromYear' placeholder='Year'/>
                                    </Col>
                                    <Col sm={6} style={{'textAlign': 'center'}}>
                                        <Button size='lg' type='submit' color='warning' block>Get checks by dates</Button>
                                    </Col>
                                    <Col sm={3}>
                                        <Input name='toDay' id='toDay' placeholder='Day'/>
                                        <Input name='toMonth' id='toMonth' placeholder='Month'/>
                                        <Input name='toYear' id='toYear' placeholder='Year'/>
                                    </Col>                                  
                                </Row>
                            </Form>
                        </Row>
                        <Row style={{'marginBottom':'25px'}}>
                            <Form onSubmit={e => this.getSum_cashier(e)}>
                                <Row>
                                    <Col sm={3}>
                                        <Input name='fromDay' id='fromDay' placeholder='Day'/>
                                        <Input name='fromMonth' id='fromMonth' placeholder='Month'/>
                                        <Input name='fromYear' id='fromYear' placeholder='Year'/>
                                    </Col>
                                    <Col sm={6} style={{'textAlign': 'center'}}>
                                        <div>
                                            <Input name='id_employee' id='id_employee' placeholder='id_employee'/>
                                        </div>
                                        <Button size='lg' type='submit' color='primary' block>Get sum of employee's checks</Button>
                                    </Col>
                                    <Col sm={3}>
                                        <Input name='toDay' id='toDay' placeholder='Day'/>
                                        <Input name='toMonth' id='toMonth' placeholder='Month'/>
                                        <Input name='toYear' id='toYear' placeholder='Year'/>
                                    </Col>                                  
                                </Row>
                            </Form>
                        </Row>
                        <Row style={{'marginBottom':'25px'}}>
                            <Form onSubmit={e => this.getSum_dates(e)}>
                                <Row>
                                    <Col sm={3}>
                                        <Input name='fromDay' id='fromDay' placeholder='Day'/>
                                        <Input name='fromMonth' id='fromMonth' placeholder='Month'/>
                                        <Input name='fromYear' id='fromYear' placeholder='Year'/>
                                    </Col>
                                    <Col sm={6} style={{'textAlign': 'center'}}>
                                        <Button size='lg' type='submit' color='warning' block>Get sum of all checks by dates</Button>
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
                            <Form onSubmit={e => this.deleteCheck(e)}>
                                <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                                    <Row>
                                        <Label htmlFor='check_number' sm={3}>check_number</Label>
                                        <Col sm={9}>
                                            <Input name='check_number' id='check_number'></Input>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Button type='submit' color='danger' size="lg">Delete</Button>
                                    </Row>
                                </Container>       
                            </Form>
                        </Row>
                        <Row>
                            <Button onClick={() => {
                                if (this.state.datesResult == null && this.state.cashierDatesResult == null) {
                                    alert("Nothing to print!")
                                    return;
                                }
                                if (this.state.cashierDatesResult != null) {
                                    printResults(this.state.cashierDatesResult)
                                    return
                                }
                                if (this.state.datesResult != null) {
                                    printResults(this.state.datesResult)
                                    return
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
    
export default connect(mapStateToProps)(ManagerChecks);