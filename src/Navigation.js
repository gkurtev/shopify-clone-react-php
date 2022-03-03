import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const logged = useSelector((state) => state.authUser.isAuthenticated);

  return (
    <nav className='nav'>
      <ul className='flex -m-2'>
        <li className='p-2'>
          <NavLink to='/' className={({ isActive }) => (isActive ? 'underline' : '')}>
            Homepage
          </NavLink>
        </li>

        <li className='p-2'>
          <NavLink className={({ isActive }) => (isActive ? 'underline' : '')} to='/tests'>
            Tests
          </NavLink>
        </li>

        <li className='p-2'>
          <NavLink className={({ isActive }) => (isActive ? 'underline' : '')} to='/admin'>
            Admin
          </NavLink>
        </li>

        {logged ? (
          <li className='p-2'>
            <NavLink className={({ isActive }) => (isActive ? 'underline' : '')} to='/account'>
              My Account
            </NavLink>
          </li>
        ) : (
          <>
            {' '}
            <li className='p-2'>
              <NavLink className={({ isActive }) => (isActive ? 'underline' : '')} to='/login'>
                Login
              </NavLink>
            </li>
            <li className='p-2'>
              <NavLink className={({ isActive }) => (isActive ? 'underline' : '')} to='/register'>
                Register
              </NavLink>
            </li>{' '}
          </>
        )}
      </ul>
    </nav>
  );
}
