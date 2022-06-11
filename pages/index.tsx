import type { NextPage } from 'next'
import Button from '@mui/material/Button';

const Home: NextPage = () => {
  return (
    <div className="content">
      <section className="home">
        <div className="home-text">
            <h1>GdMoney</h1>
            <h2>Your <br /> marketplace outside the blockchain</h2>
        </div>

        <div className="home-img">
            <img src="/assets/img/economia.png" alt="Pagina Inicial"  />
        </div>
        <Button
          className="login-button"
          sx={{
            background: "#602f68",
            border: "1px solid #4c0f5c",
            color: "white",
            height: "67px",
            width: "10rem",
            mt: "-7rem",
          }}
          variant="outlined"
        >
          Log in
        </Button>
        <Button
          sx={{
            width: "13rem",
            height: "65px",
            mt: "-7rem",
            ml: "-14rem",
          }}
          variant="outlined"
        >
          Sign up
        </Button>
      </section>

      <footer>
        <h1>
          Rodapé
        </h1>
      </footer>
    </div>
  )
}

export default Home;