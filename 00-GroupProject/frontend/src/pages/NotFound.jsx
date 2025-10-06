import { Link, useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center'>
      <img src='/404.gif' alt='404 Not Found' className='w-64 h-64 mb-6' />
      <h1 className='text-4xl font-bold text-error mb-2'>Page Not Found</h1>
      <p className='text-lg text-base-content mb-6'>Sorry, the page you are looking for doesn't exist.</p>
      {/* <Link to='/' className='btn btn-primary'>
        Go Home
      </Link> */}
      <button type='button' className='btn btn-primary' onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
};

export default NotFound;
