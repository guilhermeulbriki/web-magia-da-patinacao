import React, { useEffect, useState } from 'react';
import { VictoryPie } from 'victory';
import { GiPlainCircle } from 'react-icons/gi';

import { Container, Content, Graph, Legend, PieGraphs } from './styles';
import SideMenu from '../../components/SideMenu';
import api from '../../services/api';
import getPorcentage from '../../utils/getPorcentage';

interface IDataGraph {
  value: number;
  porcentage: number;
}

interface Enrollment {
  created_at: Date;
  updated_at: Date;
}

const Dashboard: React.FC = () => {
  const [enrollments, setEnrollments] = useState<IDataGraph>({
    value: 10,
    porcentage: 33,
  });
  const [updatedEnrollments, setUpdatedEnrollments] = useState<IDataGraph>({
    value: 10,
    porcentage: 33,
  });
  const [shutdowns, setShutdowns] = useState<IDataGraph>({
    value: 10,
    porcentage: 33,
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function loadData() {
      const responseEnrollment = await api.get<Enrollment[]>('/enrollments');
      const responseShutdown = await api.get('/shutdowns');

      let totalEnrollments = 0;
      let totalUpdatedEnrollments = 0;
      let total = 0;

      responseEnrollment.data.forEach((enrollment) => {
        if (enrollment.created_at === enrollment.updated_at) {
          totalEnrollments += 1;
        } else {
          totalUpdatedEnrollments += 1;
        }
      });

      total = responseEnrollment.data.length + responseShutdown.data.length;

      setEnrollments({
        porcentage: getPorcentage(total, totalEnrollments),
        value: totalEnrollments,
      });

      setUpdatedEnrollments({
        porcentage: getPorcentage(total, totalUpdatedEnrollments),
        value: totalUpdatedEnrollments,
      });

      setShutdowns({
        porcentage: getPorcentage(total, responseShutdown.data.length),
        value: responseShutdown.data.length,
      });
    }

    loadData();
  }, []);

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
                    {
                      x: `${shutdowns.value}`,
                      y: Number(`${shutdowns.porcentage}`),
                    },
                    {
                      x: `${enrollments.value}`,
                      y: Number(`${enrollments.porcentage}`),
                    },
                    {
                      x: `${updatedEnrollments.value}`,
                      y: Number(`${updatedEnrollments.porcentage}`),
                    },
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

              <Legend className="enrollment">
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

              <Legend className="age">
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
