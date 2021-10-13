import {Component} from "react";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Public/Header/Header";
import PublicPaths from "./components/Public/PublicPaths";
import PassengerPaths from "./components/Passenger/PassengerPath";
import TransportMPaths from "./components/TransportManager/TransportMPaths";
import InspectorPaths from "./components/Inspector/InspectorPaths";
import {BrowserRouter as Router} from "react-router-dom";
import decode from "jwt-decode";

class App extends Component{

  state = {
    user:''
  }

  componentDidMount = async () => {

    if(sessionStorage.token) {
      await this.setState({user:decode(sessionStorage.token).position});
    }else {
      this.setState({user: 'guest'})
    }

  }

  render() {
    return(
        <Router>
          <>

            <Header/>
              {this.state.user === 'guest' && <PublicPaths/>}
              {this.state.user === 'passenger' &&<PassengerPaths/>}
              {this.state.user === 'transport manager' && <TransportMPaths/>}
              {this.state.user === 'inspector' && <InspectorPaths/>}
          </>
        </Router>
    )
  }

}

export default App;
