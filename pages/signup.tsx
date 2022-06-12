/* Next */
import type { NextPage } from 'next';
import Router from 'next/router';

/* React */
import { useState } from 'react';

/* Framework Material-UI */
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

import axios from 'axios';
import { Password } from '../components/signup/password';
import { RePassword } from '../components/signup/rePassword';
import api from '../services/api';

type State = {
    showPassword: boolean;
    password: string;
}
  
const Signup: NextPage = () => {

    const [userName, setUserName] = useState<string>('');

    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false,
    });
    const [values2, setValues2] = useState<State>({
        password: '',
        showPassword: false,
    });
    
    /**-----------------------------------------------------------------------------**/

    function onChangeUserName(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUserName(e.target.value);
    }

    async function signup () {
        
        await api.post('/users/create', {
            username: userName,
            password: values.password,
        }, {
            headers: {"Access-Control-Allow-Origin": "*"} 
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
       // Router.push('/login');
    }

    /**-----------------------------------------------------------------------------**/
    return (
        <div className="main-signup">
            <div className="box-content">
              <div className="heading">
                <header></header>
                <img 
                  src="/assets/img/user.png" 
                  alt="user" 
                />
              </div>
                <div className="form"> 
                 <form>
                    <div className="field-username">
                        <InputLabel
                            htmlFor="username"
                            sx={{ fontWeight: "bold" }}
                        >
                            Username
                        </InputLabel>
                        <TextField 
                           id="outlined-basic" 
                           variant="outlined"
                           sx={{
                             width: "90%",
                             height:"30px"
                           }}
                           value={userName}
                           onChange={(e) => onChangeUserName(e)}
                        />
                    </div>
                    <Password 
                       values={values} 
                       setValues={setValues}
                    />
                    <RePassword
                       values={values2}
                       setValues={setValues2}            
                    />
                    <div className="button"> 
                        <Button
                          sx={{
                            width: "15.2rem",
                            height: "55px",
                            background: "#602f68",
                            color: "white",
                            border: "1px solid #4c0f5c",
                            transition: "all .5s ease-in-out",
                            mt:"0.8rem",
                            '&:hover': {
                                color: "white",
                                background: "#874191"
                            },
                          }}
                          onClick={() => signup()}
                          variant="outlined"
                        >
                         SIGN UP 
                        </Button>
                    </div>
                 </form>
                </div>
            </div>
            <div className="group-images">
                <img 
                  className="package-img" 
                  src="/assets/img/package.png" 
                />
                <img 
                  className="discount-img" 
                  src="/assets/img/discount.png" 
                />
            </div>
        </div>
    )
}

export default Signup;