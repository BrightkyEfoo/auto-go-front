import { HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { BACKEND_URL, getVisitesDatas } from '../Data';

export const Months = ['Janvier' , 'Fevrier' , 'Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre']

const UserScoreBoard = () => {
  const socket = io(BACKEND_URL);
  const [usersList, setUsersList] = useState([]);
  const [sexeDonutSeries, setSexeDonutSeries] = useState([0, 0]);
  const Token = useSelector(state => state.header.token);
  const userId = useSelector(state => state.user.id);
  const [visitesCategories, setVisistesCategories] = useState(['0/0']);
  const [visitesData, setVisiteData] = useState([0]);
  const [month, setMonth] = useState('')
  const [tableauAges, setTableauAges] = useState([]);
  //   const tabbleauAf
  useEffect(() => {
    axios
      .get(getVisitesDatas + userId, {
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        console.log('res', res);
        setSexeDonutSeries(res.data.tableauSexes);
        setVisiteData(res.data.data.data);
        setVisistesCategories(res.data.data.categories);
        setMonth(res.data.data.month)
        setTableauAges(res.data.tableauAges);
      })
      .catch(err => console.log('err', err));
  }, [Token, userId]);
  socket.on('userList', userList => {
    console.log('userList', userList);
    setUsersList(userList);
  });

  socket.on('visiteChart', dat => {
    setVisistesCategories(dat.categories);
    setVisiteData(dat.data);
    setMonth(dat.month)
    console.log('data', dat);
  });

  socket.on('ageDonut', dat => {
    console.log('data', dat);
    setTableauAges(dat);
  });

  socket.on('sexeDonut', data => {
    setSexeDonutSeries(data);
  });
  return (
    <VStack w="full" mt={10}>
      <Text>UserScoreBoard</Text>
      <VStack>
        <Text>Online users : {usersList.length}</Text>
        <VStack w="80%" id="chart">
          <Text>Mois de {Months[month]}</Text>
          <Chart
            options={{
              stroke: {
                curve: 'smooth',
              },
              chart: {
                id: 'visite-Chart',
              },
              xaxis: {
                categories: visitesCategories,
              },
            }}
            series={[
              {
                name: 'visites',
                data: visitesData,
              },
            ]}
          
            type="line"
            height={350}
            width={700}
          />

          <HStack>
            <Chart
              type="donut"
              options={{
                dataLabels: {
                  style: {
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                    colors: undefined,
                  },
                  background: {
                    enabled: true,
                    foreColor: '#fff',
                    padding: 4,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: '#fff',
                    opacity: 0.9,
                    dropShadow: {
                      enabled: false,
                      top: 1,
                      left: 1,
                      blur: 1,
                      color: '#000',
                      opacity: 0.45,
                    },
                  },
                  dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45,
                  },
                },
                chart: {
                  id: 'ChartSexeDonut',
                },
                labels: ['Masculin', 'feminin'],
                plotOptions: {
                  pie: {
                    donut: {
                      size: '65%',
                      labels: {
                        show: true,
                        total: {
                          show: true,
                        },
                      },
                    },
                  },
                },
              }}
              series={sexeDonutSeries}
              height={400}
              width={400}
              color=""
            />

            <Chart
              type="donut"
              options={{
                dataLabels: {
                  style: {
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                    colors: undefined,
                  },
                  background: {
                    enabled: true,
                    foreColor: '#fff',
                    padding: 4,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: '#fff',
                    opacity: 0.9,
                    dropShadow: {
                      enabled: false,
                      top: 1,
                      left: 1,
                      blur: 1,
                      color: '#000',
                      opacity: 0.45,
                    },
                  },
                  dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45,
                  },
                },
                chart: {
                  id: 'ChartSexeDonut',
                },
                labels: tableauAges.map(t => t.tranche.join(' a ')+' ans'),
                plotOptions: {
                  pie: {
                    donut: {
                      size: '65%',
                      labels: {
                        show: true,
                        total: {
                          show: true,
                        },
                      },
                    },
                  },
                },
              }}
              series={tableauAges.map(t => t.nombre)}
              height={400}
              width={400}
              color=""
            />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default UserScoreBoard;
