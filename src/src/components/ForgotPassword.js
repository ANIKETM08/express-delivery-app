import React, {useState} from "react";
import {Col, Button, Row, Container, Card, Form} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  axios.defaults.withCredentials = true;

  const reset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (response && response.data.success) {
        toast.success(response.data && response.data.message);

        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4 mt-5">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Reset-Password
                  </h2>
                  <div className="mb-3">
                    <Form method="POST">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Answer</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Your favorite sport?"
                          name="answer"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="New Password"
                          name="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"></Form.Group>
                      <div className="d-grid">
                        <Button onClick={reset} variant="primary" type="submit">
                          Update Password
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Go to login page??
                        <NavLink to="/login" className="text-primary fw-bold">
                          login
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
};

export default ForgotPassword;
