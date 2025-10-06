import { useEffect } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router';

export default function ProtectedLayout() {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return <Outlet />;
}
