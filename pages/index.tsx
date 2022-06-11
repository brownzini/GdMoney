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
            <div className="earth">
              <img 
                src="/assets/img/felicidade.png" 
                alt="Initial image"
                />
            </div>
            <div className="base">
              <img 
                src="/assets/img/economia.png" 
                alt="Initial image"
              />
            </div>
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

      <section className="about" id="about">
        <div className="about-img">
            <img src="/assets/img/foguete.png" alt="" />
        </div>

        <div className="about-text">
            <span>Sobre nós</span>
            <h2>Trabalhamos com os <br /> melhores produtos</h2>
            <p>Empresa que já está no ramo desde 2022, começando com marketplace e logo estaremos com nossa loja física.</p>
           
            <div className="block">
              <Button
                sx={{ width: "13rem", height: "65px" }}
                variant="outlined"
              >
                Contact
              </Button>
              <Button
                href="https://www.investopedia.com/terms/b/blockchain.asp"
                sx={{
                  width: "13rem",
                  height: "65px",
                }}
                variant="outlined"
              >
                What Is a Blockchain
              </Button> 
            </div>                      
        </div>
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