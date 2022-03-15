import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const DonatePage = () => {
  const router = useHistory();
  useEffect(() => {
    router.push('/home');
  }, []);

  return <div className="flex flex-col" />;
};

export default DonatePage;
