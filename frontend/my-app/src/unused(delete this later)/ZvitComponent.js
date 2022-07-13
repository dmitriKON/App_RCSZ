import React, { Component } from 'react';
import { Container, Row, Col, Button, Input } from "reactstrap";
import { connect } from 'react-redux';

import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import ResponseObject from '../components/ResponseObjectComponent';
import { 
    get_all_cashiers_who_sold_each_product_in_the_store, 
    get_objects_sorted_by, 
    get_number_of_sold_products,
    get_number_of_categories_for_a_customer,
    get_products_within_all_checks,
    get_number_of_sold_products_for_customer_and_product,
    get_customers_who_were_serviced_by_all_cashiers
} from '../features/shared/axiosRequests';
import {
    printResults
} from '../features/shared/printUtil';

const mapStateToProps = state => {
    return {
        jwt: state.roleAndJwt.jwt,
    }       
 }

class Zvit extends Component {
    constructor(props) {
       super(props);

       this.state = {
            result: null,
            chosenCategory: null,
            availableCategories: [],
            chosenCustomer: null,
            availableCustomers: [],
       }

       this.zhydok_first_request = this.zhydok_first_request.bind(this)
       this.zhydok_second_request = this.zhydok_second_request.bind(this)
       this.biloverbenko_first_request = this.biloverbenko_first_request.bind(this)
       this.biloverbenko_second_request = this.biloverbenko_second_request.bind(this)
       this.kondratenko_first_request = this.kondratenko_first_request.bind(this)
       this.kondratenko_second_request = this.kondratenko_second_request.bind(this)
       this.onChangeCustomer = this.onChangeCustomer.bind(this)
       this.onChangeCategory = this.onChangeCategory.bind(this)
    }

    async componentDidMount() {
        this.setState({availableCategories : await get_objects_sorted_by(this.props.jwt, "Category", "category_name")});
        this.setState({availableCustomers : await get_objects_sorted_by(this.props.jwt, "Customer_Card", "cust_surname")});
     }
    
    async zhydok_first_request() {
        if (this.state.chosenCategory == null) {
            alert("Choose category first!")
            return
        }
        let res = await get_number_of_sold_products(this.props.jwt, this.state.chosenCategory)
        this.setState({result: res})
    }

    async zhydok_second_request() {
        let res = await get_all_cashiers_who_sold_each_product_in_the_store(this.props.jwt)
        this.setState({result: res})
    }

    async biloverbenko_first_request() {
        if (this.state.chosenCustomer == null) {
            alert("Choose customer first!")
            return
        }
        let res = await get_number_of_categories_for_a_customer(this.props.jwt, this.state.chosenCustomer)
        this.setState({result: res})
    }

    async biloverbenko_second_request() {
        let res = await get_products_within_all_checks(this.props.jwt)
        this.setState({result: res})
    }

    async kondratenko_first_request() {
        if (this.state.chosenCustomer == null) {
            alert("Choose customer first!")
            return
        }
        let res = await get_number_of_sold_products_for_customer_and_product(this.props.jwt, this.state.chosenCustomer)
        this.setState({result: res})
    }

    async kondratenko_second_request() {
        let res = await get_customers_who_were_serviced_by_all_cashiers(this.props.jwt)
        this.setState({result: res})
    }

    onChangeCustomer(e) {
        this.setState({
             chosenCustomer : e.target.value
        })
     }

     onChangeCategory(e) {
        this.setState({
            chosenCategory : e.target.value
       })
     }

    render() {
        let result_element = (this.state.result) ?
        <>
            {
                this.state.result.length > 0 ? 
                    this.state.result.map(el => 
                        <ResponseObject obj={el}/>
                    )
                :
                    "Unfotunately, nothing was found on your query ;c"
            }
        </> : <></>

        return (
            <div>
                <Header/>
                    <Container>
                        <Row style={{'textAlign':'center'}}><p>Form for additional information for queries</p></Row>
                        <Row>
                            <Col sm={6} style={{'textAlign': 'center'}}>
                                <Input type={"select"} value={this.state.chosenCustomer} onChange={this.onChangeCustomer}>
                                    <option value="" hidden></option>
                                    {
                                        this.state.availableCustomers.map(
                                            object => <option value={object.card_number}>{object.cust_surname} {object.cust_name} {object.cust_patronymic}</option>
                                        )
                                    }
                                </Input>
                            </Col>
                            <Col sm={6} style={{'textAlign': 'left'}}>
                                <Input type={"select"} value={this.state.chosenCategory} onChange={this.onChangeCategory}>
                                    <option value="" hidden></option>
                                    {
                                        this.state.availableCategories.map(
                                            object => <option value={object.category_name}>{object.category_name}</option>
                                        )
                                    }
                                </Input>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row style={{'textAlign':'center'}}><p>Zhydok</p></Row>
                        <Row>
                            <Col sm={6} style={{'textAlign': 'center'}}>
                                <Button onClick={this.zhydok_first_request}>
                                    Get number of purchased {this.state.chosenCategory != null ? this.state.chosenCategory : "....."} products for each customer
                                </Button>
                            </Col>
                            <Col sm={6} style={{'textAlign': 'center'}}>
                                <Button onClick={this.zhydok_second_request}>
                                    List of cashiers who sold each product in the store
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{'textAlign':'center'}}><p>Biloverbenko</p></Row>
                        <Row>
                            <Col sm={6} style={{'textAlign': 'center'}}>
                                <Button onClick={this.biloverbenko_first_request}>
                                    Get for a customer {this.state.chosenCustomer != null ? this.state.chosenCustomer : "....."} number of bought store products grouped by category
                                </Button>
                            </Col>
                            <Col sm={6} style={{'textAlign': 'center'}}>
                                <Button onClick={this.biloverbenko_second_request}>
                                    Get all products which appear in every check
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{'textAlign':'center'}}><p>Kondratenko</p></Row>
                        <Row >
                            <Col sm={6} style={{'textAlign': 'center'}}>
                                <Button onClick={this.kondratenko_first_request}>
                                Get for a customer {this.state.chosenCustomer != null ? this.state.chosenCustomer : "....."} number of bought store products grouped by product 
                                </Button>
                            </Col>
                            <Col sm={6} style={{'textAlign': 'center'}}>
                                <Button onClick={this.kondratenko_second_request}>
                                    Get customers who were served by all cashiers
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Button onClick={() => {
                                if (this.state.result != null) {
                                    printResults(this.state.result)
                                } else {
                                    alert("Nothing to print!")
                                }
                            }}>
                                    Print results
                            </Button>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            {result_element}
                        </Row>
                    </Container>
                <Footer/>
            </div>

        )
    }
}

export default connect(mapStateToProps)(Zvit);