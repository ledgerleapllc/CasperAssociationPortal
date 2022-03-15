import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingScreen } from '../components/hoc/loading-screen';

const Landing = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/home');
    document.body.classList.add('bg-landing');
    return () => {
      document.body.classList.remove('bg-landing');
    };
  }, []);

  return (
    <div
      id="landing-page__home"
      className="text-white min-h-screen overflow-x-hidden landing-page"
    />
  );
};

export default LoadingScreen(Landing, 'public');
