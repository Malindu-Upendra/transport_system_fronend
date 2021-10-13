import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import decode from "jwt-decode";
// import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Header = () => {
  //   state = {
  //     user: "",
  //   };

  const [user, setUser] = React.useState("");

  const history = useHistory();

  //   static propTypes = {
  //     match: PropTypes.object.isRequired,
  //     location: PropTypes.object.isRequired,
  //     history: PropTypes.object.isRequired,
  //   };

  const handleLogout = () => {
    sessionStorage.clear();
    console.log("clicked");
    history.push("/");
    window.location.reload(false)
  };

  useEffect(() => {
    if (sessionStorage.token) {
      setUser(decode(sessionStorage.token).position);
    } else {
      setUser("guest");
    }
  }, []);

  //   componentDidMount = () => {
  //     if (sessionStorage.token) {
  //       this.setState({ user: decode(sessionStorage.token).position });
  //     } else {
  //       this.setState({ user: "guest" });
  //     }
  //   };

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
        <Navbar.Brand href="/">Transport System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user === "guest" ? (
              <Nav.Link href="/">Routes</Nav.Link>
            ) : user === "passenger" ? (
              <>
                <Nav.Link href="/">Routes</Nav.Link>
                <Nav.Link href="/passenger/bookingHistory">
                  Booking History
                </Nav.Link>
              </>
            ) : (
              user === "inspector" && (
                <>
                  <Nav.Link href="/qr_scanner">Scanner</Nav.Link>
                </>
              )
            )}
          </Nav>
          <Nav>
            {user === "guest" ? (
              <Nav.Link href="/login">Login</Nav.Link>
            ) : user === "passenger" ? (
              <>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link href="/passenger/account">Account</Nav.Link>
              </>
            ) : (
              user === "inspector" && (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
