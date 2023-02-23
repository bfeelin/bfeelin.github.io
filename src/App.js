import { Center, Text, Flex, Spinner } from '@chakra-ui/react';
import Leaderboard from './Leaderboard/Leaderboard';
import { useState, useEffect, useCallback } from 'react';
import data from './Leaderboard/data.json'

function App(  ) {
  console.log('app rendered')
  const [currentData, setCurrentData] = useState()
  const [status, setStatus] = useState()
  if(!currentData) setCurrentData(data)
  const FIVE_SECOND_MS = 5000;

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const interval = setInterval(() => {
        let chosenIndex = getRandomInt(currentData.length - 1)
        let newCurrentData = currentData.map((item, i) => {
          return chosenIndex === i ?
            {...item,
              dollarVolumeLifetime: item.dollarVolumeLifetime += 20000000,
              noFundedLifetime: item.noFundedLifetime += 5
            }
            :
            {...item}
        })
        setCurrentData([...newCurrentData])
        console.log(currentData)
    }, [FIVE_SECOND_MS]);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []) 

  return (
    <>
    {currentData &&
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
              <li>Status: {status}</li>
            </ul>
          </Text>
          <Leaderboard
              currentData={currentData}
              setStatus={setStatus}
            />
        </Flex>
      </>
    }
    </>
  );
}

export default App;
