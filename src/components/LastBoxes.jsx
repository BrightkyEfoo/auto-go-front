import { HStack, Icon, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { AiFillFileText, AiFillSetting } from 'react-icons/ai';
import { BiSync } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Thumbs, Autoplay } from 'swiper';
import './style2.css';
SwiperCore.use([Navigation, Pagination, Thumbs, Autoplay]);

const LastBoxes = () => {
  const [max520] = useMediaQuery('(max-width : 520px)');

  if (max520) {
    return (
      <Swiper
        id="lastBoxesSwiper"
        spaceBetween={20}
        pagination
        navigation
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
      >
        {[
          <SwiperSlide className="swiperSlideLastBoxes">
            <VStack flex={1} borderWidth={1} rounded="lg" p={6} bgColor="white" fontSize={16} h={231} >
              <Icon
                as={AiFillSetting}
                color="white"
                bgColor="blue.400"
                p={4}
                fontSize={85}
                borderRadius="50%"
              />
              <Text fontSize={30} color="blue.400">
                WINGO Build
              </Text>
              <Text>Suivez notre formation</Text>
            </VStack>
          </SwiperSlide>,
          <SwiperSlide className="swiperSlideLastBoxes">
            <VStack flex={1} borderWidth={1} rounded="lg" p={6} bgColor="white" h={231}>
              <Icon
                as={AiFillFileText}
                color="white"
                bgColor="black"
                p={4}
                fontSize={90}
                borderRadius="50%"
              />
              <Text fontSize={28}>WINGO Supports</Text>
              <Text>Suivez notre formation</Text>
            </VStack>
          </SwiperSlide>,
          <SwiperSlide className="swiperSlideLastBoxes">
            <VStack flex={1} borderWidth={1} rounded="lg" p={6} bgColor="white" h={231}>
              <Icon
                as={BiSync}
                color="white"
                bgColor="orange.300"
                p={4}
                fontSize={90}
                borderRadius="50%"
              />
              <Text fontSize={30} color="orange.300">
                WINGO Services
              </Text>
              <Text>Suivez notre formation</Text>
            </VStack>
          </SwiperSlide>,
        ]}
      </Swiper>
    );
  } else {
    return (
      <HStack w="75%" spacing={10}>
        <VStack flex={1} borderWidth={1} rounded="lg" p={6} bgColor="white">
          <Icon
            as={AiFillSetting}
            color="white"
            bgColor="blue.400"
            p={4}
            fontSize={90}
            borderRadius="50%"
          />
          <Text fontSize={30} color="blue.400">
            WINGO Build
          </Text>
          <Text>Suivez notre formation</Text>
        </VStack>
        <VStack flex={1} borderWidth={1} rounded="lg" p={6} bgColor="white">
          <Icon
            as={AiFillFileText}
            color="white"
            bgColor="black"
            p={4}
            fontSize={100}
            borderRadius="50%"
          />
          <Text fontSize={40}>WINGO Supports</Text>
          <Text>Suivez notre formation</Text>
        </VStack>
        <VStack flex={1} borderWidth={1} rounded="lg" p={6} bgColor="white">
          <Icon
            as={BiSync}
            color="white"
            bgColor="orange.300"
            p={4}
            fontSize={90}
            borderRadius="50%"
          />
          <Text fontSize={30} color="orange.300">
            WINGO Services
          </Text>
          <Text>Suivez notre formation</Text>
        </VStack>
      </HStack>
    );
  }
};

export default LastBoxes;
