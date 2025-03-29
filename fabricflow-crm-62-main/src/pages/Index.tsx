
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-tailoring-50 dark:bg-tailoring-950">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-10">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
