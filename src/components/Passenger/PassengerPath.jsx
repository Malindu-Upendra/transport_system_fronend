import {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomeRoute from "./Home/HomeRoute";
import Account from "./PassengerAccount/Account";
import Payment from "./Payment/Payment";
import BookingPage from "./BookingPage/BookingPage";
import BookingHistory from "./BookingHistory/BookingHistory";
import PaymentHistory from "./PaymentHistory/PaymentHistory";

class PassengerPath extends Component{
    render() {
        return(
                <Router>
                    <Switch>
                        <Route path="/" component={HomeRoute} exact/>
                        <Route path="/passenger/account" component={Account} exact/>
                        <Route path="/passenger/payment" component={Payment} exact/>
                        <Route path="/passenger/booking/:id" component={BookingPage} exact/>
                        <Route path="/passenger/bookingHistory" component={BookingHistory} exact/>
                        <Route path="/passenger/paymentHistory" component={PaymentHistory} exact/>
                    </Switch>
                </Router>
        )
    }
}

export default PassengerPath;
