import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ dataResults }) => {
  return (
    <VStack align="start" textAlign="start" w="full">
      {Array.isArray(dataResults.themes) && dataResults.themes.length > 0 && (
        <VStack w='full' align='start'>
          <Text borderBottom="2px solid white" borderTop="2px solid white" w='full'>
            themes
          </Text>
          <VStack align="start">
            {dataResults.themes.map(t => {
              return (
                <Link to={'/theme/?id=' + t.id} key={'theme ' + t.id}>
                  <Text p={1} >{t.nom}</Text>
                </Link>
              );
            })}
          </VStack>
        </VStack>
      )}

      {Array.isArray(dataResults.chapitres) && dataResults.chapitres.length > 0 && (
        <VStack w='full' align='start'>
          <Text borderBottom="2px solid white" borderTop="2px solid white" w='full'>
            chapitres
          </Text>
          <VStack align="start">
            {dataResults.chapitres.map(c => {
              return (
                <Link to={'/chapitre/?id=' + c.id} key={'chapitre ' + c.id}>
                  <Text p={1}>{c.titre}</Text>
                </Link>
              );
            })}
          </VStack>
        </VStack>
      )}

      {Array.isArray(dataResults.activites) && dataResults.activites.length > 0 && (
        <VStack w='full' align='start'>
          <Text borderBottom="2px solid white" borderTop="2px solid white" w='full'>
            activites
          </Text>
          <VStack align="start">
            {dataResults.activites.map(c => {
              return (
                <Link to={c.genre === 'lecon' ? '/lecon/?id=' + c.id : '/quizz/?id=' + c.id} key={'activite ' + c.id}>
                  <Text p={1}>{c.titre}</Text>
                </Link>
              );
            })}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

export default SearchResults;
