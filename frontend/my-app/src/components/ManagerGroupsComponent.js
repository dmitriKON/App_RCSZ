import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Label, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ResponseObject from './ResponseObjectComponent';
import { update_group, delete_group, get_all_groups, create_group } from '../features/shared/axiosRequests';
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

            groupList: [],
       }

       this.getCategories = this.getCategories.bind(this);

       this.add_category = this.add_category.bind(this);
       this.update_category = this.update_category.bind(this);
       this.delete_category = this.delete_category.bind(this);

       
       this.clearSearchResult = this.clearSearchResult.bind(this);
    }
    async componentDidMount() {
        this.setState({
            groupList: await get_all_groups(this.props.jwt)
        })
    }

    async getCategories() {
        this.setState({searchResult: await get_all_groups(this.props.jwt)})
    }

    async add_category(e) {
        e.preventDefault()
        
        if (!e.target.elements.name.value || !e.target.elements.about.value) {
            alert('Specify group')
            return
        }
        let reqObj = {
            name: e.target.elements.name.value ,
            about: e.target.elements.about.value 
        }

        await create_group(this.props.jwt, reqObj)

        this.clearSearchResult()
    }

    async update_category(e) {
        e.preventDefault()
        if (!e.target.elements.name_update.value || !e.target.elements.about.value ) {
            alert('Specify group')
            return
        }
        let reqObj = {
            name: e.target.elements.name_update.value,
            about: e.target.elements.about.value 
        }

        await update_group(this.props.jwt, reqObj)

        this.clearSearchResult()
    }

    async delete_category(e) {
        e.preventDefault()
        if (!e.target.elements.name.value) {
            alert('Specify group')
            return
        }

        await delete_group(this.props.jwt, e.target.elements.name.value)

        this.clearSearchResult()
    }

    async clearSearchResult() {
        this.setState({
            searchResult: null,
            groupList: await get_all_groups(this.props.jwt),
        })
    }

    render() {
        let searchResult_element = (this.state.searchResult) ?
            <>
                {this.state.searchResult.map(el => 
                    <ResponseObject obj={el} title='name'/>
                )}              
            </> : <></>
        
        let addCategoryForm = 
        <Form onSubmit={e => this.add_category(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                <Row>
                    <Label htmlFor='name' sm={3}>name</Label>
                    <Col sm={9}>
                        <Input name='name' id='name'></Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='about' sm={3}>about</Label>
                    <Col sm={9}>
                        <Input name='about' id='about'></Input>
                    </Col>
                </Row>
                <Row>
                    <Button type='submit' color='success' size="lg">Add</Button>
                </Row>
            </Container>       
        </Form>
        
        let updateCategoryForm = 
        <Form onSubmit={e => this.update_category(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}>
                <Row>
                    <Label htmlFor='name_update' sm={3}>name</Label>
                    <Col sm={9}>
                        <Input type="select" name='name_update' id='name_update'>
                            {
                                this.state.groupList.map(
                                    obj => <option value={obj.name}>{obj.name}</option>
                                )
                            }
                        </Input>
                    </Col>
                </Row>
                <Row>
                    <Label htmlFor='about' sm={3}>about</Label>
                    <Col sm={9}>
                        <Input name='about' id='about'></Input>
                    </Col>
                </Row>
                <Row>
                    <Button type='submit' color='info' size="lg">Update</Button>
                </Row>
            </Container>       
        </Form>
        
        let deleteCategoryForm = 
        <Form onSubmit={e => this.delete_category(e)}>
            <Container style={{'border': '1px solid black', 'padding': '20px', 'marginTop': '1vh', 'borderRadius': '5px', 'width': '99%'}}> 
                <Row>
                    <Label htmlFor='name' sm={3}>name</Label>
                    <Col sm={9}>                        
                        <Input type="select" name='name' id='name'>
                            {
                                this.state.groupList.map(
                                    obj => <option value={obj.name}>{obj.name}</option>
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
                            <BreadcrumbItem active>Groups</BreadcrumbItem>
                        </Breadcrumb>
                    </Row>
                    <Row style={{ "marginBottom": "15px" }}>
                        <Col sm={1}></Col>
                        <Col sm={2} >
                            <Button onClick={this.clearSearchResult} color="warning">Clear</Button>
                        </Col> 
                        <Col sm={6} style={{'textAlign': 'center'}} onClick={this.getCategories}>
                            <Button size='lg' type='submit' block>Get categories</Button>
                        </Col>
                        <Col sm={2}>
                        </Col>
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
                        {searchResult_element}
                    </Row>
                </Container>
                <Footer/>
            </div>
        )
    }
}
export default connect(mapStateToProps)(ManagerGroups);