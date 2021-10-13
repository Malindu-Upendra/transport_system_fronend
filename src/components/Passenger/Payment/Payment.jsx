import {Component} from "react";
import { Card, Col, Form, Row} from "react-bootstrap";

class Payment extends Component{

    state = {
      amount : 1000
    }

    componentDidMount = () => {
        if(sessionStorage.token) {
            this.setState({amount:0});
        }
    }

    render() {
        return(
            <>
                <div style={{backgroundColor:'white'
                }}>
                    <Card style={{ boxShadow: "0 1rem 2rem rgba(0,0,0,0.2)"}}>
                        <Card.Header className="text-center" as="h5">Payment to Add Credits</Card.Header>
                        <Card.Body>
                            <div className='container'>
                                <Form >
                                    <p></p>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                            type="number"
                                            placeholder="Amount to be Add to Account"
                                            name="university"
                                            value={this.state.amount}
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

            </>
        )
    }
}

export default Payment;
