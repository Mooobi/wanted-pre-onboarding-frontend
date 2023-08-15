import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthGuard(props) {
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token');
  const path = window.location.pathname;

  useEffect(() => {
    if ((path === '/signup' || path === '/signin') && access_token) {
      navigate('/todo');
    }

    if (path === '/todo' && !access_token) {
      navigate('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, access_token]);

  return props.children;
}
