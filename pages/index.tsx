import type { NextPage } from 'next'
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const Home: NextPage = () => {
  return (
    <div className="content">
      <header>
          <div className="logo">
            <img
              src="/assets/img/economia.png" 
              alt="Initial image"
            />
          </div>
          <ul className="navbar">
              <li><Link href="#home">Home</Link></li>
              <li><Link href="#about">About</Link></li>
              <li><Link href="#token">Token</Link></li>
              <li><Link href="#Swap">Swap</Link></li>
              <li><Link href="#contact">Contato</Link></li>
          </ul>
      </header>

      <section className="home" id="home">
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
            <img 
              src="/assets/img/foguete.png" 
              alt="" 
            />
        </div>

        <div className="about-text">
            <span>About Us</span>
            <h2>We work with the best products</h2>
            <p>Fictitious company that has been in the business since 2022, starting with marketplace and soon we will be with our physical store.</p>
           
            <div className="block">
              <Button
                sx={{ width: "13rem", height: "65px" }}
                variant="outlined"
              >
                Contact
              </Button>
              <Link
                href="https://www.investopedia.com/terms/b/blockchain.asp"
                target="_blank"
                underline="none"
              >
                <Button
                  sx={{
                    width: "13rem",
                    height: "65px",
                  }}
                  variant="outlined"
                >
                  What Is a Blockchain
                </Button> 
              </Link>
            </div>                      
        </div>
      </section>  

      <section className="token" id="token">
        <div className="heading">
          <img 
              src="/assets/img/bnb.png" 
              alt=""
            />
        </div>

        <div className="container">
            <div className="box">
                <h2>BNB Token</h2>
                <h3>
                 Launched in July 2017, Binance is the biggest cryptocurrency exchange globally based on daily trading volume. Binance aims to bring cryptocurrency exchanges to the forefront of financial activity globally. The idea behind Binance’s name is to show this new paradigm in global finance — Binary Finance, or Binance.
                 <br />
                 Aside from being the largest cryptocurrency exchange globally, Binance has launched a whole ecosystem of functionalities for its users. The Binance network includes the Binance Chain, Binance Smart Chain, Binance Academy, Trust Wallet and Research projects, which all employ the powers of blockchain technology to bring new-age finance to the world. BNB is an integral part of the successful functioning of many of the Binance sub-projects.
                </h3>
            </div>
        </div>
      </section>

      <section className="swap" id="swap">
        <h2>Do swap if you don't have bnb token</h2>
        <Link 
          href="https://pancakeswap.finance/swap"
          target="_blank"
          underline="none"
        >
          <Button
            sx={{
              width: "13rem",
              height: "65px",
              border: "1px solid orange",
              color: "#996607",
              '&:hover': {
                color: "#556cd6",
              },
            }}
            variant="outlined"
          >
            SWAP
          </Button> 
        </Link>
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