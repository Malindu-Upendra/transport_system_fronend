import { Component } from "react";
import { Card } from "react-bootstrap";
import decode from "jwt-decode";
import axios from "axios";

class PaymentHistory extends Component {

    state = {
        username:'',
        payments:[]
    }

    componentDidMount = async () => {
        if (sessionStorage.token) {
            await this.setState({ username: decode(sessionStorage.token).username });
        }

        axios.get(`https://backendtransportsystem.herokuapp.com/passenger/getPaymentHistory/${this.state.username}`).then(res => {
            if(res.data.success){
                this.setState({payments:res.data.data})
            }
        })
    }

    render() {
        return (
            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                <h3 style={{textAlign:'center'}}>Payment History</h3>
                <Card style={{ width: '80%', margin: 'auto', boxShadow: "0 1rem 2rem rgba(0,0,0,0.2)" }}>
                    {this.state.payments.map((item,index) => (
                    <Card style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
                        <Card.Body>
                            <Card.Title>Transction {index + 1}</Card.Title>
                            <Card.Text>
                                <p>amount : {item.amount}</p>
                                <p>date : {item.date}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    ))}
                </Card>
            </div>
        )
    }

}

export default PaymentHistory