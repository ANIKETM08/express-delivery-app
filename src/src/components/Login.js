import React, {useState} from "react";
import {Col, Button, Row, Container, Card, Form} from "react-bootstrap";
import {NavLink, useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useAuth} from "../Context/Auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  axios.defaults.withCredentials = true;

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });
      if (response && response.data.success) {
        toast.success(response.data && response.data.message);
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate(location.state || "/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="bg-image">
      <Container>
        <Row className="vh-100 d-flex justify-content-start align-items-center w-70">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4 mt-5 background">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Login
                  </h2>
                  <div className="mb-3">
                    <Form method="POST">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          className="bg-transparent shadow-none border-0 rounded-0 border-bottom border-dark style"
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          className="bg-transparent shadow-none border-0 rounded-0 border-bottom border-dark style"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"></Form.Group>
                      <div className="d-grid">
                        <Button onClick={login} variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                      <br />
                      <div className="d-grid">
                        <Button
                          onClick={() => {
                            navigate("/forgot-password");
                          }}
                          variant="primary"
                          type="submit">
                          Forgot Password
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account??
                        <NavLink
                          to="/register"
                          className="text-primary fw-bold">
                          Register
                        </NavLink>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Login;
