/* Next */
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

/* React */
import { useEffect, useRef } from "react";

/* Framework Material-UI */
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

//Cookies
import { parseCookies } from "nookies";

//Services
import refresh_token from "../services/refresh_token";

const LandingPage: NextPage = () => {
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);

  function navbarToggle() {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 30) {
      ref.current.style.background = "rgb(26 16 39 / 87%)";
    } else {
      ref.current.style.background = "transparent";
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", navbarToggle);
    return () => {
      window.removeEventListener("scroll", navbarToggle);
    };
  }, []);

  useEffect(() => {
    const li = document.querySelector("#li");
    const navbar = document.querySelector(".navbar");

    if (li && navbar) {
      li.addEventListener("click", function () {
        navbar.classList.toggle("active");
      });

      window.onscroll = () => {
        navbar.classList.remove("active");
      };
    }
  }, []);

  return (
    <div className="content">
      <header ref={ref}>
        <div className="logo">
          <img src="/assets/img/logo.png" alt="Initial image" />
        </div>
        <ul className="navbar">
          <li>
            <Link href="#home">Home</Link>
          </li>
          <li>
            <Link href="#about">About</Link>
          </li>
          <li>
            <Link href="#token">Token</Link>
          </li>
          <li>
            <Link href="#contact">Contact</Link>
          </li>
        </ul>
      </header>

      <section className="home" id="home">
        <div className="home-text">
          <h1>GdMoney</h1>
          <h2>
            Your <br /> marketplace outside the blockchain
          </h2>
        </div>

        <div className="home-img">
          <div className="earth">
            <img src="/assets/img/felicidade.png" alt="Initial image" />
          </div>
          <div className="base">
            <img src="/assets/img/economia.png" alt="Initial image" />
          </div>
        </div>

        <div className="button-groups">
          <Link href="/login" underline="none">
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
          </Link>
          <Link href="/signup" underline="none">
            <Button
              className="signup-button"
              sx={{
                width: "13rem",
                height: "65px",
                mt: "-10rem",
                ml: "10.5rem",
              }}
              variant="outlined"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-img">
          <img src="/assets/img/foguete.png" alt="" />
        </div>

        <div className="about-text">
          <span>About Us</span>
          <h2>We work with the best digital products</h2>
          <p>
            Fictitious company that has been in the business since 2022,
            starting with marketplace and soon we will be with our physical
            store. Simulation of purchases outside the blockchain.
          </p>

          <div className="block">
            <Link href="#contact" underline="none">
              <Button
                sx={{ width: "13rem", height: "65px" }}
                variant="outlined"
              >
                Contact
              </Button>
            </Link>
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
          <img src="/assets/img/bnb.png" alt="" />
        </div>

        <div className="container">
          <div className="box">
            <h2>BNB Token</h2>
            <h3>
              Launched in July 2017, Binance is the biggest cryptocurrency
              exchange globally based on daily trading volume. Binance aims to
              bring cryptocurrency exchanges to the forefront of financial
              activity globally. The idea behind Binance’s name is to show this
              new paradigm in global finance — Binary Finance, or Binance.
              <br />
              Aside from being the largest cryptocurrency exchange globally,
              Binance has launched a whole ecosystem of functionalities for its
              users. The Binance network includes the Binance Chain, Binance
              Smart Chain, Binance Academy, Trust Wallet and Research projects,
              which all employ the powers of blockchain technology to bring
              new-age finance to the world. BNB is an integral part of the
              successful functioning of many of the Binance sub-projects.
            </h3>
          </div>
        </div>
      </section>

      <section className="swap">
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
              "&:hover": {
                color: "#556cd6",
              },
            }}
            variant="outlined"
          >
            SWAP
          </Button>
        </Link>
      </section>

      <section className="footer" id="contact">
        <h3>My Social Networks</h3>
        <div className="social">
          <Link
            href="https://github.com/GabrielDavid1/GdMoney"
            sx={{ padding: "10px" }}
            target="_blank"
          >
            <GitHubIcon
              sx={{
                color: "white",
                transition: "all .5s ease-in-out",
                "&:hover": {
                  color: "yellow",
                },
              }}
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/gabrieldavidsilva/"
            sx={{ padding: "10px" }}
            target="_blank"
          >
            <LinkedInIcon
              sx={{
                transition: "all .5s ease-in-out",
                "&:hover": {
                  color: "#253478;",
                },
              }}
            />
          </Link>
          <Link
            href="https://wa.me/5548984791459"
            sx={{ padding: "10px" }}
            target="_blank"
          >
            <WhatsAppIcon
              sx={{
                color: "green",
                transition: "all .5s ease-in-out",
                "&:hover": {
                  color: "#7bf07b",
                },
              }}
            />
          </Link>
        </div>
        <div className="message"> 
              <h5> Warning: This project is only intended to be used for means of studies.</h5>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const session = parseCookies(context);
    const token = await refresh_token(session);

    if (token !== 'Token is invalid or expired') {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };       
    }
    return {
      props: {
        token,
      },
    };
  } catch (e) {
    return {
      props: {}
    }
  }
};

export default LandingPage;
