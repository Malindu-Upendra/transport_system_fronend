import {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import QrScannerMain from "./QrScannerMain/QrScannerMain";
import Scanner from "./QrScannerMain/Scanner";

class InspectorPaths extends Component{
    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/" component={QrScannerMain} exact/>
                    <Route path="/qr_scanner" component={Scanner} exact/>
                </Switch>
            </Router>
        )
    }
}

export default InspectorPaths;
