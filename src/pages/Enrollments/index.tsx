import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { BounceLoader } from 'react-spinners';
import { FiSearch, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import api from '../../services/api';
import putFirstLetterUperCase from '../../utils/putFirstLetterUperCase';
import SideMenu from '../../components/SideMenu';
import {
  Container,
  Content,
  EnrollmentData,
  PieGraph,
  EnrollmentTable,
  EnrollmentTableColumn,
  SponsorTable,
  SponsorTableSearch,
  SponsorTablePagination,
} from './styles';

interface IEnrollmentsGraph {
  enrollments: number;
  newEnrollments: number;
  shutdowns: number;
}

interface Enrollment {
  created_at: Date;
  updated_at: Date;
}

interface IGroups {
  label: string;
  students: number;
}

const Enrollments: React.FC = () => {
  const [enrollmentsGraph, setEnrollmentsGraph] = useState<IEnrollmentsGraph>(
    {} as IEnrollmentsGraph,
  );
  const [groups, setGroups] = useState<IGroups[]>([]);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const responseEnrollment = await api.get<Enrollment[]>('/enrollments');
      const responseShutdown = await api.get('/shutdowns');

      let totalEnrollments = 0;
      let totalUpdatedEnrollments = 0;

      responseEnrollment.data.forEach((enrollment) => {
        if (enrollment.created_at === enrollment.updated_at) {
          totalEnrollments += 1;
        } else {
          totalUpdatedEnrollments += 1;
        }
      });

      setEnrollmentsGraph({
        enrollments: totalEnrollments,
        newEnrollments: totalUpdatedEnrollments,
        shutdowns: responseShutdown.data.length,
      });
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
        <EnrollmentData>
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

          <EnrollmentTable>
            <strong>Matrículas por turma</strong>

            <div>
              <EnrollmentTableColumn>
                <strong>Cor</strong>
                {groups.map((group) => (
                  <span key={group.label}>
                    {putFirstLetterUperCase(group.label)}
                  </span>
                ))}
              </EnrollmentTableColumn>
              <EnrollmentTableColumn>
                <strong>Quantidade</strong>
                {groups.map((group) => (
                  <span key={group.label}>{group.students}</span>
                ))}
              </EnrollmentTableColumn>
            </div>
          </EnrollmentTable>
        </EnrollmentData>

        <SponsorTable>
          <header>
            <section>
              <strong>Associados</strong>

              <SponsorTableSearch>
                <input type="text" placeholder="Buscar" />
                <FiSearch color="#929292" size={18} />
              </SponsorTableSearch>
            </section>

            <SponsorTablePagination>
              <FiArrowLeft color="#1F4A6E" size={16} />
              <span>
                Página: <strong>1 </strong>
              </span>
              <FiArrowRight color="#1F4A6E" size={16} />
            </SponsorTablePagination>
          </header>
        </SponsorTable>
      </Content>
    </Container>
  );
};

export default Enrollments;
