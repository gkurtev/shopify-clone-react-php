import axios from 'axios';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const API_POKEMON = 'https://pokeapi.co/api/v2/pokemon/';
const queryClient = new QueryClient();

export default function QueryTesting() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchBox />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

function SearchBox() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <div className='search-results mb-5 text-center'>
        <Pokemon pokemon={searchQuery} />
      </div>

      <div className='search-actions'>
        <div className='pt-2 relative mx-auto text-gray-600 max-w-fit'>
          <input
            className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
            type='search'
            name='search'
            value={searchQuery}
            placeholder='Search'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function Pokemon({ pokemon }) {
  const queryInfo = useQuery(pokemon, async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios.get(API_POKEMON + pokemon).then((res) => res.data);
  });

  return queryInfo.isLoading ? (
    <p>Loading...</p>
  ) : queryInfo.isError ? (
    <p>{queryInfo.error.message}</p>
  ) : (
    <div>
      {queryInfo.data?.sprites?.front_default ? (
        <figure className='flex justify-center'>
          <img
            width='140'
            height='140'
            src={queryInfo.data?.sprites?.front_default}
            alt='pokemon'
          />
        </figure>
      ) : (
        <p>Pokemon not found</p>
      )}
      <br />
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  );
}
