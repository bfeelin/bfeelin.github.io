import React, { useEffect, useState, useReducer, useCallback } from 'react'
import { Table, Thead, Tbody, Tr, Th, Text, Flex, Avatar, Center, TagRightIcon, VStack, Heading, Select, Button, Tag, Stack, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody, DrawerFooter } from '@chakra-ui/react'
import { FiArrowDown, FiCheckCircle, FiChevronDown, FiCircle, FiCornerDownRight, FiRefreshCcw } from 'react-icons/fi'
import { Reorder } from "framer-motion";
import { Progress } from '@chakra-ui/react'
import LeaderboardEntry from './LeaderboardEntry'

const delay = ms => new Promise(res => setTimeout(res, ms));

// Initial data is read from data.json
// Every 5 seconds, a random entry is selected and its values are incremented
// When this interval runs, I think the data is set to the intial data again? The component rerenders
// This causes the person who previously was incremented to return to their original position
export default function Leaderboard( { initTimeline, initProperty, currentData } ){
    console.log('Leaderboard rendered')
    const [timeline, setTimeline] = useState(initTimeline ? initTimeline : 'Lifetime')
    const [property, setProperty] = useState(initProperty ? initProperty : 'dollarVolume')
    const [sortedData, setSortedData] = useState()

     useEffect(() => {
         console.log('sorting')
         const sortData = () => {
            if(currentData){
                if(property == 'Funded'){
                    setSortedData(sortArrayByProperty('noFundedLifetime'))
                }
                else setSortedData(sortArrayByProperty('dollarVolumeLifetime'))
             }
         }
         sortData()
     }, [property, currentData])

    const sortArrayByProperty = (prop) => {
        return [...currentData].sort((a,b) => b[`${prop}`] - a[`${prop}`])
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
                {sortedData &&
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
                        {sortedData.map((row) => {
                            return(
                                <Reorder.Item 
                                    as='div' 
                                    key={`${row.LO.Name}`} 
                                    dragListener={false}
                                    draggable={false} 
                                    value={row}>
                                    <LeaderboardEntry 
                                        key={`${row.LO.Name}`} 
                                        row={row} 
                                        property={property} 
                                        timeline={timeline}/>
                                </Reorder.Item>
                            )
                        })}   
                    </Reorder.Group>
                </Flex>
                </>
                }

            </Flex>

            </>

      )
}
 