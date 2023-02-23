import { Center, Text, Flex } from '@chakra-ui/react';
import Leaderboard from './Leaderboard/Leaderboard';
import { useState, useEffect, useCallback } from 'react';
import data from './Leaderboard/data.json'

function App(  ) {
  console.log('app rendered')
  return (
    <>
    {data &&
      <>
        <Flex flexDir={'row'} justify='space-evenly'>
          <Text mt='auto' mb='auto' maxW='350px' justify='center'>
            <ul>
              <li>
                  This purpose of this leaderboard is to give recognition and visiblity to salespeople 
              </li>
              <li>
               <a href='https://www.npmjs.com/package/framer-motion'>framer-motion</a> and <a href='https://www.npmjs.com/package/react-countup'>react-countup</a> were used
              to animate the leaderboard after a new sale was made
              </li>
              <li>This demo increments a random persons data every 5 seconds to simulate a sale</li>
            </ul>
          </Text>
          <Leaderboard
              initialData={data}
            />
        </Flex>
      </>
    }
    </>
  );
}

export default App;
