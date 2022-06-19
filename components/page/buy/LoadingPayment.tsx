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
             <CircularProgress color="inherit" />
          },10000)
         }
        </>
    )
}

export default LoadingPayment;