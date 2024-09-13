import React, { useState, useContext } from 'react';
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
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Alert from '@mui/material/Alert';
import Copyright from '../Copyright';
import { AuthService } from '../../api/service/AuthService';
import { AuthContext } from '../../context/AuthContext';
import CircularIndeterminate from '../../components/CircularIndeterminate';

const defaultTheme = createTheme();

export default function Login() {
  const [state, setState] = React.useReducer((s, a) => ({ ...s, ...a }), {
    loading: false,
    error: null,
  });

  const { dispatchUser }: any = useContext(AuthContext);
  const [auth, setAuth] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [formValid, setformValid] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setSuccess(false);
    event.preventDefault();
    try {
      if (formValid) {
        setState({ loading: true, error: null });
        const response = await AuthService.login(auth);

        if (response.success) {
          setSuccess(true);
          sessionStorage.setItem(
            'user-security',
            JSON.stringify({ ...response.data, loggedIn: true })
          );
          const accessToken = response?.data?.token;
          const payloadDecoded = jwtDecode(accessToken);
          dispatchUser({ type: 'login', payload: payloadDecoded });
          setState({ loading: false, error: null });
          // navigate("/dashboard");
        }
      } else {
        setMessage('Verifique las alertas');
      }
    } catch (err) {
      if (!err?.response) {
        setMessage('No Server Response');
      } else if (err.response?.status === 400) {
        setMessage('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setMessage('Unauthorized');
        dispatchUser({ type: 'logout' });
      } else {
        setMessage('Login Failed');
      }
      setState({ loading: false, error: true });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  const validateInputs = () => {
    const password = document.getElementById('password') as HTMLInputElement;
    const username = document.getElementById('username') as HTMLInputElement;

    setformValid(true);
    setUsernameError(false);
    setPasswordError(false);
    setUsernameErrorMessage('');
    setPasswordErrorMessage('');

    if (!username.value || username.value.length < 6) {
      setUsernameError(true);
      setUsernameErrorMessage('Por favor, introduce un usuario valido.');
      setformValid(false);
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('La contraseña debe tener al menos 6 caracteres');
      setformValid(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {state.error ? (
        <Alert role="alert-error" severity="error">
          {message}
        </Alert>
      ) : null}
      {success ? (
        <Alert role="alert-success" severity="success">
          Usuario logeado de forma correcta
        </Alert>
      ) : null}
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
            {success ? <VerifiedUserIcon /> : <LockOutlinedIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
            {state.loading ? <CircularIndeterminate /> : 'Login'}
          </Typography>
          <Box
            id="SignInForm"
            name="SignInForm"
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(envelope) => handleChange(envelope)}
              error={usernameError}
              helperText={usernameErrorMessage}
              color={usernameError ? 'error' : 'primary'}
              data-testid="login-usuario-text"
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
              onChange={(envelope) => handleChange(envelope)}
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? 'error' : 'primary'}
              data-testid="login-clave-text"
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
              onClick={validateInputs}
            >
              Ingresar
            </Button>
            <Grid container alignItems="center" justify="center">
              <Grid item xs="auto">
                <Link href="/recovery" variant="body2">
                  ¿Olvidaste tu usuario y clave?
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
