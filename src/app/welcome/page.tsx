import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">Welcome to the Home Page!</h1>
      <p className="mt-4 text-lg">Click below to view products.</p>
      <Link href="/products" className="bg-blue-500 text-white p-4 rounded-lg mt-8 inline-block hover:bg-blue-700">
        Go to Products
      </Link>
    </div>
  );
};

export default HomePage;
