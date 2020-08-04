import React, { useEffect } from 'react';
import { VictoryPie } from 'victory';
import { GiPlainCircle } from 'react-icons/gi';

import { Container, Content, Graph, Legend, PieGraphs } from './styles';
import SideMenu from '../../components/SideMenu';
import api from '../../services/api';

const Dashboard: React.FC = () => {
  useEffect(() => {
    api.get('/enrollments').then((response) => {
      console.log(response.data);
    });

    api.get('/students/1').then((response) => {
      console.log(response.data);
    });
  });

  return (
    <Container>
      <SideMenu />

      <Content>
        <PieGraphs>
          <Graph>
            <strong>
              Comparação entre matrículas, rematrículas e desistências
            </strong>

            <div>
              <main>
                <VictoryPie
                  data={[
                    { x: '192', y: 27 },
                    { x: '232', y: 33 },
                    { x: '292', y: 40 },
                  ]}
                  style={{
                    labels: {
                      fontSize: 24,
                    },
                  }}
                  height={350}
                  innerRadius={80}
                  colorScale={['#EF2D4F', '#299503', '#E7B507']}
                />
              </main>

              <Legend>
                <li>
                  <GiPlainCircle color="#299503" />
                  <span>Matrículas</span>
                </li>
                <li>
                  <GiPlainCircle color="#E7B507" />
                  <span>Rematrículas</span>
                </li>
                <li>
                  <GiPlainCircle color="#EF2D4F" />
                  <span>Desistências</span>
                </li>
              </Legend>
            </div>
          </Graph>

          <Graph>
            <strong>Idade dos alunos</strong>

            <div>
              <main>
                <VictoryPie
                  data={[
                    { x: '192', y: 27 },
                    { x: '232', y: 33 },
                    { x: '292', y: 40 },
                  ]}
                  style={{
                    labels: {
                      fontSize: 24,
                    },
                  }}
                  height={350}
                  innerRadius={80}
                  colorScale={['#EB2DEF', '#1F4A6E', '#0AB1B1']}
                />
              </main>

              <Legend>
                <li>
                  <GiPlainCircle color="#1F4A6E" />
                  <span>18 anos</span>
                </li>
                <li>
                  <GiPlainCircle color="#0AB1B1" />
                  <span>16 anos</span>
                </li>
                <li>
                  <GiPlainCircle color="#EB2DEF" />
                  <span>15 anos</span>
                </li>
              </Legend>
            </div>
          </Graph>
        </PieGraphs>
      </Content>
    </Container>
  );
};

export default Dashboard;
