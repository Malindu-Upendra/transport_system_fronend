import { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Space, Typography } from "antd";
import Search from "antd/es/input/Search";
import axios from "axios";

class HomeRoute extends Component {

    state = {
        routes: []
    }

    componentDidMount = async () => {
        await axios.get('https://backendtransportsystem.herokuapp.com/public/getRoutes').then(res => {
            if (res.data.success) {
                this.setState({ routes: res.data.data })
            }
        })

    }

    handleBooking = (id) => {
        window.location = `/passenger/booking/${id}`
    }

    render() {
        return (
            <>
                <div>
                    <Container style={{ marginTop: '3%' }}>
                        <Row>
                            <Col >
                                <Typography style={{ fontSize: '30px' }} gutterBottom>
                                    Welcome to Travels
                                </Typography>
                            </Col>

                            <Col style={{ width: "50%"}}>
                                <div>
                                    <Space direction="vertical" style={{ width: "100%"}}>
                                        <Search
                                            placeholder="Search Destination"
                                            style={{ width: "100%" }}
                                            enterButton
                                        />
                                    </Space>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Container style={{ backgroundColor: 'white', marginBottom: '30px' }}>
                    {this.state.routes.map((item) => (
                        <>
                            <Card style={{
                                marginTop: '2%', width: '100%', background: '#f2f2f2',
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                            }}>
                                <Row>
                                    <Col style={{ width: '50%', height: 'auto' }}>

                                        <Card.Img
                                            variant="top"
                                            src={item.img}
                                            style={{ width: '100%%', height: 'auto', marginTop: '1.1%', marginLeft: '1.1%', marginBottom: '1.1%' }}
                                        />
                                    </Col>

                                    <Col style={{width:'50%'}}>
                                        <Card.Body>
                                            <Col>
                                                <Card.Title style={{ fontSize: '15px',width:'100%' }}>{item.source} - {item.destination}
                                                    <Button variant="success" onClick={this.handleBooking.bind(this, item._id)} style={{ background: '#003333', float: 'right', width: '90%',marginTop:'30px' }}>
                                                        Book Now
                                                    </Button>
                                                </Card.Title>
                                            </Col>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </>
                    ))}
                </Container>
            </>
        )
    }
}

export default HomeRoute;
