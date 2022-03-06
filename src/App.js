import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './Home';
import Login from './Login';
import RegisterForm from './RegisterForm';
import ResetPassword from './ResetPassword';
import { QueryClient, QueryClientProvider } from 'react-query';
import Account from './Account';
import Tests from './Tests';
import ConfirmPasswordReset from './ConfirmPasswordReset';
import MiniCart from './MiniCart';
import Header from './Header';
import { Provider } from 'react-redux';
import store from './app/store';
import AdminPage from './AdminPage';
import CreateProduct from './CreateProduct';

const queryClient = new QueryClient();
function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />

          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<RegisterForm title='Register' />} />
              <Route path='/login' element={<Login />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/account' element={<Account />} />
              <Route path='/tests' element={<Tests />} />
              <Route path='/confirm-password-reset' element={<ConfirmPasswordReset />} />
              <Route path='/admin' element={<AdminPage />} />
              <Route path='/create-product' element={<CreateProduct />} />
            </Routes>
          </div>

          <MiniCart />
        </Router>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
