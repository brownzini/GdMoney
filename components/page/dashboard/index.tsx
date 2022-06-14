//Framework Material-UI
import Button from '@mui/material/Button';

import Header from "./Header";
import WovenImageList from "./Header/ImageList";

export default function Dashboard() {
  return (
    <div className="main-dashboard">
      <section className="header">
        <Header currentPage="Home" />
      </section>
      <section className="content"> 
        <div className="content-list-collectables">
          
          <div className="content-title">
            <h1> 
             👋 Welcome Username 
            </h1>
          </div>

          <WovenImageList />

          <div className="content-viewMore">
            <Button
              className="login-button"
              sx={{
                background: "#6209D9",
                border: "1px solid #6209D9",
                color: "white",
                height: "auto%",
                width: "25%",
                minHeight:"10vh",
                textAlign: "center",
                '&:hover': {
                  color: "#556cd6",
                },
              }}
              variant="outlined"
            >
              View More...
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}