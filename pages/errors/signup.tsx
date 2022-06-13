/* Next */
import type { NextPage } from 'next';
import Router from 'next/router';

/* React */
import { useEffect } from 'react';

const Signup: NextPage = () => {
    useEffect(() => { 
        setTimeout(() => {
            Router.push('/signup');
        }, 2000)
    }, []);

    return (
        <>
           <h1> Error: Error creating user try again - Type: Create User </h1>
        </>
    )
}

export default Signup;