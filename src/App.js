import { styled } from 'styled-components';
import Router from './Router';
import { GlobalStyle } from './common/styles';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Router />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
