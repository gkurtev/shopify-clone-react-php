import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './features/authUserSlice';
import { useCookiesGetDelete } from './hooks/hooks';

export default function Account() {
  const navigate = useNavigate();
  const [customerCookie, setCustomerCookie] = useCookiesGetDelete('user_session');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!customerCookie) {
      navigate('/login', { replace: true });
    }
  });

  const handleLogout = (e) => {
    e.preventDefault();
    setCustomerCookie(false);
    dispatch(logout());
  };

  const renderContent = () => {
    return (
      <div>
        <h1>
          Welcome {customerCookie.first_name} {customerCookie.last_name}
        </h1>

        <p>your email address is {customerCookie.email}</p>

        <div>
          <a href='/logout' onClick={(e) => handleLogout(e)}>
            Logout
          </a>
        </div>
      </div>
    );
  };

  return <>{customerCookie && renderContent()}</>;
}
