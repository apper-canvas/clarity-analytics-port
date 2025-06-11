import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundContent from '@/components/organisms/NotFoundContent';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <NotFoundContent
      onGoToDashboard={handleGoToDashboard}
      onGoBack={handleGoBack}
    />
  );
};

export default NotFoundPage;