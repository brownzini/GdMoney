// Loading Animation
import CircularProgress from "@mui/material/CircularProgress";

const LoadingPayment = () => {
    const Loading = () => {
        return (
            <> <CircularProgress color="inherit" /> </>
        )
    }

    return (
        <> 
         {
          setTimeout(() => { 
            <div className="content-payment">
            <div className="content-head"></div>
              <div className="content-subHead">
                <h1>Confirm Payment</h1>
              </div>
              <div className="content-body">
                    <h1> mensagemk kkkkkkk </h1>
              </div>
            </div>
          },10000)
         }
        </>
    )
}

export default LoadingPayment;