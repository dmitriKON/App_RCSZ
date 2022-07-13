import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label } from "reactstrap";
import { connect } from 'react-redux';
// import html2canvas from "html2canvas";

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ResponseObject from './ResponseObjectComponent';
import { get_objects_sorted_by, add_object, update_object, delete_object, get_n_of_sold_product } from '../features/shared/axiosRequests';
import { printResults } from '../features/shared/printUtil';

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    }       
 }

 class ManagerGroups extends Component {
    constructor(props) {
       super(props);

       this.state = {
            searchResult: null,
       }

       this.getCategories = this.getCategories.bind(this);

       this.addCategory = this.addCategory.bind(this)
       this.updateCategory = this.updateCategory.bind(this)
       this.deleteCategory = this.deleteCategory.bind(this)

       this.getNumberOfSoldProductByDates = this.getNumberOfSoldProductByDates.bind(this)
       
       this.clearSearchResult = this.clearSearchResult.bind(this)

    //    this.handleDownloadImage = this.handleDownloadImage.bind(this)
    }

    async getCategories (e) {
        e.preventDefault()
        let res = await get_objects_sorted_by(this.props.jwt, 'Category', 'category_name')
        
        this.setState({ searchResult: res })
    }


    async addCategory(e) {
        e.preventDefault()
        if (!e.target.elements.category_name.value) return
        let res = await add_object(this.props.jwt, {
            "obj_data": {
                "category_name": e.target.elements.category_name.value,
              },
              "table_name": "Category"
        })
        this.clearSearchResult()
    }

    async updateCategory(e) {
        e.preventDefault()
        if (!e.target.elements.category_number.value || !e.target.elements.category_name.value) return
        let reqObj = {
            "filter_data": {
                "category_number": e.target.elements.category_number.value,
              },
            "obj_data": {
                "category_name": e.target.elements.category_name.value
              },
              "table_name": "Category"
        }

        let res = await update_object(this.props.jwt, reqObj)
        this.clearSearchResult()
    }

    async deleteCategory(e) {
        e.preventDefault()
        if (!e.target.elements.category_number.value) return
        let res = await delete_object(this.props.jwt, {
            "filter_data": {
              "category_number": e.target.elements.category_number.value
            },
            "table_name": "Category"
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
                    <ResponseObject obj={el} title='category_name'/>
                )}              
            </> : <></>
        
        let addCategoryForm = 
        <Form onSubmit={e => this.addCategory(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                <Row>
                    <Label htmlFor='category_name' sm={3}>category_name</Label>
                    <Col sm={9}>
                        <Input name='category_name' id='category_name'></Input>
                    </Col>
                </Row>
                <Row>
                    <Button type='submit' color='success' size="lg">Add</Button>
                </Row>
            </Container>       
        </Form>
        
        let updateCategoryForm = 
        <Form onSubmit={e => this.updateCategory(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}>
                <Row>
                    <Label htmlFor='category_number' sm={3}>category_number</Label>
                    <Col sm={9}>
                        <Input name='category_number' id='category_number'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='category_name' sm={3}>category_name</Label>
                    <Col sm={9}>
                        <Input name='category_name' id='category_name'></Input>
                    </Col>
                </Row>
                <Row>
                    <Button type='submit' color='info' size="lg">Update</Button>
                </Row>
            </Container>       
        </Form>
        
        let deleteCategoryForm = 
        <Form onSubmit={e => this.deleteCategory(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                <Row>
                    <Label htmlFor='category_number' sm={3}>category_number</Label>
                    <Col sm={9}>
                        <Input name='category_number' id='category_number'></Input>
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
                        <Form onSubmit={e => this.getCategories(e)}>
                            <Row>
                                <Col sm={1}></Col>
                                <Col sm={2} >
                                    <Button onClick={this.clearSearchResult} color="warning">Clear</Button>
                                </Col> 
                                <Col sm={6} style={{'textAlign': 'center'}}>
                                    <Button size='lg' type='submit' block>Get categories</Button>
                                </Col>
                                <Col sm={2}>
                                </Col>                            
                            </Row>
                        </Form> 
                    </Row>

                    <Row>
                        <Col xs={12}>
                            {addCategoryForm}
                        </Col>
                        <Col xs={12}>
                            {updateCategoryForm}
                        </Col>
                        <Col xs={12}>
                            {deleteCategoryForm}
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
                    {/* <Row>
                        <Button onClick={this.handleDownloadImage}>Save</Button>
                    </Row> */}
                </Container>
                <Footer/>
            </div>
        )
    }
}
export default connect(mapStateToProps)(ManagerGroups);