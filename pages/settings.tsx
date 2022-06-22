//React
import * as React from "react";

/* Next */
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

// Nookies
import { parseCookies, setCookie } from "nookies";

// Services API
import refresh_token from '../services/refresh_token'
import getUserID from "../services/users/getUserID";
import getUserName from "../services/users/getUserName";
import changePassword from "../services/change/changePassword";
import changeData from "../services/change/changeData";
import getWalletUser from "../services/users/getWalletUser";

//Context
import { useCart } from "../hooks/context/useCart";

//Material-UI
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//Global
import getCart from "../global/functions/getCart";
import Header from "../components/Header";

//Yup and Formik
import * as yup from "yup";
import { useFormik } from "formik";

//Components
import CustomizedSnackbars from "../components/page/settings/CustomizedSnackbars";

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("The username is required")
      .max(20, "Must be less than 20 characters"),
    wallet_address: yup
      .string()
      .required("The wallet address is required")
      .min(40, "Least 40 characters long"),
    password: yup
      .string()
      .required("The re-password is required ")
      .max(25, "Must be less than 25 characters"),
    newpassword: yup
      .string()
      .max(25, "Must be less than 25 characters"),
});
interface Props {
    username:string;
    wallet_address:string;
    password:string;
    newpassword:string;
}

const Settings: NextPage = (props) => {
  const { token, cart, user_id, username, wallet_address }: any = props;
  const { getCartCookie } = useCart();

  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const [status, setStatus] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
        username: username+'',
        wallet_address: wallet_address+'',
        newpassword: "",
        password: "",
    },
    onSubmit: (values) => {
        submit(values);
    },
    validationSchema: validationSchema,
  });

  React.useEffect(() => {
    if (cart.length > 0) {
        getCartCookie(cart[0].cart);
    }
    setCookie(
      null,
      "TOKEN",
      JSON.stringify([
        {
          token: token,
        },
      ]),
      { maxAge: 86400 * 7, path: "/" }
    );
  }, []);

  async function submit (values:Props) {
    setStatus(true);
    const response = await changePassword(user_id, token, values.password, values.newpassword);
    if (response !== 'Success') {
        formik.errors.password = 'Wrong password';
        setError(true);
        setStatus(false);
    } else {
        await changeData(user_id, token, values.username, values.wallet_address);
        setOpen(true);
        setStatus(false);
        setTimeout(() => {
          setOpen(false)
        },3000);
    }
  }

  return (
    <div className="main-settings">
      <CustomizedSnackbars open={open} setOpen={setOpen} />
      <section className="header">
        <Header 
          currentPage="Cart" 
          token={token} 
          username={username}
        />
      </section>
      <section className="content">
        <div className="content-settings-title">
            <h1> Settings </h1>
        </div>
        <div className="content-body">
            <form onSubmit={formik.handleSubmit}>
                <div className="content-username">
                <TextField 
                  id="filled-basic" 
                  label="Username" 
                  variant="filled"
                  value={formik.values.username}
                  onChange={(e) => formik.setFieldValue("username", e.target.value)}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}                     
                />
                </div>
                <div className="content-wallet-address">
                <TextField
                  id="outlined-password-input"
                  label="Wallet Address"
                  type="normal"
                  autoComplete="wallet-address"
                  value={formik.values.wallet_address}
                  onChange={(e) => formik.setFieldValue("wallet_address", e.target.value)}
                  error={formik.touched.wallet_address && Boolean(formik.errors.wallet_address)}
                  helperText={formik.touched.wallet_address && formik.errors.wallet_address}                  
                />
                </div>
                <div className="content-password">
                <TextField
                  id="outlined-password-input2"
                  label="Current password"
                  type="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={(e) => formik.setFieldValue("password", e.target.value)}
                  error={formik.touched.password && Boolean(formik.errors.password) || error}
                  helperText={formik.touched.password && formik.errors.password}
                />
                </div>
                <div className="content-newpassword">
                <TextField
                  id="outlined-password-input3"
                  label="New password"
                  type="password"
                  autoComplete="new-password"
                  value={formik.values.newpassword}
                  onChange={(e) => formik.setFieldValue("newpassword", e.target.value)}
                  error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                  helperText={formik.touched.newpassword && formik.errors.newpassword}
                />
                </div>
                <div className="content-button">
                {!status ? (
                  <Button
                    type="submit"
                    sx={{
                      background: 'black',
                      color: 'white',
                      width: '100%',
                      "&:hover": {
                        color: "blue",
                        border: "1px solid blue",
                      },
                    }}>
                      Save
                  </Button>
                ) : (
                  <div className="loading"> <CircularProgress color="inherit" /> </div>
                )}

                </div>
            </form>    
        </div>
      </section>
    </div>
  )
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const session = parseCookies(context);
    const token = await refresh_token(session);
    const cart = getCart(session);
    const user_id = await getUserID(token);
    const username = await getUserName(token, user_id);
    const wallet_address = await getWalletUser(token, user_id);

    if (token === 'Token is invalid or expired') {
        return {
          redirect: {
            permanent: false,
            destination: "/landingpage",
          },
        };       
    }
    
    return {
      props: {
        token,
        cart,
        user_id,
        username,
        wallet_address,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/landingpage",
      },
    };
  }
};

export default Settings;
