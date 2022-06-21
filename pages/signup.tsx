/* Next */
import Router from "next/router";
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

/* React */
import { useState } from "react";

/* Framework Material-UI */
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//Yup and Formik
import * as yup from "yup";
import { useFormik } from "formik";

//Services
import api from "../services/api";
import refresh_token from "../services/refresh_token";
import { parseCookies } from "nookies";

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
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

const Signup: NextPage = () => {
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });
  const [values2, setValues2] = useState<State>({
    password: "",
    showPassword: false,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repassword: "",
    },
    onSubmit: (values) => {
      signup();
    },
    validationSchema: validationSchema,
  });
  /**-----------------------------------------------------------------------------**/
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowPassword2 = () => {
    setValues2({
      ...values2,
      showPassword: !values2.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownPassword2 = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  /**-----------------------------------------------------------------------------**/
  async function signup() {
    await api
      .post(
        "/users/create",
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
        if (response.data.description === "Created") {
          Router.push("/login");
        }
      })
      .catch(function (error) {
        Router.push("/errors/signup");
      });
  }
  /**-----------------------------------------------------------------------------**/
  return (
    <div className="main-signup">
      <div className="box-content">
        <div className="heading">
          <header></header>
          <h1>Sign Up</h1>
        </div>
        <div className="form">
          <form onSubmit={formik.handleSubmit}>
            <div className="field-username">
              <InputLabel htmlFor="username" sx={{ fontWeight: "bold" }}>
                username
              </InputLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{
                  width: "90%",
                  height: "30px",
                }}
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
            <div className="field-repassword">
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{ fontWeight: "bold" }}
              >
                Password Confirm:
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-2"
                type={values2.showPassword ? "text" : "password"}
                value={formik.values.repassword}
                onChange={(e) =>
                  formik.setFieldValue("repassword", e.target.value)
                }
                error={
                  formik.touched.repassword && Boolean(formik.errors.repassword)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword2}
                      edge="end"
                    >
                      {values2.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  width: "90%",
                }}
              />
            </div>
            <div className="button">
              <Button
                type="submit"
                variant="outlined"
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
              >
                SIGN UP
              </Button>
            </div>
          </form>
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

export default Signup;
