/* Next */
import type { NextPage } from 'next';
import Router from 'next/router';

/* React */
import { useEffect } from 'react';

const Login: NextPage = () => {
    useEffect(() => { 
        setTimeout(() => {
            Router.push('/login');
        }, 2000)
    }, []);

    return (
        <>
           <h1> Error: Error log in, try again - Type: Login </h1>
        </>
    )
}

export default Login;