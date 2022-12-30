import { Box, Button, Flex, Heading, HStack, Icon, Image, Select, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Thumbs, Autoplay } from 'swiper';
import './swiper-bundle.css';
import './style.css';
import Advantages from './Advantages';
import { typeCarDesc, homeSwiperSlides, TopCardMobileHomeFirstText } from '../Data';
import { fondNoir, mainBoxesStyle, SlideBoxContainerStyle } from '../style';
import Footer from './Footer';
import TopCardMobileHome from './TopCardMobileHome';
import Tarifs from './Tarifs';
import SuperFastSuperEasy from './SuperFastSuperEasy';
import LastBoxes from './LastBoxes';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import { useDispatch } from 'react-redux';

SwiperCore.use([Navigation, Pagination, Thumbs, Autoplay]);


const Main = () => {
  const dispatch = useDispatch()
  const [selected, setSelected] = useState(1);
  const [max520] = useMediaQuery('(max-width: 520px)');
  // for categories of car
  let t = typeCarDesc.map(element => element.catergorie);

  let a = [];
  t.forEach(element => {
    if (max520) {
      a.push(<option value={t.indexOf(element) + 1}>Categorie {element}</option>);
    } else {
      a.push(
        <Flex
        fontSize={14}
          justify="center"
          key={t.indexOf(element)}
          align="center"
          cursor="pointer"
          onClick={() => setSelected(t.indexOf(element) + 1)}
          borderBottomWidth={selected === t.indexOf(element) + 1 ? 4 : 2}
          borderBottomColor={selected === t.indexOf(element) + 1 ? 'blue.500' : 'black'}
          color={selected === t.indexOf(element) + 1 ? 'white' : 'black'}
          bgColor={selected === t.indexOf(element) + 1 ? 'black' : 'transparent'}
          p={2}
        >
          Categorie {element}
        </Flex>
      );
    }
  });
  //end of car categories reddy for rendering

  //for main slider
  let mainSlides = homeSwiperSlides.map(element => {
    return (
      <SwiperSlide key={'s' + homeSwiperSlides.indexOf(element)}>
        <Flex {...SlideBoxContainerStyle}>
          <Text m={0} p={0} fontSize={70} fontWeight={600} color="blue.500">
            {element.title}
          </Text>
        </Flex>
        <Advantages
          botom={
            element.hstack ? (
              <HStack zIndex={5} fontSize={12} bg='white'>
                {element.botom.map(e => (
                  <a href={e.route} target="_blank" rel="noreferrer">
                    <Icon {...e} key={'si' + element.botom.indexOf(e)} />
                  </a>
                ))}
              </HStack>
            ) : null
            // <Icon {...element.botom} />
          }
          iconeColor={element.iconeColor}
          iconeBg={element.iconeBg}
          icone={element.icone}
          titre={element.title}
          preview={element.preview}
        />
      </SwiperSlide>
    );
  });
  const handleChange = e => {
    setSelected(e.target.value);
  };


  useEffect(() => {
    dispatch(loadingActions.set(false))
  }, [dispatch])
  
  return (
    <Flex direction="column" {...mainBoxesStyle('full')}>
      <Box bgColor="blue.500" pt={25} pb={5} mb={30}>
        <Heading as="h1" fontSize={max520 ? 38 : 50}>
          Bienvenue chez <span id="firstSpan">AUTO</span>
          <span id="secondSpan">GO</span>
        </Heading>
        <Swiper
          spaceBetween={20}
          pagination
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {mainSlides}
        </Swiper>
      </Box>
      {max520 ? (
        <>
          <TopCardMobileHome texte={TopCardMobileHomeFirstText} titre="Pourquoi avoir un permis" />
          <TopCardMobileHome texte={TopCardMobileHomeFirstText} titre="Pourquoi avoir un permis" />
        </>
      ) : (
        <VStack position="relative" align="center" w="100vw" justify="center" mb={10} p={4}>
          <Box w="100vw" bgColor="blue.500" h={300} position="absolute" top={-20} left={0} zIndex={-1} />
          <HStack zIndex={2} spacing={15} maxW={700}fontSize={14} >
            <VStack
              flex={1}
              boxShadow="0 4px 15px 1px rgba(0,0,0,0.7)"
              p={3}
              h='450px'
              bgColor="#3182ce"
              bg="linear-gradient(180deg, #3182ce 25%, rgba(252,252,252,1) 75%)"
            >
              <Heading fontSize='27px' textAlign="center" color="white">
                Pourquoi avoir un permis...
              </Heading>
              <Text textAlign="justify">
                &nbsp; Peu importe ou vous soyez dans le monde, il est impératif pour vous de posséder un permis de conduire valide.Le
                permis est aujourd'hui un atout majeur pour l'emploi car il permet de rassurer un employeur, il sait que vous ne serez pas
                dépendant des transports en commun ou lorsque vous finirez tard le soir et qu'il n'y aura plus de transport en commun.
              </Text>
              <Text>
                &nbsp; &nbsp;Il est également à noter que ce
                <em>précieux sésame</em> est valide pour la ou les catégories sélectionnées.
              </Text>
              <Text> &nbsp;Pour tout savoir sur ces catégories : </Text>
              <Button type="button" colorScheme="purple" alignSelf="center">
                cliquez ici
              </Button>
            </VStack>
            <VStack
            h='450px'
            flex={1}
              boxShadow="0 4px 15px 2px rgba(0,0,0,0.7)"
              p={3}
              bgColor="#3182ce"
              bg="linear-gradient(180deg, #3182ce 25%, rgba(252,252,252,1) 75%)"
            >
              <Heading fontSize='27px' textAlign="center" color="white">
                Comment obtenir votre permis...
              </Heading>
              <Text>&nbsp; Pour cela vous aurez donc a passer l'examen du code de la route et l'épreuve pratique.</Text>
              <Text>Faisons le point de chaque catégorie de permis et des particularités associées.</Text>
              <Text>&nbsp;Ici nous nous concentrerons sur les types de véhicules, et les conditions d'inscription à ces permis.</Text>
              <Heading mt={5} as="h5" fontSize={16} textAlign="center" color="blue.500">
                Voulez vous faire un test du code de la route ?
              </Heading>
              <Button type="button" colorScheme="purple" alignSelf="center">
                cliquez ici
              </Button>
            </VStack>
          </HStack>
        </VStack>
      )}
      {max520 ? (
        <VStack>
          <VStack m={2} mt={5} rounded="xl" boxShadow="2px 2px 10px 2px rgba(0,0,0,0.8)" w="fit-content" p={2} fontSize={16}>
            <Select
              id="aas"
              onChange={e => handleChange(e)}
              alignSelf="center"
              border="none"
              borderRadius={0}
              m={5}
              borderBottom="2px #3182ce solid"
              textAlign="center"
              w="70%"
              fontSize={18}
              fontWeight={700}
            >
              {a}
            </Select>
            <VStack w="90vw">
              <Text>{typeCarDesc[selected - 1].texte}</Text>
              <Image m={3} src={typeCarDesc[selected - 1].img} objectFit="cover" w="70%" />
              <Text fontWeight="700">{typeCarDesc[selected - 1].imgTitre}</Text>
            </VStack>
          </VStack>
        </VStack>
      ) : (
        <VStack>
          <VStack mt={5} rounded="xl" spacing={6} boxShadow="2px 2px 15px 3px rgba(0,0,0,0.8)" w="fit-content" p={5}>
            <HStack spacing={5}>{a}</HStack>
            <VStack maxW={700} fontSize={14}>
              <Text>{typeCarDesc[selected - 1].texte}</Text>
              <Image src={typeCarDesc[selected - 1].img} objectFit="cover" h={375} w={375} />
              <Text>{typeCarDesc[selected - 1].imgTitre}</Text>
            </VStack>
          </VStack>
        </VStack>
      )}

      <Tarifs phone={max520} />

      <SuperFastSuperEasy />
      <VStack position="relative">
        <Box position="absolute" bottom="-90px" zIndex={-1} left={0} w="full" h="200px" bgImage = {'url('+fondNoir+')'} bgRepeat='no-repeat' bgSize='cover' ></Box>
        <Box p={max520 ? 1 : 5} textAlign={max520 && 'justify'} pt={max520 && '50px'} fontSize={max520 ? 18 : 24} w="75%">
          Chez AUTO-GO, votre réussite et votre satisfaction sont nos priorités. Le plus dur c'est de s'engager. le reste nous en faisons
          notre affaire
        </Box>
        <LastBoxes />
      </VStack>
      <Footer />
    </Flex>
  );
};

export default Main;
