//Material-UI
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

//Context
import { useCart } from "../../../hooks/context/useCart";

//Services
import verifyWallet from "../../../services/verifyWallet";
import requestPayment from "../../../services/payment/requestPayment";
import confirmPayment from "../../../services/payment/confirmPayment";
import getWalletUser from "../../../services/users/getWalletUser";

//Next
import Router from "next/router";

//Cookies
import { setCookie } from "nookies";
interface Props {
    token: string;
    balance: number;
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    from: string;
    to: string;
    setTo: React.Dispatch<React.SetStateAction<string>>;
    setFrom: React.Dispatch<React.SetStateAction<string>>;
    error:boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    setResponse: React.Dispatch<React.SetStateAction<{
        status: boolean;
        message: string;
    }>>;
}

const Payment = ({
    token,
    balance,
    message,
    setMessage,
    from,
    to,
    setTo,
    setFrom,
    error,
    setError,
    setResponse,
}:Props) => {
  const { cartProducts, getTotalValue, setCartProducts } = useCart();

  function setCookies () {
    setCookie(
      null,
      "STATUS",
      JSON.stringify([
        {
          status: [{
            from: from,
            price: Number(getTotalValue('normal', balance)),
            to: to,
          }],
        },
      ]),
      { maxAge: 86400 * 7, path: "/" }
    );
  }

  function errors (message:string) {
    switch (message) {
      case 'Pending transaction':  setCookies();
      default: {
        setResponse({
            status: false,
            message: message,
        });
        setMessage(message);
        setError(true);
      }
    }
  }

  async function confirmation () {
    const message = await confirmPayment(token, cartProducts);

    if (message === 'Success in operation') {
        setCartProducts([]);
        setCookie(
            null,
            "CART",
            JSON.stringify([
              { cart: [] },
            ]),
            { maxAge: 86400 * 7, path: "/" }
        );
        Router.push("/");
    } else {
        setResponse({
            status: true,
            message: message,
        });
    }
  }

  async function execute () {
      const verify = await verifyWallet(token, from);
      if(verify) {
        setResponse({
          status: true,
          message: 'loading',
        });

        const price = Number(getTotalValue('converted', balance));
        (cartProducts.length === 1) && setTo(await getWalletUser(token, cartProducts[0].user_id));
        
        setTimeout(async () => {
            const responseTransation = await requestPayment(token, from, price, to);
            if (responseTransation === 'OK') {
                confirmation();
            } else {
                errors(responseTransation);
            }
        },10000);
    } else {
        setMessage('Invalid Wallet Address.')
        setError(true);
    }
  }

  return (
    <div className="content-payment">
      <div className="content-head"></div>
      <div className="content-subHead">
        <h1>Send to: {to}</h1>
      </div>
      <div className="content-body">
        <TextField
          value={from}
          sx={{ width: "100%" }}
          onChange={(e) => setFrom(e.target.value)}
          id="outlined-error-helper-text"
          label="Your Wallet Address"
          error={error}
          helperText={error && message}
        />
        <div className="content-footer">
          <div className="content-footer-price">
            <h1>Total: {getTotalValue("converted", balance)}BNB</h1>
          </div>
        </div>
      </div>
      <div className="button-confirm-payment">
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
          disabled={error}
          onClick={async () => execute()}
          variant="outlined"
        >
          Confirm Payment
        </Button>
      </div>
    </div>
  );
};

export default Payment;
