import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';
import React from 'react';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText, debug } = render(<SignInContainer onSubmit={onSubmit} />);
      // render the SignInContainer component, fill the text inputs and press the submit button

      fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password');
      fireEvent.press(getByText('Submit'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
    });
  });
});