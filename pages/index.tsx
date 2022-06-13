/* Next */
import type { NextPage } from 'next'

// Nookies
import { useEffect } from 'react';

//Contexts
import { useSessions } from '../context/sessions';

//Globals
import session from '../global/session';
import { LandingPage } from './landingPage';

const Home: NextPage = () => { 
    const { token, setToken } = useSessions();

    useEffect(() => {
        setToken(session.token);
    },[]);

    return (
        <>  
         {token !== null ? (
            <h1> LOGADO </h1>
         ) : (
            <LandingPage />
         )}
        </>
    )
}

export default Home;