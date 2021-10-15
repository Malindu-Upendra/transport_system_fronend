import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

class ManageDetails extends Component {
  state = {
    source: "",
    destination: "",
    img: "",
    kilometers: 0,
    fare: 0,
    name: "",
    username: "",
    password: "",
    inspectors: [],
    dates: [],
    bookings: [],
  };

  componentDidMount = async () => {
    await axios
      .get(
        "https://backendtransportsystem.herokuapp.com/transportManager/getInspectors"
      )
      .then((res) => {
        if (res.data.success) {
          this.setState({ inspectors: res.data.data });
        }
      });

    await axios
      .get(
        "https://backendtransportsystem.herokuapp.com/transportManager/getDates"
      )
      .then((res) => {
        if (res.data.success) {
          this.setState({ dates: res.data.data });
        }
      });

    await axios
      .get(
        "https://backendtransportsystem.herokuapp.com/transportManager/getBookings"
      )
      .then((res) => {
        if (res.data.success) {
          this.setState({ bookings: res.data.data });
        }
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addRoutes = (event) => {
    event.preventDefault();

    const route = {
      source: this.state.source,
      destination: this.state.destination,
      img: this.state.img,
      kilometers: this.state.kilometers,
      fare: this.state.fare,
    };

    axios
      .post(
        "https://backendtransportsystem.herokuapp.com/transportManager/addRoutes",
        route
      )
      .then((res) => {
        if (res.data.success) {
          window.location.reload(false);
        }
      });
  };

  addInspector = (event) => {
    event.preventDefault();

    const inspector = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post(
        "https://backendtransportsystem.herokuapp.com/transportManager/insertInspector",
        inspector
      )
      .then((res) => {
        if (res.data.success) {
          window.location.reload(false);
        }
      });
  };

  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <div style={{ width: "80%", margin: "auto" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Add Routes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Form style={{ width: "100%" }}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="1">
                    Source
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      name="source"
                      onChange={this.handleChange}
                      type="text"
                      placeholder="ex: colombo"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="1">
                    Destination
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      name="destination"
                      onChange={this.handleChange}
                      type="text"
                      placeholder="ex: matale"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="1">
                    Image url
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      name="img"
                      onChange={this.handleChange}
                      type="text"
                      placeholder="http://www.splash.com/ddfsdfsdf"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="1">
                    Kilometers
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      name="kilometers"
                      onChange={this.handleChange}
                      type="number"
                      placeholder="ex: 120"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="1">
                    Bus Fare
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      name="fare"
                      onChange={this.handleChange}
                      type="number"
                      placeholder="ex: 450"
                    />
                  </Col>
                </Form.Group>
                <Button
                  style={{ width: "100%" }}
                  onClick={this.addRoutes}
                  variant="info"
                >
                  Add
                </Button>
              </Form>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Add Inspectors</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Form style={{ width: "100%" }}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="1">
                    Full Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      name="name"
                      onChange={this.handleChange}
                      type="text"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="1">
                    Username
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      name="username"
                      onChange={this.handleChange}
                      type="text"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="1">
                    Password
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      name="password"
                      onChange={this.handleChange}
                      type="password"
                    />
                  </Col>
                </Form.Group>
                <Button
                  style={{ width: "100%" }}
                  onClick={this.addInspector}
                  variant="info"
                >
                  Add
                </Button>
              </Form>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Inspectors</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.inspectors.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.username}</td>
                      <td>@{item.password}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>View Statistics</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: "100%" }}>
                {this.state.dates.map((item) => (
                  <>
                    <Typography
                      style={{ textAlign: "center", color: "#004d4d",marginTop:'20px' }}
                    >
                      {item._id.date}
                    </Typography>

                    <Table
                      responsive="sm"
                      style={{ margin: "auto", width: "80%" }}
                    >
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Source</th>
                          <th>Destination</th>
                          <th>fare</th>
                          <th>time</th>
                        </tr>
                      </thead>
                      {this.state.bookings.map((it, index) => (
                        <>
                          {item._id.date === it.date && (
                            <>
                              <tbody>
                                <tr>
                                  <td>{it.user}</td>
                                  <td>{it.source}</td>
                                  <td>{it.destination}</td>
                                  <td>{it.fare}</td>
                                  <td>{it.time}</td>
                                </tr>
                              </tbody>
                            </>
                          )}
                        </>
                      ))}
                    </Table>
                  </>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    );
  }
}

export default ManageDetails;
