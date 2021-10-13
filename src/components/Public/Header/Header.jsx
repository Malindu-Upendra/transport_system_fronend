import { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import decode from "jwt-decode";

class Header extends Component {

    state = {
        user: ''
    }

    handleLogout = () => {
        sessionStorage.clear();
        window.location = "https://malindu-upendra.github.io/Transport_system_FrontEnd";
    }

    componentDidMount = () => {
        if (sessionStorage.token) {
            this.setState({ user: decode(sessionStorage.token).position });
        } else {
            this.setState({ user: 'guest' });
        }
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src="/images/logoo.jpg"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="https://malindu-upendra.github.io/Transport_system_FrontEnd">Transport System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {this.state.user === 'guest' ?
                                <Nav.Link href="https://malindu-upendra.github.io/Transport_system_FrontEnd">Routes</Nav.Link>
                                : this.state.user === 'passenger' ? <>
                                    <Nav.Link href="https://malindu-upendra.github.io/Transport_system_FrontEnd">Routes</Nav.Link>
                                    <Nav.Link href="https://malindu-upendra.github.io/Transport_system_FrontEnd/passenger/bookingHistory">Booking History</Nav.Link>
                                </>
                                    : this.state.user === 'inspector' &&
                                    <>
                                        <Nav.Link href="https://malindu-upendra.github.io/Transport_system_FrontEnd/qr_scanner">Scanner</Nav.Link>
                                    </>}
                        </Nav>
                        <Nav>
                            {this.state.user === 'guest' ?
                                <Nav.Link href="https://malindu-upendra.github.io/Transport_system_FrontEnd/login">Login</Nav.Link>
                                : this.state.user === 'passenger' ?
                                    <>
                                        <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                                        <Nav.Link href="https://malindu-upendra.github.io/Transport_system_FrontEnd/passenger/account">Account</Nav.Link>
                                    </>
                                    : this.state.user === 'inspector' && <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        )
    }
}

export default Header;
