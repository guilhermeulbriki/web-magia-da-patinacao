/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { VictoryPie, VictoryBar, VictoryTheme, VictoryChart } from 'victory';
import { GiPlainCircle } from 'react-icons/gi';

import {
  Container,
  Content,
  EnrollmentGraph,
  AgeGraph,
  Legend,
  PieGraphs,
  BarGraphContent,
  BarGraph,
} from './styles';
import SideMenu from '../../components/SideMenu';
import api from '../../services/api';
import getPorcentage from '../../utils/getPorcentage';

interface IDataGraph {
  value: number;
  porcentage: number;
}

interface IDataGraphAges {
  value: number;
  total: number;
  porcentage: number;
}

interface Enrollment {
  created_at: Date;
  updated_at: Date;
}

interface StudentsAgeDTO {
  age: number;
}

interface IGroups {
  label: string;
  students: number;
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
  const [studentsAge, setStudentsAge] = useState<IDataGraphAges[]>([
    { porcentage: 33, value: 15, total: 10 },
    { porcentage: 33, value: 15, total: 10 },
    { porcentage: 33, value: 15, total: 10 },
  ]);
  const [groups, setGroups] = useState<IGroups[]>([
    { label: 'turma', students: 10 },
    { label: 'turma', students: 6 },
    { label: 'turma', students: 3 },
    { label: 'turma', students: 7 },
    { label: 'turma', students: 4 },
    { label: 'turma', students: 8 },
    { label: 'turma', students: 9 },
  ]);

  useEffect(() => {
    async function loadData(): Promise<void> {
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

  useEffect(() => {
    async function loadData(): Promise<void> {
      const studentsAgeData = await api.get<StudentsAgeDTO[]>('/studentsAges');

      let formatedData: IDataGraphAges[] = [];
      let totalData = 0;

      studentsAgeData.data.forEach(({ age }) => {
        if (formatedData.length > 0) {
          formatedData.forEach((data) => {
            if (data.value === age) {
              data.total += 1;
              data.porcentage = getPorcentage(totalData, data.porcentage);
            } else {
              formatedData.push({
                value: age,
                total: 1,
                porcentage: getPorcentage(totalData, 1),
              });
            }
          });
        } else {
          formatedData = [{ value: age, total: 1, porcentage: 100 }];
        }

        totalData += 1;
      });

      setStudentsAge(formatedData);
    }

    loadData();
  }, []);

  useEffect(() => {
    interface IGroupsForEach {
      name: string;
      students: [];
    }

    async function loadData(): Promise<void> {
      const groupsData = await api.get('/groups/list', {
        params: { city: '' },
      });

      const formatedData: IGroups[] = [];

      groupsData.data.forEach((group: IGroupsForEach) => {
        formatedData.push({
          label: group.name,
          students: group.students.length > 0 ? group.students.length : 1,
        });
      });

      setGroups(formatedData);
    }

    loadData();
  }, []);

  return (
    <Container>
      <SideMenu />

      <Content>
        <PieGraphs>
          <EnrollmentGraph>
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
          </EnrollmentGraph>

          <AgeGraph>
            <strong>Idade dos alunos</strong>

            <div>
              <main>
                <VictoryPie
                  data={studentsAge.map((studentAge) => {
                    return {
                      x: `${studentAge.value}`,
                      y: Number(`${studentAge.porcentage}`),
                      label: `${studentAge.value} anos`,
                    };
                  })}
                  style={{
                    labels: {
                      fontSize: 18,
                    },
                  }}
                  height={340}
                  innerRadius={80}
                  colorScale="qualitative"
                />
              </main>
            </div>
          </AgeGraph>
        </PieGraphs>

        <BarGraphContent>
          <strong>Alunos por turma</strong>

          <BarGraph>
            <div>
              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 20 }}
              >
                <VictoryBar
                  data={groups.map((group, index) => {
                    return {
                      label: group.label,
                      x: index,
                      y: group.students,
                    };
                  })}
                  style={{ labels: { fill: 'black' } }}
                  theme={VictoryTheme.material}
                  barWidth={20}
                  width={650}
                />
              </VictoryChart>
            </div>
          </BarGraph>
        </BarGraphContent>
      </Content>
    </Container>
  );
};

export default Dashboard;
