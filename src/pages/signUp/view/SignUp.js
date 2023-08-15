import { styled } from 'styled-components';
import Form from '../../../common/components/Form';

export default function SignUp() {
  return (
    <Box>
      <Form />
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
