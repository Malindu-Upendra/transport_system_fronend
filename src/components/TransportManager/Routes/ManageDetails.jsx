import * as React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Form,Button,Col,Row} from "react-bootstrap";
import {Component} from "react";
import axios from "axios";

class ManageDetails extends Component {

    state = {
        source:'',
        destination:'',
        img:'',
        kilometers:0,
        fare:0
    }

    handleChange = (event) => {
        const {name,value} = event.target;
        this.setState({[name]:value});
    }

    addRoutes = (event) => {
        event.preventDefault()

        const route = {
            source : this.state.source,
            destination: this.state.destination,
            img: this.state.img,
            kilometers: this.state.kilometers,
            fare: this.state.fare
        }

        axios.post('https://backendtransportsystem.herokuapp.com/transportManager/addRoutes',route).then(res => {
            if(res.data.success){
                window.location.reload(false)
            }
        })
    }

    render() {
        return (
            <div style={{marginTop:'50px'}}>
            <div style={{width:'80%',margin:'auto'}}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Add Routes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Form style={{width:'100%'}}>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="1">
                                    Source
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control name="source" onChange={this.handleChange} type="text" placeholder="ex: colombo" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="1">
                                    Destination
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control name="destination" onChange={this.handleChange} type="text" placeholder="ex: matale" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="1">
                                    Image url
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control name="img" onChange={this.handleChange} type="text" placeholder="http://www.splash.com/ddfsdfsdf" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="1">
                                    Kilometers
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control name="kilometers"  onChange={this.handleChange} type="number" placeholder="ex: 120" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="1">
                                    Bus Fare
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control name="fare" onChange={this.handleChange} type="number" placeholder="ex: 450" />
                                </Col>
                            </Form.Group>
                            <Button style={{width:'100%'}} onClick={this.addRoutes} variant="info">Add</Button>
                        </Form>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Add Inspectors</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Add Buses</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            </div>
        );
    }
}

export default ManageDetails;
