import {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Homepage from "./Homepage/Homepage";
import { withRouter } from "react-router";

class PublicPaths extends Component{
    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/" component={Homepage} exact/>
                    <Route path="/login" component={Login} exact/>
                    <Route path="/register" component={Register} exact/>
                </Switch>
            </Router>
        )
    }
}

export default withRouter(PublicPaths);
