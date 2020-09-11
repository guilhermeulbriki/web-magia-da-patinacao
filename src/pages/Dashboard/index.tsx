/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

import {
  Container,
  Content,
  PieGraph,
  PieGraphs,
  BarGraphContent,
  BarGraph,
} from './styles';
import SideMenu from '../../components/SideMenu';
import { useFetch } from '../../hooks/useFetch';

interface IDataGraphAges {
  value: number;
  total: number;
}

interface Enrollment {
  created_at: Date;
  updated_at: Date;
}

interface IEnrollmentsGraph {
  enrollments: number;
  newEnrollments: number;
  shutdowns: number;
}

interface StudentsAgeDTO {
  age: number;
  name: string;
  students: [];
}

interface IGroups {
  label: string;
  students: number;
}

const Dashboard: React.FC = () => {
  const [enrollmentsGraph, setEnrollmentsGraph] = useState<IEnrollmentsGraph>(
    {} as IEnrollmentsGraph,
  );
  const [studentsAge, setStudentsAge] = useState<IDataGraphAges[]>([]);
  const [groups, setGroups] = useState<IGroups[]>([]);

  const { data: responseEnrollment } = useFetch<Enrollment[]>('/enrollments');
  const { data: responseShutdown } = useFetch('/shutdowns');
  const { data: studentsAgeData } = useFetch<StudentsAgeDTO[]>('/studentsAges');
  const { data: groupsData } = useFetch<StudentsAgeDTO[]>('/groups/list', {
    params: { city: '' },
  });

  useEffect(() => {
    let totalEnrollments = 0;
    let totalUpdatedEnrollments = 0;

    if (responseEnrollment && responseShutdown) {
      responseEnrollment.forEach((enrollment) => {
        if (enrollment.created_at === enrollment.updated_at) {
          totalEnrollments += 1;
        } else {
          totalUpdatedEnrollments += 1;
        }
      });

      setEnrollmentsGraph({
        enrollments: totalEnrollments,
        newEnrollments: totalUpdatedEnrollments,
        shutdowns: responseShutdown.length,
      });
    }
  }, [responseEnrollment, responseShutdown]);

  useEffect(() => {
    let formatedData: IDataGraphAges[] = [];

    if (studentsAgeData) {
      studentsAgeData.forEach(({ age }) => {
        if (formatedData.length > 0) {
          const checkIfExists = formatedData.find((data) => data.value === age);
          if (checkIfExists) {
            checkIfExists.total += 1;
          } else {
            formatedData.push({
              value: age,
              total: 1,
            });
          }
        } else {
          formatedData = [{ value: age, total: 1 }];
        }
      });

      setStudentsAge(formatedData);
    }
  }, [studentsAgeData]);

  useEffect(() => {
    const formatedData: IGroups[] = [];

    if (groupsData) {
      groupsData.forEach((group: StudentsAgeDTO) => {
        formatedData.push({
          label: group.name,
          students: group.students.length > 0 ? group.students.length : 0.1,
        });
      });

      setGroups(formatedData);
    }
  }, [groupsData]);

  return (
    <Container>
      <SideMenu />

      <Content>
        <PieGraphs>
          <PieGraph>
            <strong>
              Comparação entre matrículas, rematrículas e desistências
            </strong>

            <div>
              {enrollmentsGraph.enrollments ? (
                <ResponsivePie
                  data={[
                    {
                      id: 'matriculas',
                      label: 'Matrículas',
                      value: enrollmentsGraph.enrollments,
                    },
                    {
                      id: 'rematriculas',
                      label: 'Rematrículas',
                      value: enrollmentsGraph.newEnrollments,
                    },
                    {
                      id: 'desistencias',
                      label: 'Desistencias',
                      value: enrollmentsGraph.shutdowns,
                    },
                  ]}
                  margin={{ top: 10, right: 150, bottom: 20, left: 20 }}
                  colors={['#77CF7C', '#F4D35E', '#eb5160']}
                  innerRadius={0.6}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                  enableSlicesLabels={false}
                  enableRadialLabels={false}
                  legends={[
                    {
                      anchor: 'right',
                      itemsSpacing: 18,
                      translateX: 150,
                      direction: 'column',
                      itemWidth: 100,
                      itemHeight: 30,
                      itemTextColor: '#999',
                      symbolSize: 14,
                      symbolShape: 'circle',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemTextColor: '#4F4F4F',
                          },
                        },
                      ],
                    },
                  ]}
                />
              ) : (
                <span
                  style={{
                    display: 'flex',
                    height: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <BounceLoader color="#6668D0" />
                </span>
              )}
            </div>
          </PieGraph>

          <PieGraph>
            <strong>Idade dos alunos</strong>

            <div>
              {studentsAge.length > 0 ? (
                <ResponsivePie
                  data={studentsAge.map((age) => {
                    return {
                      id: age.value,
                      label: `${age.value} anos`,
                      value: age.total,
                    };
                  })}
                  margin={{ top: 10, right: 150, bottom: 20, left: 20 }}
                  colors={{ scheme: 'paired' }}
                  innerRadius={0.6}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                  enableSlicesLabels={false}
                  enableRadialLabels={false}
                  legends={[
                    {
                      anchor: 'right',
                      translateX: 150,
                      direction: 'column',
                      itemWidth: 100,
                      itemHeight: 30,
                      itemTextColor: '#999',
                      symbolSize: 14,
                      symbolShape: 'circle',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemTextColor: '#4F4F4F',
                          },
                        },
                      ],
                    },
                  ]}
                />
              ) : (
                <span
                  style={{
                    display: 'flex',
                    height: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <BounceLoader color="#6668D0" />
                </span>
              )}
            </div>
          </PieGraph>
        </PieGraphs>

        <BarGraphContent>
          <strong>Alunos por turma</strong>

          <BarGraph>
            <ResponsiveBar
              data={groups.map(({ label, students }) => {
                return {
                  turma: label,
                  [label]: students,
                };
              })}
              keys={groups.map((group) => group.label)}
              indexBy="turma"
              enableLabel={false}
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.5}
              colors={{ scheme: 'nivo' }}
              borderColor={{ from: 'color', modifiers: [['darker', 5]] }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              animate
              motionStiffness={40}
              motionDamping={15}
            />
          </BarGraph>
        </BarGraphContent>
      </Content>
    </Container>
  );
};

export default Dashboard;
