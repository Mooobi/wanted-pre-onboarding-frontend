import { styled } from 'styled-components';
import Router from './Router';
import { GlobalStyle } from './common/styles';
import AuthGuard from './common/components/AuthGuard';

export default function App() {
  return (
    <>
      <AuthGuard>
        <GlobalStyle />
        <Wrapper>
          <Router />
        </Wrapper>
      </AuthGuard>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
