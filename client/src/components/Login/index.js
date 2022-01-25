import { useForm } from "react-hook-form";
import React from "react";
import { Row, Col, Button } from "antd";
import firebase, { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const {
    register,
    formState: { errors },
  } = useForm();

  const handleLogin = async (provider) => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase()),
      });
    }
  };

  return (
    <div>
      <div className="body-login">
        <div className="outer-login">
          <div className="inner-login">
            <div className="login-top">
              <div className="logo-img-login"></div>
              <br />
              <h3>
                <b>Log in </b>
              </h3>
              <Row
                justify="center"
                style={{ width: "100%", 
                alignItems: "center",
                justifyContent: "center" }}
              >
                <Col span={8}>
                  <Button
                    style={{
                      width: "100%",
                      padding: 5,
                      marginBottom: 5,
                      marginTop: 5,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onClick={() => handleLogin(googleProvider)}
                  >
                    <div><GoogleOutlined />oogle</div>
                  </Button>
                  <Button
                    style={{ width: "100%", padding: 5, marginBottom: 20 }}
                    onClick={() => handleLogin(fbProvider)}
                  >
                    <FacebookOutlined />Facebook
                  </Button>
                </Col>
              </Row>
            </div>

            <form method="POST">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <small>
                    <span className="text-danger">
                      This field must be email
                    </span>
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  {...register("password", { required: true })}
                />
                <br />
              </div>

              <div className="form-group">
                <input type="checkbox" id="save_login" />
                &nbsp;
                <label htmlFor="save_login"> Save login? </label>
              </div>
              <button type="submit" className="btn btn-login btn-lg btn-block">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
