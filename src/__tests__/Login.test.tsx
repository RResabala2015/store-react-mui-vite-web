import { describe } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('Login Component', () => {
  test('Router to Login', () => {
    render(<App />);
    expect(screen.getByText(/Login/i));
  });

  test('Valid the inputs and prevents sending when they are invalid', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    expect(screen.getByText(/por favor, introduce un usuario valido/i));
    expect(screen.getByText(/la contraseña debe tener al menos 6 caracteres/i));
  });

  test('You must allow the user to log in with the correct credentials.', async () => {
    render(<App />);
    window.sessionStorage.setItem('user-security', '');
    const user = import.meta.env.VITE_APP_TEST_USER;
    const pass = import.meta.env.VITE_APP_TEST_PASSWORD;
    fireEvent.change(screen.getByLabelText(/usuario/i), {
      target: { value: user },
    });

    fireEvent.change(screen.getByLabelText(/clave/i), {
      target: { value: pass },
    });

    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    expect(window.sessionStorage.getItem('user-security')).not.toBeNull();
  });

  test('No debe permitir que el usuario inicie sesión con credenciales incorrectas', async () => {
    render(<App />);
    window.sessionStorage.setItem('user-security', '');

    fireEvent.change(screen.getByLabelText(/usuario/i), {
      target: { value: 'usernameFake' },
    });

    fireEvent.change(screen.getByLabelText(/clave/i), {
      target: { value: 'passwordFake' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    expect(window.sessionStorage.getItem('user-security')).toBe('');
  });
});
