import {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ManageDetails from "./Routes/ManageDetails";

class TransportMPaths extends Component{
    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/" component={ManageDetails} exact/>
                </Switch>
            </Router>
        )
    }
}

export default TransportMPaths;
