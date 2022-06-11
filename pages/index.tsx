import type { NextPage } from 'next'
import Head from 'next/head'

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
        <button> SIGN UP </button>
      </section>

      <footer>
        <h1>
          Rodapé
        </h1>
      </footer>
    </div>
  )
}

export default Home