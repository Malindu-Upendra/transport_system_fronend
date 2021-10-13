import { Component } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import decode from "jwt-decode";
import axios from 'axios'

class BookingHistory extends Component {

    state = {
        user:'',
        bookingHistory:[]
     }

    componentDidMount = async () => {
        if(sessionStorage.token) {
           await this.setState({user:decode(sessionStorage.token).username});
        }

        await axios.get(`https://backendtransportsystem.herokuapp.com/passenger/getBookingHistory/${this.state.user}`).then(res => {
            if(res.data.success){
                this.setState({bookingHistory:res.data.data})
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.bookingHistory.map((item) => (
                <Card sx={{ maxWidth: '80%',maxHeight:'290px' }} style={{ margin: 'auto', marginTop: '20px' }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.source} to {item.destination}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <p>Fare : {item.fare}</p>
                            <p>Date : {item.date}</p>
                            <p>Time : {item.time}</p>
                        </Typography>
                    </CardContent>
                </Card>
                ))}
            </div>
        )
    }

}

export default BookingHistory