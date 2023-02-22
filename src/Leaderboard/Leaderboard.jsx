import React, { useEffect, useState, useReducer, useCallback } from 'react'
import { Table, Thead, Tbody, Tr, Th, Text, Flex, Avatar, Center, TagRightIcon, VStack, Heading, Select, Button, Tag, Stack, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody, DrawerFooter } from '@chakra-ui/react'
import { FiArrowDown, FiCheckCircle, FiChevronDown, FiCircle, FiCornerDownRight, FiRefreshCcw } from 'react-icons/fi'
import { Reorder } from "framer-motion";
import { Progress } from '@chakra-ui/react'
import LeaderboardEntry from './LeaderboardEntry'


export default function Leaderboard( { limit, initTimeline, initProperty, allData, dataUpdated, initData } ){
    console.log('Leaderboard rendered')
    const [timeline, setTimeline] = useState(initTimeline ? initTimeline : 'Lifetime')
    const [property, setProperty] = useState(initProperty ? initProperty : 'dollarVolume')
    const [sortedData, setSortedData] = useState(initData ? initData : null)
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [data, setData] = useState(allData)

    const FIVE_SECOND_MS = 5000;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    useEffect(() => {
      const interval = setInterval(() => {
          incrementData()
      }, FIVE_SECOND_MS);
  
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
      }, [])
  
      const incrementData = () => {
        let chosenIndex = getRandomInt(data.length - 1)
        let chosen = {...data[chosenIndex]}
        chosen.dollarVolumeLifetime += 20000000
        chosen.noFundedLifetime += 10
        let newData = [...data]
        newData[chosenIndex] = chosen
        setData([...newData])
      }

     useEffect(() => {
        console.log('sorting')
        if(property == 'Funded'){
            sortArrayByProperty('noFundedLifetime')
        }
        else sortArrayByProperty('dollarVolumeLifetime')
     }, [property, data])

    const sortArrayByProperty = (prop) => {
        setSortedData([...data].sort((a,b) => b[`${prop}`] - a[`${prop}`]))
        console.log(sortedData)
    }
    
      return (
            <>   
       
            <Flex p={3} flexDir={'column'} w='250px'>
                {sortedData && 
                <>
                <Center>
                <Heading mb={5} as='em' size='md'>
                    <Flex flexDir={'column'}>
                        <Center>
                            <Flex mb={3} alignItems='center' flexDir='column'>
                                <Progress mt='2px' width='100%' height={'2px'} colorScheme={'red'} size='xs' isIndeterminate />
                            </Flex>
                        </Center>
                    </Flex>
                </Heading>
                </Center>
                {allData &&
                <Flex mb={2} justify={'space-between'} flexDir='row'>
                    <Button p={0} variant={'ghost'} size='xs' onClick={() => setProperty('dollarVolume')}>
                        <Tag 
                            borderRadius={'3xl'} 
                            m={2}
                            fontSize='xs'
                            fontWeight={property == 'dollarVolume' ? 'bold' : 'normal'} 
                            variant={property == 'dollarVolume' ? 'solid' : 'subtle'}
                            >
                                Amount
                            {property == 'dollarVolume' && <TagRightIcon as={FiChevronDown}/> }
                        </Tag>
                    </Button>
                    <Button p={0} variant={'ghost'} size='xs' onClick={() => setProperty('Funded')}>
                        <Tag 
                            borderRadius={'3xl'} 
                            m={2}
                            fontSize='xs'
                            fontWeight={property == 'Funded' ? 'bold' : 'normal'} 
                            variant={property == 'Funded' ? 'solid' : 'subtle'}
                            >
                                Quantity
                            {property == 'Funded' && <TagRightIcon as={FiChevronDown}/> }
                        </Tag>
                    </Button>
                
                </Flex>}
                <Flex p={2}>
                    <Reorder.Group as='div' draggable={false} dragControls={false} dragListener={false} axis='y' values={sortedData}>
                        {sortedData.map((row, i) => {
                            if(!limit || i < limit){
                                return(
                                    <Reorder.Item 
                                        as='div' 
                                        key={`${row.LO.Name}`} 
                                        dragListener={false}
                                        draggable={false} 
                                        value={row}>
                                        <LeaderboardEntry key={`${row.LO.Name}`} row={row} property={property} timeline={timeline} />
                                    </Reorder.Item>
                                )
                            }
                        })}   
                    </Reorder.Group>
                </Flex>
                </>
                }

            </Flex>

            </>

      )
}
 