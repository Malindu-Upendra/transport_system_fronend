import { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Space, Typography } from "antd";
import Search from "antd/es/input/Search";
import decode from "jwt-decode";
import axios from "axios";

class Homepage extends Component {

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

    checkLogin = () => {
        if (sessionStorage.token) {
            this.setState({ user: decode(sessionStorage.token).position });
        } else {
            window.location = '/login'
        }
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
                                            style={{ width: "100%"}}
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
                                            style={{ width: '100%', height: 'auto', marginTop: '1.1%', marginLeft: '1.1%', marginBottom: '1.1%' }}
                                        />
                                    </Col>

                                    <Col>
                                        <Card.Body>
                                            <Row style={{ marginTop: '10%', marginRight: '10%' }}>
                                                <Col>
                                                    <Card.Title style={{ fontSize: '20px' }}>{item.source} - {item.destination}</Card.Title>
                                                </Col>
                                            </Row>
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

export default Homepage;
