//Material-UI
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

//Context
import { useCart } from "../../../hooks/context/useCart";

//Services
import verifyWallet from "../../../services/verifyWallet";
import requestPayment from "../../../services/payment/requestPayment";

interface Props {
    token: string;
    balance: number;
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    from: string;
    to: string;
    setFrom: React.Dispatch<React.SetStateAction<string>>;
    error:boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    setResponse: React.Dispatch<React.SetStateAction<{
        status: boolean;
        message: string;
    }>>;
    response:{
        status: boolean;
        message: string;
    }
}

const Payment = ({
    token,
    balance,
    message,
    setMessage,
    from,
    to,
    setFrom,
    error,
    setError,
    setResponse,
    response,
}:Props) => {
  const { getTotalValue } = useCart();

  function errors (message:string) {
    switch (message) {
      case 'No transaction found': execute();
      case 'Pending transaction': execute();
      default: setResponse({
        status: false,
        message: message,
      });
    }
  }

  async function execute () {
      const verify = await verifyWallet(token, from);
      if(verify) {
        setResponse({
          status: true,
          message: 'normal',
        });
        const price = Number(getTotalValue('converted', balance));
        const responseTransation = await requestPayment(token, from, 0, to);

        if (responseTransation === 'OK') {
            setResponse({ status: true, message: message });
        } else {
            errors(responseTransation);
        }
    } else {
          setMessage('Invalid Wallet Address.')
          setError(true);
      }
  }

  return (
    <div className="content-payment">
      <div className="content-head"></div>
      <div className="content-subHead">
        <h1>Confirm Payment</h1>
      </div>
      <div className="content-body">
        <TextField
          value={from}
          sx={{ width: "100%" }}
          onChange={(e) => setFrom(e.target.value)}
          id="outlined-error-helper-text"
          label="Wallet_Address"
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
