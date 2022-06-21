/* Next */
import Router from "next/router";
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

/* React */
import { useState } from "react";

/* Framework Material-UI */
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";

//Cookies
import { setCookie } from "nookies";

//Yup and Formik
import * as yup from "yup";
import { useFormik } from "formik";

//Cookies
import { parseCookies } from "nookies";

//Services
import api from "../services/api";
import refresh_token from "../services/refresh_token";

type State = {
  showPassword: boolean;
  password: string;
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("The username is required")
    .max(20, "The username must be less than 20 characters"),
  password: yup
    .string()
    .required("The password is required ")
    .max(50, "The password must be less than 50 characters"),
});

const Login: NextPage = () => {
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      log_in();
    },
    validationSchema: validationSchema,
  });
  /**-----------------------------------------------------------------------------**/
  async function log_in() {
    await api
      .post(
        "/login",
        {
          username: formik.values.username,
          password: formik.values.password,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(function (response) {
        setCookie(
          null,
          "TOKEN",
          JSON.stringify([
            {
              token: response.data.token,
            },
          ]),
          { maxAge: 86400 * 7, path: "/" }
        );
        setCookie(
          null,
          "RT",
          JSON.stringify([
            {
              id_rt: response.data.id_rt,
            },
          ]),
          { maxAge: 86400 * 7, path: "/" }
        );
        Router.push("/");
      })
      .catch(function (error) {
        formik.setFieldValue("password", "");
      });
  }
  /**-----------------------------------------------------------------------------**/
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  /**-----------------------------------------------------------------------------**/
  return (
    <div className="main-login">
      <div className="box-content">
        <div className="heading">
          <header></header>
          <h1>Login</h1>
        </div>
        <div className="form">
          <form onSubmit={formik.handleSubmit}>
            <div className="field-username">
              <InputLabel htmlFor="username" sx={{ fontWeight: "bold" }}>
                Username
              </InputLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{
                  width: "90%",
                  height: "30px",
                }}
                value={formik.values.username}
                onChange={(e) =>
                  formik.setFieldValue("username", e.target.value)
                }
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </div>
            <div className="field-password">
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{ fontWeight: "bold" }}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={(e) =>
                  formik.setFieldValue("password", e.target.value)
                }
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{ width: "90%" }}
              />
            </div>
            <div className="button">
              <Button
                type="submit"
                sx={{
                  width: "15.2rem",
                  height: "55px",
                  background: "#602f68",
                  color: "white",
                  border: "1px solid #4c0f5c",
                  transition: "all .5s ease-in-out",
                  mt: "0.8rem",
                  "&:hover": {
                    color: "white",
                    background: "#874191",
                  },
                }}
                variant="outlined"
              >
                Log in
              </Button>
            </div>
          </form>
          <div className="signup-field">
            If you don't have account,
            <Link href="/signup"> create your user. </Link>
          </div>
        </div>
      </div>
      <div className="group-images">
        <img className="package-img" src="/assets/img/package.png" />
        <img className="discount-img" src="/assets/img/discount.png" />
      </div>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const session = parseCookies(context);
    const token = await refresh_token(session);

    if (token !== 'Token is invalid or expired') {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
    }
    return {
      props: {
        token,
      },
    };
  } catch (e) {
    return {
      props: {}
    }
  }
};

export default Login;
