import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

describe('Login component', () => {
    it('should render a login form', () => {
        const { getByTestId } = render(<Router>
            <Login />
        </Router>);
        expect(getByTestId('login-form')).toBeInTheDocument();
    });

    it('should render an email input field', () => {
        const { getByTestId } = render(<Router> <Login /></Router>);
        expect(getByTestId('email-input')).toBeInTheDocument();
    });

    it('should render a password input field', () => {
        const { getByPlaceholderText } = render(<Router> <Login /></Router>);
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('should allow users to enter their email and password', () => {
        const { getByTestId,getByPlaceholderText } = render(<Router> <Login /></Router>);
        const emailInput = getByTestId('email-input');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        expect(emailInput.value).toBe('test@example.com')
        expect(passwordInput.value).toBe('password');
    });
});
