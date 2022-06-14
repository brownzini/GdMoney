/* Next */
import Router from 'next/router';
import type { NextPage } from 'next'

// Nookies
import { useEffect } from 'react';

//Contexts
import { useSessions } from '../context/sessions';

//Globals
import session from '../global/session';

//Components page
import Dashboard from '../components/page/dashboard';
import { SettingsRemoteOutlined } from '@mui/icons-material';

const Home: NextPage = () => { 
    const { token, setToken } = useSessions();

    useEffect(() => {
        setToken(session.token);
    //    console.clear();
        setTimeout(() => { 
         //   (session.token === null) && Router.push('/landingpage');
        },2000);
    },[]);

    return (   
        <Dashboard />
    )
}

export default Home;