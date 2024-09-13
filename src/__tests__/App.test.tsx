import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthContext } from '../context/AuthContext';
import Recovery from '../pages/auth/Recovery';

describe('App', () => {
  it('Router to Login', () => {
    render(<App />);
    expect(screen.getByText(/Login/i));
  });

  it('Render to Login with provider', async () => {
    render(<App />);
    expect(screen.getByText(/Login/i));
  });

  it('Router to Recovery', () => {
    render(<Recovery />);
    expect(screen.getByRole('heading', { name: /recuperar accesos/i }));
  });
});
