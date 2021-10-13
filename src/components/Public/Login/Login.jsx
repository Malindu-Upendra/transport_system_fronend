import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Form,Button} from "react-bootstrap";
import {Card} from "@material-ui/core"
import axios from "axios";
import { withRouter } from "react-router";

export class Login extends Component {

    state = {
        username:'',
        password:''
    }

    handleChange = (event) => {
        const {name,value} = event.target
        this.setState({[name]:value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('https://backendtransportsystem.herokuapp.com/login/login',user).then(async res => {
            if(res.data.success){
                await sessionStorage.setItem("token",res.data.token)

                window.location = "/"

            }else{
                alert(res.data.message)
            }
        })
    }

    render() {

        return (

            <Container
                style={{width: "100%", marginTop: "2%", padding: "1%" ,marginBottom: "2%"}}>
                <Card>
                <Form>

                    <Form.Group style={{width:"50%",marginLeft:"25%",marginTop:"2%",marginBottom:"1%"}}>
                        <Form.Text style={{width:"50%",color:"#282c34",fontSize:"30px"}}>
                            <b>Login</b>
                        </Form.Text>

                    </Form.Group>

                    <Form.Group style={{width:"50%",marginLeft:"25%",marginBottom:"3%"}}>
                        <Form.Text style={{width:"50%",color:"#282c34",fontSize:"20px"}}>
                            Don't Have an Account? Create an Account
                            <a href="/register"> Click here</a>
                        </Form.Text>

                    </Form.Group>

                    <Form.Group style={{width:"50%",marginLeft:"25%"}} controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" onChange={this.handleChange} placeholder=" Username" />
                    </Form.Group>

                    <Form.Group style={{width:"50%",marginLeft:"25%",marginTop:"2%"}} controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.handleChange} placeholder="Password" />
                    </Form.Group>

                    <Button
                        style={{width:"50%",marginLeft:"25%",marginTop:"3%"}}
                        variant="primary" type="button" onClick={this.handleSubmit}>
                        Login
                    </Button>

                    <Form.Group xs={12} sm={6} style={{width:"50%",marginLeft:"25%",marginTop:"2%",marginBottom:"5%"}} controlId="formBasicCheckbox">
                        <Form.Text style={{width:"25%",color:"blue"}}>
                            Forgot Password?
                        </Form.Text>
                    </Form.Group>

                </Form>
                </Card>
            </Container>


        )
    }
}
export default withRouter(Login)
