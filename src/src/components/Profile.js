import React, {useState, useEffect} from "react";
import {Col, Button, Row, Container, Card, Form} from "react-bootstrap";
import {useAuth} from "../Context/Auth";
import {toast} from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  // Context
  const [auth, setAuth] = useAuth();

  axios.defaults.withCredentials = true;

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  // Get userdata
  useEffect(() => {
    if (auth?.user) {
      const {name, email, phone, address} = auth.user;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, [auth?.user]);

  // Form function to update profile
  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.put("/api/user/profile", {
        name,
        email,
        phone,
        password,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({...auth, user: data?.updatedUser});
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div>
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <Card className="px-4 mt-5">
                <Card.Body>
                  <div className="mb-5 mt-md-4">
                    <h2 className="fw-bold mb-4 text-center text-uppercase ">
                      Update Profile
                    </h2>
                    <div className="mb-3">
                      <Form method="PUT" onSubmit={updateProfile}>
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Control
                            value={name}
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            value={email}
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                          <Form.Control
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
                            value={password}
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicAddress">
                          <Form.Control
                            required
                            value={address}
                            type="text"
                            placeholder="Enter Your address"
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"></Form.Group>
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Update Address
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
