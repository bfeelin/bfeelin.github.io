import { Center } from '@chakra-ui/react';
import Leaderboard from './Leaderboard/Leaderboard';
import { useState, useEffect, useCallback } from 'react';

function App( { data } ) {
  console.log('app rendered')
  return (
    <>
    {data &&
      <>
      <Center>
        <Leaderboard
            allData={data}
          />
      </Center>
      </>
    }
    </>
  );
}

export default App;
