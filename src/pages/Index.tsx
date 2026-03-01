// Update this page (the content is just a fallback if you fail to update the page)
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Beacon</h1>
        <Link to="/dashboard" className="text-primary underline">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default Index;
