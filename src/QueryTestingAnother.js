import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';

export default function QueryTestingAnother() {
  const [status, setStatus] = useState(false);
  const {
    mutate: addCustomer,
    isLoading,
    isError,
    error,
  } = useMutation(async (hero) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { status } = await axios.post('http://localhost/my-app/src/backend/api/api.php', hero);

    setStatus(status);
  });

  const handleAdd = () => {
    const heroMero = {
      email: 'ajsdajsdj',
      first_name: 'sksk',
      last_name: 'aaa',
      password: '123123123',
    };

    addCustomer(heroMero);
  };
  return (
    <>
      <h2>Use mutation tests</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : status ? (
        <p>created new user</p>
      ) : null}
      <div>
        <button onClick={handleAdd}>Add a bitch</button>
      </div>
    </>
  );
}
