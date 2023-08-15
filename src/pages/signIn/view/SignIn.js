import { styled } from 'styled-components';
import Form from '../../../common/components/Form';
import AuthProvider from '../../../common/components/AuthProvider';

export default function SignIn() {
  return (
    <Box>
      <AuthProvider>
        <Form />
      </AuthProvider>
    </Box>
  );
}

const Box = styled.section`
  border: 1px solid #cccccc;
  border-radius: 1rem;
  width: 15rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
