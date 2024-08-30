import React, { useRef, useState, useEffect, useContext } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Copyright';
import { AuthService } from "../api/service/AuthService";
import { AuthContext } from "../app/views/store/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

  
export default function SignIn() {

  const { dispatchUser } : any = useContext(AuthContext);
  const [ auth, setAuth ] = useState({username:'', password:''});
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
 ////   userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const response = await AuthService.login(auth);
      console.log(response)
      if(response.success){
        sessionStorage.setItem('user', JSON.stringify({...response.data, loggedIn:true}));  
        dispatchUser({type:'login', payload:response.data}); 
        navigate("/dashboard");
        console.log("Usuario logeado");
      }
      const accessToken = response?.data?.token;
      const user = response?.data?.username;
      //console.log(accessToken);
      //console.log(response?.data?.username)
      //const roles = response?.data?.role;

      setAuth({ user, pwd, accessToken });
      setUser("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        //setErrMsg("No Server Response");
        console.log("No Server Response");
      } else if (err.response?.status === 400) {
        //setErrMsg("Missing Username or Password");
        console.log("Missing Username or Password");
      } else if (err.response?.status === 401) {
        //setErrMsg("Unauthorized");
        console.log("Unauthorized");
      } else {
        //console.log("Login Failed");
        setErrMsg("Login Failed");
      }
      ////errRef.current.focus();
    }

  };

  const handleChange = (e:React.ChangeEvent<HTMLFormElement | HTMLInputElement>) => {
    setAuth({
      ...auth,
      [e.target.name]:e.target.value
    })
}
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={ envelope => handleChange(envelope) }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Clave"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ envelope => handleChange(envelope) }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container
                  alignItems='center'
                  justify='center'>
              <Grid item xs='auto'>
                <Link href="/recovery" variant="body2">
                  {"¿Olvidaste tu usuario y clave?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}