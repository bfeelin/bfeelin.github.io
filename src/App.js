import { Center } from '@chakra-ui/react';
import Leaderboard from './Leaderboard/Leaderboard';
import { useState, useEffect, useCallback } from 'react';
import data from './Leaderboard/data.json'

function App(  ) {
  console.log('app rendered')
  return (
    <>
    {data &&
      <>
      <Center>
        <Leaderboard
            initialData={data}
          />
      </Center>
      </>
    }
    </>
  );
}

export default App;
