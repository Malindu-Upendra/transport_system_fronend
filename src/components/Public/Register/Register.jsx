import {Component} from "react";
import { styled } from '@material-ui/core/styles';
import { Grid,Card,Typography} from "@material-ui/core";
import {Form,Button} from "react-bootstrap";
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
import Payment from "../../Passenger/Payment/Payment";

const MyGrid1 = styled(Grid)({
    backgroundColor:"white",
    marginBottom:"2%",
    padding:"2%"

});

const MyGrid2 = styled(Grid)({
    width:"80vw",
    marginTop:"2%",
    backgroundColor:"White",
    paddingTop:"5%",
    paddingLeft:"5%",
    paddingRight:"5%",
    paddingBottom:"2%",
    marginLeft:"10%",

});

export class Register extends Component {

    state = {
        id:'',
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        type: "Local",
        password:'',
        show:false
    }

    handleChange = (event) => {
        const {name,value} = event.target;
        this.setState({[name]:value});
    }

    onHide = () => {
        this.setState({show:false})
    }

    handleSubmit = (event) =>{
        event.preventDefault();

        this.setState({show:true})

    };

    handleSubmitOfModal = () => {
        let details = {
            id:this.state.id,
            password:this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
            type: this.state.type,
            credit:1000
        }

        axios.post('https://backendtransportsystem.herokuapp.com/passenger/register',details).then(response => {
            if (response.data.success) {
                this.setState({show:false})
                alert("Registered Successfully")
                window.location = '/login'
            } else {
                alert('Failed to Register')
            }
        })
            .catch(err => console.log(err));
    }

    render() {
        return (

            <div>

                <MyGrid2 container spacing={1}>

                    <Card>
                        <Grid item xs={12} style={{marginBottom:"3%",marginTop:"2%"}} >
                        <Typography style={{marginLeft:"40%"}} component="h1" variant="h5">
                            Create an Account
                        </Typography>
                        </Grid>

                    <MyGrid1 container spacing={3}>

                        <Grid item xs={12} >
                            <Form.Control
                                required
                                id="id"
                                name="id"
                                type="text"
                                placeholder="NIC/Passport Number"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Form.Control
                                required
                                id="id"
                                name="password"
                                type="password"
                                placeholder="Password"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Form.Control
                                required
                                id="firstname"
                                name="firstname"
                                placeholder="First Name"
                                fullWidth
                                onChange={this.handleChange}
                        />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Form.Control
                                required
                                id="lastname"
                                name="lastname"
                                placeholder="Last Name"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Form.Control
                                required
                                id="email"
                                name="email"
                                placeholder="Email"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Form.Control
                                required
                                id="phone"
                                name="phone"
                                placeholder="Contact Number"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Form.Select name="type" placeholder="Passenger Type" onChange={this.handleChange}>
                                <option value="Local" selected>Local</option>
                                <option value="Foreign">Foreign</option>
                            </Form.Select>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                size="large"
                                color="primary"
                                variant="primary"
                                style={{marginLeft:"25%",width:"50%"}}
                                onClick={this.handleSubmit}
                            >Register</Button>
                        </Grid>
                    </MyGrid1>
                    </Card>
                </MyGrid2>

                <Modal
                    show={this.state.show}
                    onHide={this.onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Payment
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Payment/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onHide}>Close</Button>
                        <Button onClick={this.handleSubmitOfModal}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>



        );

    }
}
export default Register;
