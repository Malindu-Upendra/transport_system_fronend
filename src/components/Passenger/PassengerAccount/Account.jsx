import { Component } from "react";
import { Divider, Typography } from "antd";
import { Button, Card, Col, Row,Form } from "react-bootstrap";
import axios from "axios";
import decode from "jwt-decode";
import Modal from 'react-bootstrap/Modal'

class Account extends Component {

    state = {
        user: "",
        username: '',
        show:false,
        amount:0
    }

    componentDidMount = async () => {
        if (sessionStorage.token) {
            await this.setState({ username: decode(sessionStorage.token).username });
        }

        axios.get(`https://backendtransportsystem.herokuapp.com/passenger/getPassengerDetails/${this.state.username}`).then(async res => {
            if (res.data.success) {
                const u = res.data.data
                await this.setState({ user: u })
            }
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handlePayment = () => {
        this.setState({ show: true })
    }

    onHide = () => {
        this.setState({ show: false })
    }

    handlePath = (num) => {
        if (num === 1) {
            window.location = '/passenger/bookingHistory'
        }else{
            window.location = '/passenger/paymentHistory'
        }
    }

    handleSubmitOfModal = (event) => {
        event.preventDefault()

        const data = {
            id: this.state.user.id,
            amount: this.state.amount
        }

        axios.put('https://backendtransportsystem.herokuapp.com/passenger/updateAmount', data).then(res => {
            if (res.data.success) {
                window.location.reload(false)
            }
        })
    }

    render() {
        return (
            <>
                <div style={{
                    backgroundColor: 'white', marginTop: '2%', marginBottom: '5%'
                }}>
                    <div style={{ marginTop: '3%' }}>

                        <Row>
                            <Col style={{width:'50%'}}>
                                <Typography style={{ fontSize: '20px', marginLeft: '15%', color: ' #0099e6' }} gutterBottom>
                                    My Account
                                </Typography>
                            </Col>

                            <Col style={{width:'50%'}}>
                                <Typography style={{ fontSize: '18px', marginLeft: '10%', color: ' #0099e6' }} gutterBottom>
                                    Available Balance: {this.state.user.credit}
                                </Typography>
                            </Col>
                        </Row>
                    </div>

                    <Card style={{ width: '80%', marginTop: '4%', margin: 'auto', boxShadow: "0 1rem 2rem rgba(0,0,0,0.2)" }}>

                        <Divider orientation="left" plain>

                        </Divider>
                        <Row>
                            <Col>
                                <Typography style={{ fontSize: '18px', marginLeft: '15%', color: ' #003333' }} gutterBottom>
                                    Name:
                                </Typography>
                            </Col>
                            <Col>
                                <Typography style={{ fontSize: '18px', color: '  #0099e6' }} gutterBottom>
                                    {this.state.user.firstname + " " + this.state.user.lastname}
                                </Typography>
                            </Col>
                            <Row>
                                <Col>
                                    <Typography style={{ fontSize: '18px', marginTop: '5%', marginLeft: '15%', color: ' #003333' }} gutterBottom>
                                        Username:
                                    </Typography>
                                </Col>

                                <Col>
                                    <Typography style={{ fontSize: '18px', marginTop: '5%', marginLeft: '3%', color: ' #0099e6' }} gutterBottom>
                                        {this.state.user.id}
                                    </Typography>
                                </Col>
                            </Row>
                        </Row>

                        <Row>
                            <Col>
                                <Typography style={{ fontSize: '18px', marginTop: '5%', marginLeft: '15%', color: ' #003333' }} gutterBottom>
                                    Email:
                                </Typography>
                            </Col>

                            <Col>
                                <Typography style={{ fontSize: '15px', marginTop: '5%', color: '  #0099e6' }} gutterBottom>
                                    {this.state.user.email}
                                </Typography>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Typography style={{ fontSize: '18px', marginTop: '5%', marginLeft: '15%', color: ' #003333' }} gutterBottom>
                                    Phone:
                                </Typography>
                            </Col>

                            <Col>
                                <Typography style={{ fontSize: '18px', marginTop: '5%', color: '  #0099e6' }} gutterBottom>
                                    {this.state.user.phone}
                                </Typography>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Typography style={{ fontSize: '18px', marginTop: '5%', marginLeft: '15%', color: ' #003333' }} gutterBottom>
                                    Last Fare Charge:
                                </Typography>
                            </Col>

                            <Col>
                                <Typography style={{ fontSize: '18px', marginTop: '5%', color: '  #ff3333' }} gutterBottom>
                                    XXXX.00
                                </Typography>
                            </Col>
                        </Row>


                        <div style={{ marginTop: '8%' }}>
                            <Button type="primary" onClick={this.handlePayment} style={{ width: '80%', marginLeft: '10%' }}>
                                ADD Credits
                            </Button>
                        </div>

                        <Button type="primary" onClick={this.handlePath.bind(this, 2)} style={{ width: '80%', marginLeft: '10%', marginTop: '2%', backgroundColor: '#0088cc' }}>
                            View Payment History
                        </Button>

                        <Button type="primary" onClick={this.handlePath.bind(this, 1)} style={{ width: '80%', marginLeft: '10%', marginTop: '2%' }}>
                            View Journey History
                        </Button>

                        <Divider orientation="left" plain>

                        </Divider>
                    </Card>
                    <Modal
                        show={this.state.show}
                        onHide={this.onHide}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{
                                backgroundColor: 'white'
                            }}>
                                <Card style={{ boxShadow: "0 1rem 2rem rgba(0,0,0,0.2)" }}>
                                    <Card.Header className="text-center" as="h5">Payment to Add Credits</Card.Header>
                                    <Card.Body>
                                        <div className='container'>
                                            <Form >
                                                <p></p>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Amount to be Add to Account"
                                                        name="amount"
                                                        value={this.state.amount}
                                                        onChange={this.handleChange}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Card Holder Name  ex: john"
                                                        name="university"
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Card Number  ex: 2222-2222-2222-2222"
                                                        name="university"
                                                    />
                                                </Form.Group>

                                                <Row>
                                                    <Col sm='7'>
                                                        <Form.Control
                                                            placeholder="Expire Date"
                                                            type="date"
                                                            name="firstname"
                                                        />
                                                    </Col>

                                                    <Col sm='5'>
                                                        <Form.Control
                                                            placeholder="CVC  ex: 890"
                                                            type="number"
                                                            name="lastname"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                    </Card.Body>
                                </Card>

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onHide}>Close</Button>
                            <Button onClick={this.handleSubmitOfModal}>Submit</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </>
        )
    }
}

export default Account;
