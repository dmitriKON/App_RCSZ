import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label } from "reactstrap";
import { connect } from 'react-redux';

import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import ResponseObject from '../components/ResponseObjectComponent';
import { get_objects_sorted_by, get_today_checks, get_checks_for_time_period, get_check_info, sell_products } from '../features/shared/axiosRequests';

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

 class CashierChecks extends Component {
        constructor(props) {
            super(props);
            
            this.state = {
                searchTypeDisplayed: null,
                searchChecksTodayResult: null,
                searchChecksByDatesResult: null,
                searchByNumberResult: null,
                availableProducts: [],
                availableUsers: [],
                chosenCustomer: null,
                chosenCustomerPercent: 0,
                currentProductUPC: null,
                currentProductAmount: 0,
                currentProductPrice: 0,
                chosenProducts: {},
                totalPrice: 0
            }

            this.getChecksToday = this.getChecksToday.bind(this);
            this.getCheckByNumber = this.getCheckByNumber.bind(this);
            this.addGoodToCheck = this.addGoodToCheck.bind(this);
            this.clearSearchResult = this.clearSearchResult.bind(this);
            this.changeChosenProductAmount = this.changeChosenProductAmount.bind(this);
            this.removeGoodFromCheck = this.removeGoodFromCheck.bind(this);
            this.onChangeCustomer = this.onChangeCustomer.bind(this);
            this.onChangeUPC = this.onChangeUPC.bind(this);
            this.addCheck = this.addCheck.bind(this);
         }

         async componentDidMount() {
            this.setState({availableProducts : await get_objects_sorted_by(this.props.jwt, "Store_Product", "product_name")});
            this.setState({availableUsers : await get_objects_sorted_by(this.props.jwt, "Customer_Card", "cust_surname")});
         }
     
         async getChecksToday () {
            if (!this.state.searchChecksTodayResult) {
                let res = await get_today_checks(this.props.jwt)
                this.setState({ searchChecksTodayResult: res})
            }
            
            this.setState({ searchTypeDisplayed: 'today' })
         }

         async getChecksByDates(e) {
            e.preventDefault()
            if (!e.target.elements.fromDay.value || !e.target.elements.fromMonth.value || !e.target.elements.fromYear.value
                 || !e.target.elements.toDay.value || !e.target.elements.toMonth.value || !e.target.elements.toYear.value) return

            let res = await get_checks_for_time_period(this.props.jwt, `${e.target.elements.fromYear.value}-${e.target.elements.fromMonth.value}-${e.target.elements.fromDay.value}`,
                `${e.target.elements.toYear.value}-${e.target.elements.toMonth.value}-${e.target.elements.toDay.value}` )
            
             this.setState({ searchTypeDisplayed: 'dates', searchChecksByDatesResult: res })
         }
     
         async getCheckByNumber (e) {
             e.preventDefault()
            
             let res = await get_check_info(this.props.jwt, e.target.elements.searchCheckByNumber.value)
             this.setState({ searchTypeDisplayed: 'number', searchByNumberResult: res })
         }
    
         async addCheck() {
            if (Object.keys(this.state.chosenProducts).length == 0 || this.state.totalPrice == 0 || this.state.chosenCustomer == null) {
                alert("Specify required data to create cheque!")
            }
            let reqObj = {
                'card_number': this.state.chosenCustomer,
                'sold_store_products': this.state.chosenProducts,
                'total_price': this.state.totalPrice * (100 - this.state.chosenCustomerPercent) / 100
            }
            let res = await sell_products(this.props.jwt, reqObj)
            this.clearSearchResult()
         }

        addGoodToCheck(e) {
            e.preventDefault()
            if (this.state.currentProductAmount == 0) {
                alert("Please, buy at least 1 product!")
                return;
            }
            if (this.state.currentProductUPC == null) {
                alert("Please, choose UPC of the product!")
                return;
            }
            let newlyChosenProducts = this.state.chosenProducts
            newlyChosenProducts[this.state.currentProductUPC] = [parseInt(this.state.currentProductAmount), this.state.currentProductPrice]
            this.setState({
                totalPrice : this.state.totalPrice + this.state.currentProductPrice,
                chosenProducts : newlyChosenProducts
            })
            this.setState({
                currentProductPrice : 0,
                currentProductAmount : 0,
                currentProductUPC: null
            })
        }

         removeGoodFromCheck(productUPC) {
            let newlyChosenProducts = this.state.chosenProducts
            this.setState({
                totalPrice : this.state.totalPrice - newlyChosenProducts[productUPC][1]
            })
            delete newlyChosenProducts[productUPC];
            this.setState({
                chosenProducts : newlyChosenProducts
            })
         }

         onChangeCustomer(e) {
            let percent = this.state.availableUsers.filter(object => object.card_number == e.target.value)
                                                      .map(object => object.percent)[0]
            console.log(percent)
            this.setState({
                 chosenCustomer : e.target.value,
                 chosenCustomerPercent : percent
            })
         }
    
         onChangeUPC(e) {
            this.setState({
                currentProductUPC : e.target.value,
                currentProductAmount: 0,
                currentProductPrice: 0,
            })
         }

         changeChosenProductAmount(e) {
            this.setState({
                currentProductAmount : e.target.value,
                currentProductPrice : e.target.value * this.state.availableProducts.filter(object => object.UPC === this.state.currentProductUPC).map(object => object.selling_price)[0]
            })
         }

         clearSearchResult() {
            this.setState({                  
                searchTypeDisplayed: null,
                searchChecksTodayResult: null,
                searchChecksByDatesResult: null,
                searchByNumberResult: null,
                availableProducts: [],
                availableUsers: [],
                chosenCustomer: null,
                chosenCustomerPercent: 0,
                currentProductUPC: null,
                currentProductAmount: 0,
                currentProductPrice: 0,
                chosenProducts: {},
                totalPrice: 0})
         }
     
    
         render() {
             let searchChecksTodayElement = (this.state.searchChecksTodayResult) ? (
                 <>
                     {this.state.searchChecksTodayResult.map(el => 
                         <ResponseObject obj={el} title='check_number'/>
                     )}              
                 </>
             ) : <>no today checks :c</>

             let searchCheckByNumberElement = (this.state.searchByNumberResult) ? (
                 <>
                    {this.state.searchByNumberResult.map(el => 
                        <ResponseObject obj={el} title='check_number'/>
                    )}              
                </>
             ) : <>no number :c</>

             let searchChecksByDatesElement = (this.state.searchChecksByDatesResult) ? (
                <>
                    {this.state.searchChecksByDatesResult.map(el => 
                        <ResponseObject obj={el} title='check_number'/>
                    )}              
                </>
     
            ) : <>no corresponding checks :c</>
     
     
             let searchResult;
             switch(this.state.searchTypeDisplayed) {
                 case 'today':
                    searchResult = searchChecksTodayElement;
                    break;
                 case 'number':
                     searchResult = searchCheckByNumberElement;
                     break;
                 case 'dates':
                     searchResult = searchChecksByDatesElement;
                     break;
                 default:
                     break;
             }

                let addCheckForm = 
                <Form>
                    <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '98%'}}>
                    <Row style={{'textAlign':'center'}}><h4>Add check</h4></Row>
                        <Row>
                            <Label htmlFor='card_number' sm={3}>card_number</Label>
                            <Col sm={9}>
                                <Input type={"select"} value={this.state.chosenCustomer} onChange={this.onChangeCustomer}>
                                    <option value="" hidden></option>
                                    {
                                        this.state.availableUsers.map(
                                            object => <option value={object.card_number}>{object.cust_surname} {object.cust_name} {object.cust_patronymic}</option>
                                        )
                                    }
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Label sm={3}>Total Price: </Label>
                            <Col sm={9}>
                                <p>{this.state.totalPrice}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Label sm={3}>Total Price with Customer Discount: </Label>
                            <Col sm={9}>
                                <p>{this.state.totalPrice * (100 - this.state.chosenCustomerPercent) / 100}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Button onClick={this.addCheck} color='danger' size="lg">Add</Button>
                        </Row>
                    </Container>       
                </Form>
                
                let addGoodToCheckForm = 
                <Form>
                    <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '98%'}}>
                        <Row style={{'textAlign':'center'}}><h5>Add goods to check</h5></Row>
                        <Row>
                            <Label htmlFor='addUPC' sm={3}>UPC</Label>
                            <Input name='addUPC' type={"select"} value={this.state.currentProductUPC} onChange={this.onChangeUPC}>
                                <option value="" hidden></option>
                                {
                                    this.state.availableProducts.map(
                                        object => <option value={object.UPC}>{object.product_name} ({object.UPC}) {object.promotional_product ? "*" : ""}</option>
                                    )
                                }
                            </Input>
                        </Row>
                        <Row>
                            <Label htmlFor='addAmount' sm={3}>Amount</Label>
                            <Col sm={9}>
                                <Input 
                                    name='addAmount'
                                    type={"number"} 
                                    max={this.state.availableProducts
                                                   .filter(object => object.UPC === this.state.currentProductUPC)
                                                   .map(object => object.products_number)[0]
                                    } 
                                    min={0}
                                    value={this.state.currentProductAmount}
                                    onChange={this.changeChosenProductAmount}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Button onClick={this.addGoodToCheck} color='warning' style={{'fontSize': '25px'}}><b>+</b></Button>
                        </Row>
                    </Container>
                </Form>
             
             return (
                 <div>
                     <Header/>
                     <Container>
                         <Row style={{ "marginBottom": "15px" }}>
                             <Form onSubmit={e => this.getCheckByNumber(e)}>
                                 <Row className="form-group">
                                     <Col xs={2} style={{'textAlign': 'right'}}>
                                        <Button onClick={this.clearSearchResult} color="warning">Clear</Button>
                                     </Col>
                                     <Col xs={8}>
                                         <div>
                                             <Input name='searchCheckByNumber' id='searchCheckByNumber' placeholder='Check number'/>
                                         </div>
                                     </Col>
                                     <Col xs={2}>
                                         <Button type='submit' color='primary'>Search</Button>
                                     </Col>
                                 </Row>
                             </Form>
                         </Row>
                         <Row style={{ "marginBottom": "15px" }}>
                            <Form onSubmit={e => this.getChecksByDates(e)}>
                                <Row>
                                    <Col sm={3}>
                                        <Input name='fromDay' id='fromDay' placeholder='Day'/>
                                        <Input name='fromMonth' id='fromMonth' placeholder='Month'/>
                                        <Input name='fromYear' id='fromYear' placeholder='Year'/>
                                    </Col>
                                    <Col sm={6} style={{'textAlign': 'center'}}>
                                        <Button size='lg' type='submit' block>Checks by dates</Button>
                                    </Col>
                                    <Col sm={3}>
                                        <Input name='toDay' id='toDay' placeholder='Day'/>
                                        <Input name='toMonth' id='toMonth' placeholder='Month'/>
                                        <Input name='toYear' id='toYear' placeholder='Year'/>
                                    </Col>                                  
                                </Row>
                            </Form>
                         </Row>
                         <Row style={{ "marginBottom": "15px" }}>
                            <Col sm={3}></Col>
                            <Col sm={6} style={{'textAlign': 'center'}}>
                                <Button size='lg' onClick={this.getChecksToday} block>Today's checks</Button>
                            </Col>
                            <Col sm={3}>
                            </Col>    
                         </Row>
                         <Row>
                            {
                             Object.keys(this.state.chosenProducts).length > 0 ?
                                <>
                                    <Col md={4}>
                                        {addCheckForm}
                                    </Col>
                                    <Col md={4}>
                                        {addGoodToCheckForm}
                                    </Col>
                                    <Col md={4}>
                                        {
                                             Object.keys(this.state.chosenProducts).map(
                                                 key => <div className='responseObject'>
                                                    <p> {this.state.availableProducts
                                                                    .filter(object => object.UPC === key)
                                                                    .map(object => object.product_name)[0]}
                                                        <br />
                                                        {this.state.chosenProducts[key][0]}
                                                        <br />
                                                        {this.state.chosenProducts[key][1]}
                                                    </p>
                                                    <Button onClick={() => {this.removeGoodFromCheck(key)}} color='primary' style={{'fontSize': '25px'}}><b>-</b></Button>
                                                 </div>
                                             )
                                        }
                                    </Col>
                                </>
                                :
                                <>
                                    <Col md={6}>
                                        {addCheckForm}
                                    </Col>
                                    <Col md={6}>
                                        {addGoodToCheckForm}
                                    </Col>
                                </>
                            }
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
    
export default connect(mapStateToProps)(CashierChecks);