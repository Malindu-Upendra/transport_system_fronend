import { Component } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import axios from 'axios'
import decode from "jwt-decode";
import QRcode from 'qrcode.react';
import Modal from 'react-bootstrap/Modal'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

class BookingPage extends Component {

    state = {
        routeData: '',
        userID: '',
        name: '',
        user: '',
        decision: false,
        booking: false,
        show: false,
        amount: 0,
        open: false
    }

    componentDidMount = async () => {
        const id = this.props.match.params.id

        await axios.get(`https://backendtransportsystem.herokuapp.com/passenger/getRouteDetails/${id}`).then(res => {
            if (res.data.success) {
                this.setState({ routeData: res.data.data })
            } else {
                alert('data Did not Received')
            }
        })

        if (sessionStorage.token) {
            await this.setState({ userID: decode(sessionStorage.token).username });
        }

        await axios.get(`https://backendtransportsystem.herokuapp.com/passenger/getPassengerDetails/${this.state.userID}`).then(res => {
            if (res.data.success) {
                this.setState({ user: res.data.data })
            } else {
                alert('data Did not Received')
            }
        })

        if (parseInt(this.state.routeData.fare) > parseInt(this.state.user.credit)) {
            this.setState({ decision: true })
        } else {
            this.setState({ decision: false })
        }
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleBooking = async (event) => {
        event.preventDefault()

        const date = new Date();

        const booking = {
            user: this.state.userID,
            name: this.state.user.firstname + ' ' + this.state.user.lastname,
            image: this.state.routeData.img,
            source: this.state.routeData.source,
            destination: this.state.routeData.destination,
            fare: this.state.routeData.fare,
            date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
            time: date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
        }

        await axios.post('https://backendtransportsystem.herokuapp.com/passenger/insertBookingDetails', booking).then(async res => {
            if (res.data.success) {
                await axios.put('https://backendtransportsystem.herokuapp.com/passenger/deductAmount', booking).then(async res => {
                    if (res.data.success) {
                        this.setState({ open: true })
                        this.setState({ booking: true })
                    }
                })
            }
        })
    }

    onHide = () => {
        this.setState({ show: false })
    }

    handleSubmitOfModal = (event) => {
        event.preventDefault()

        const data = {
            id: this.state.userID,
            amount: this.state.amount
        }

        axios.put('https://backendtransportsystem.herokuapp.com/passenger/updateAmount', data).then(res => {
            if (res.data.success) {
                window.location.reload(false)
            }
        })
    }

    handleAddCredit = () => {
        this.setState({ show: true })
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                {this.state.booking ?
                    <div>
                        <h3 style={{ textAlign: 'center' }}>Happy Travelling !</h3>
                        <div style={{ margin: 'auto', padding: '20px', borderRadius: '3px', border: '2px solid black', width: '80%' }}>
                            <QRcode
                                style={{ marginLeft: '20%', width: '60%', height: 'auto' }}
                                id="myqr"
                                value={this.state.userID}
                                includeMargin={true}
                            />
                        </div>
                    </div>
                    :
                    <div>
                        <Form style={{ width: '80%', marginLeft: '15%' }}>
                            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Trip Details</h2>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="1">
                                    Source
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" value={this.state.routeData.source} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="1">
                                    Destination
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" value={this.state.routeData.destination} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="1">
                                    Kilometres
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" value={this.state.routeData.kilometers} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="1">
                                    Bus Fare
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" value={this.state.routeData.fare} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Available Account Balance
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" value={this.state.user.credit} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                {this.state.decision ?
                                    <div>
                                        <Col sm="11">
                                            <Button style={{ width: '100%' }} variant="danger">Balance Not Sufficient</Button>
                                        </Col>
                                        <Col sm="11">
                                            <Button style={{ width: '100%', marginTop: '10px' }} onClick={this.handleAddCredit}>Add Credit</Button>
                                        </Col>
                                    </div>
                                    :
                                    <Col sm="11">
                                        <Button style={{ width: '100%' }} onClick={this.handleBooking}>Book Ticket</Button>
                                    </Col>
                                }
                            </Form.Group>
                        </Form>
                    </div>
                }
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
                <div >
                    <Snackbar style={{ width: '100%' }} open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                        <Alert style={{ width: '50%', margin: 'auto' }} onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
                            Ticket Booked Successfully !
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        )
    }

}

export default BookingPage;
