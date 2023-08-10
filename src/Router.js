import { Route, Routes } from 'react-router-dom';
import Todo from './pages/todo/view/Todo';
import SignUp from './pages/signUp/view/SignUp';
import SignIn from './pages/signIn/view/SignIn';

export default function Router() {
  return (
    <Routes>
      <Route path="/todo" element={<Todo />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}
