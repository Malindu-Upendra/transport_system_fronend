import {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Homepage from "./Homepage/Homepage";

class PublicPaths extends Component{
    render() {
        return(
            <Router>
                <Switch>
                    <Route path="https://malindu-upendra.github.io/Transport_system_FrontEnd" component={Homepage} exact/>
                    <Route path="https://malindu-upendra.github.io/Transport_system_FrontEnd/login" component={Login} exact/>
                    <Route path="https://malindu-upendra.github.io/Transport_system_FrontEnd/register" component={Register} exact/>
                </Switch>
            </Router>
        )
    }
}

export default PublicPaths;
