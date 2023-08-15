import { useEffect } from 'react';
import { getData } from '../../../common/apis/api/defaultApi';

export default function TodoProvider(props) {
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData('/todos');
      props.setTodos(res.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props.children;
}
