import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "@iso/components/uielements/input";
import Checkbox from "@iso/components/uielements/checkbox";
import Button from "@iso/components/uielements/button";
import FirebaseSignUpForm from "../../FirebaseForm/FirebaseForm";
import authAction from "@iso/redux/auth/actions";
import appActions from "@iso/redux/app/actions";
import Auth0 from "../../Authentication/Auth0/Auth0";
import IntlMessages from "@iso/components/utility/intlMessages";
import SignUpStyleWrapper from "./SignUp.styles";

import LanguageSwitcher from "@iso/cra/src/containers/Topbar/LanguageSwitcher/LanguageSwitcher";

const { login } = authAction;
const { clearMenu } = appActions;

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (token = false) => {
    console.log(token, "handlelogin");
    if (token) {
      dispatch(login(token));
    } else {
      dispatch(login());
    }
    dispatch(clearMenu());
    history.push("/dashboard");
  };
  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <LanguageSwitcher
            style={{ position: "relative", top: "-40px", left: "-20px" }}
          />
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signUpTitle" />
            </Link>
          </div>

          <div className="isoSignUpForm">
            <div className="isoInputWrapper isoLeftRightComponent">
              <Input size="large" placeholder="Tên đầu" />
              <Input size="large" placeholder="Tên đệm" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" placeholder="Tên tài khoản" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" placeholder="Email" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" type="password" placeholder="Mật khẩu" />
            </div>

            <div className="isoInputWrapper">
              <Input
                size="large"
                type="password"
                placeholder="Xác nhận lại mật khẩu"
              />
            </div>

            <div className="isoInputWrapper" style={{ marginBottom: "50px" }}>
              <Checkbox>
                <IntlMessages id="page.signUpTermsConditions" />
              </Checkbox>
            </div>

            <div className="isoInputWrapper">
              <Button type="primary" style={{ backgroundColor: "orange" }}>
                <IntlMessages id="page.signUpButton" />
              </Button>
            </div>
            {/* <div className="isoInputWrapper isoOtherLogin">
              <Button
                onClick={handleLogin}
                type="primary"
                className="btnFacebook"
              >
                <IntlMessages id="page.signUpFacebook" />
              </Button>
              <Button
                onClick={handleLogin}
                type="primary"
                className="btnGooglePlus"
              >
                <IntlMessages id="page.signUpGooglePlus" />
              </Button>
              <Button
                onClick={() => {
                  Auth0.login();
                }}
                type="primary"
                className="btnAuthZero"
              >
                <IntlMessages id="page.signUpAuth0" />
              </Button>

              <FirebaseSignUpForm
                signup={true}
                history={history}
                login={() => dispatch(login())}
              />
            </div> */}
            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
              <Link to="/signin">
                <IntlMessages id="page.signUpAlreadyAccount" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}
