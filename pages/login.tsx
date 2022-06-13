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
import Link from '@mui/material/Link';

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
        <div className="main-login">
            <div className="box-content">
              <div className="heading">
                <header></header>
                <h1>Login</h1>
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
                                width: "90%",
                            }}
                        />
                    </div>
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
                        variant="outlined"
                        >
                         Log in
                        </Button>
                    </div>
                 </form>

                 <div className="signup-field">
                    If you don't have account,<Link href="/signup">
                                                create your user.
                                              </Link>
                 </div>
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

export default Login;