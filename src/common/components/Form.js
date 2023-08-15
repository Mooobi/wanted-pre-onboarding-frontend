import { useState } from 'react';
import { styled } from 'styled-components';
import { postData } from '../apis/api/defaultApi';

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    updateButtonState(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    updateButtonState(email, e.target.value);
  };

  const updateButtonState = (newEmail, newPassword) => {
    const isValidEmail = newEmail.includes('@');
    const isValidPassword = newPassword.length >= 8;
    setIsButtonEnabled(isValidEmail && isValidPassword);
  };

  const handleSignup = () => {
    postData('/auth/signup', { email: email, password: password });
  };

  return (
    <Wrapper>
      <label htmlFor='email'>Email</label>
      <input
        data-testid='email-input'
        id='email'
        value={email}
        onChange={handleEmailChange}
      />
      <label htmlFor='password'>Password</label>
      <input
        data-testid='password-input'
        id='password'
        type='password'
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        data-testid='signup-button'
        disabled={!isButtonEnabled}
        onClick={handleSignup}
      >
        회원가입
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  > label {
    width: 100%;
    text-align: start;
  }

  > input {
    margin-bottom: 2rem;
  }

  > button:disabled {
    cursor: default;
  }
`;
