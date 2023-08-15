import { useState } from 'react';
import { styled } from 'styled-components';
import { postData } from '../apis/api/defaultApi';
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const path = window.location.pathname;

  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    const res = await postData(
      `/auth/${path === '/signup' ? 'signup' : 'signin'}`,
      {
        email: email,
        password: password,
      },
    );

    if (path === '/signup' && res.status === 201) {
      navigate('/signin');
    }

    if (path === '/signin' && res.status === 200) {
      navigate('/todo');
    }
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
        data-testid={path === '/signup' ? 'signup-button' : 'signin-button'}
        disabled={!isButtonEnabled}
        onClick={handleSubmit}
      >
        {path === '/signup' ? '회원가입' : '로그인'}
      </button>
      <a href={path === '/signup' ? '/signin' : '/signup'}>
        {path === '/signup' ? '로그인 하기' : '회원가입 하기'}
      </a>
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
