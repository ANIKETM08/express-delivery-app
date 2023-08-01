import React, {useState} from "react";
import {Col, Button, Row, Container, Card, Form} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const register = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      toast.error("password not matching");
    } else {
      try {
        const response = await axios.post("/api/user/register", {
          name,
          email,
          phone,
          password,
          cpassword,
          address,
          answer,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    }
  };

  return (
    <div className="bg-image">
      <Container>
        <Row className="vh-100 d-flex justify-content-start align-items-center w-70 mt-3 rounded-0">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4 mt-5 background">
              <Card.Body>
                <div className="mb-2 mt-2">
                  <h2 className="fw-bold mb-4 text-center text-uppercase ">
                    Register
                  </h2>
                  <div className="mb-3">
                    <Form method="POST">
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Control
                          className="bg-transparent shadow-none border-0 rounded-0 border-bottom border-dark form-control"
                          required
                          value={name}
                          type="text"
                          placeholder="Enter Name"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          className="bg-transparent shadow-none border-0 rounded-0 border-bottom border-dark"
                          required
                          value={email}
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Control
                          className="bg-transparent shadow-none border-0 rounded-0 border-bottom border-dark"
                          required
                          value={phone}
                          type="tel"
                          placeholder="Enter Phone"
                          name="phone"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword">
                        <Form.Control
                          className="bg-transparent shadow-none border-0 rounded-0 border-bottom border-dark"
                          required
                          value={password}
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCpassword">
                        <Form.Control
                          className="bg-transparent shadow-none border-0 rounded-0 border-bottom border-dark"
                          required
                          type="password"
                          placeholder="Confirm Password"
                          value={cpassword}
                          name="cpassword"
                          onChange={(e) => setCpassword(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Control
                          className="bg-transparent shadow-none border-0 rounded-0 border-bottom border-dark"
                          required
                          value={address}
                          type="text"
                          placeholder="Enter Your address"
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="answer">
                        <Form.Label>Security Question</Form.Label>
                        <Form.Control
                          className="bg-transparent shadow-none border-0 rounded-0 border-bottom border-dark"
                          required
                          type="text"
                          placeholder="What is your favourite Sport?"
                          value={answer}
                          name="answer"
                          onChange={(e) => setAnswer(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"></Form.Group>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={register}>
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-2">
                      <p className="mb-0  text-center">
                        Already have an account??
                        <NavLink to="/login" className="text-primary fw-bold">
                          Login
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
export default Register;
