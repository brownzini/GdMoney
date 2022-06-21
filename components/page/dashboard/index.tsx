//Framework Material-UI
import { Link } from '@mui/material';
import Button from '@mui/material/Button';

//Components
import WovenImageList from "./ImageList";
import Header from '../../Header';

type Props = {
  token:string;
  username?:string;
  isAdmin?:boolean;
}

export default function Dashboard({ 
  token, 
  username,
  isAdmin = false,
}:Props) {
  return (
    <div className="main-dashboard">
      <section className="header">
        <Header 
          currentPage="Home" 
          token={token} 
          username={username}
          isAdmin={isAdmin}
        />
      </section>
      <section className="content"> 
        <div className="content-list-collectables">
          
          <div className="content-title">
            <h1> 
             👋 Welcome {username} 
            </h1>
          </div>

          <WovenImageList />

          <div className="content-viewMore">
            <Link
              href="/marketplace"
              underline="none"
            >
             <Button
              className="login-button"
              sx={{
                background: "#6209D9",
                border: "1px solid #6209D9",
                color: "white",
                height: "auto%",
                width: "100%",
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
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

