import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import { ThemeActions } from '../rtk/features/BearerToken/ThemesSlice';
import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';

const ThemeImage = ({ h, w, m, src, alt, themeId }) => {
  const status = useSelector(state => state.user.status);
  const Token = useSelector(state => state.header.token);
  const dispatch = useDispatch();
  const [image, setImage] = useState({ preview: '', data: '' });
  const [imageStatus, setImageStatus] = useState(false);
  const themePhoto = useRef(null);
  const handleFileChange = e => {
    dispatch(loadingActions.set(true));
    console.log(e.target.files);
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
    let formData = new FormData();
    formData.append('submitThemePicture', e.target.files[0]);
    console.log({ ...formData });

    axios
      .post('https://autogoback237.herokuapp.com/api/setthemepicture/?id=' + themeId, formData, {
        headers: {
          authorization: Token,
        },
      })
      .then(response => {
        setImageStatus(false);
        console.log(response);
        dispatch(ThemeActions.setThemeImgById({ id: themeId, img: response.data.url }));
      })
      .finally(() => {
        fetchAndReloadThemeAndThemeLoaded(themeId);
        setImageStatus(true);
      });
    // handleSumbmitProfile();
  };
  return (
    <Flex
      h={h}
      w={w}
      flexShrink={0}
      flexGrow={0}
      boxSizing="border-box"
      p={0}
      m={m && m}
      borderRadius="50%"
      position="relative"
      align="end"
      overflow="hidden"
      borderColor="black"
      borderWidth={1}
      justify="center"
      fontSize="12"
    >
      <Image zIndex={1} position="absolute" top={0} left={0} src={src} alt={alt} objectFit="contain" borderRadius="50%" h={h} w={w} />
      {status ? (
        <>
          <Box
            zIndex={2}
            fontSize={14}
            p={1}
            cursor="pointer"
            bgColor="blackAlpha.600"
            color="white"
            w="full"
            h="10%"
            minH={25}
            onClick={() => themePhoto.current.click()}
          >
            <Text>Edit</Text>
          </Box>
          <Input display="none" type="file" ref={themePhoto} onChange={e => handleFileChange(e)} />
        </>
      ) : null}
    </Flex>
  );
};

export default ThemeImage;
