/* Next */
import type { NextPage } from 'next';

/* React */
import { useState } from 'react';

/* Framework Material-UI */
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type State = {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}
  
const Login: NextPage = () => {
    const [values, setValues] = useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange =
      (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
      };
  
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    return (
        <div className="main">
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
                             ml:"0.8rem",
                             height:"30px"
                         }}
                        />
                    </div>
                    <div className="field-password">
                        <InputLabel 
                            htmlFor="outlined-adornment-password"
                            sx={{ fontWeight: "bold" }}
                        >
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            sx={{
                                width: "77%",
                                ml:"0.8rem"
                            }}
                        />
                    </div>
                    <div className="button"> 
                        <Button
                    
                        sx={{
                            background: "#602f68",
                            border: "1px solid #4c0f5c",
                            color: "white",
                            height: "55px",
                            width: "13rem",
                        }}
                        variant="outlined"
                        >
                        Log in
                        </Button>
                    </div>
                 </form>
                </div>
            </div>
        </div>
    )
}

export default Login;