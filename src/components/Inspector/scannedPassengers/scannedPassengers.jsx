import axios from "axios";
import { Component } from "react";
import Table from 'react-bootstrap/Table'

class ScannedPassengers extends Component {

    state = {
        passengers: []
    }

    componentDidMount = async () => {
        const date = new Date();
        const today = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()

        const body = {
            day: today
        }

        await axios.post('https://backendtransportsystem.herokuapp.com/inspector/getPassengers', body).then(res => {
            if (res.data.success) {
                this.setState({ passengers: res.data.data })
                console.log(res.data.data)
            }
        })
    }

    render() {
        return (
            <>
                <h5 style={{textAlign:'center',color:'#0073e6'}}>Scanned Passengers</h5>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.passengers.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.user}</td>
                                <td>{item.name}</td>
                                <td>{item.source}</td>
                                <td>{item.destination}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )
    }

}

export default ScannedPassengers;