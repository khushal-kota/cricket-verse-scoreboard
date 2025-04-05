
import { Navigate } from 'react-router-dom';

// This component is redirecting to the Home page
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
