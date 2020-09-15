/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { BounceLoader } from 'react-spinners';
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiSettings,
  FiTrash,
} from 'react-icons/fi';

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
  SponsorTableContent,
} from './styles';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';

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

interface StudentsAgeDTO {
  age: number;
  name: string;
  students: [];
}

interface IStudents {
  id: string;
  name: string;
  sponsor: {
    id: string;
    name: string;
    phone: string;
  };
  enrollment: {
    id: string;
    status: 'ok' | 'pending';
  };
}

const Enrollments: React.FC = () => {
  const [enrollmentsGraph, setEnrollmentsGraph] = useState<IEnrollmentsGraph>(
    {} as IEnrollmentsGraph,
  );
  const [groups, setGroups] = useState<IGroups[]>([]);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState<IStudents[]>([]);
  const [filterSponsorName, setFilterSponsorName] = useState('');

  const { data: responseEnrollment } = useFetch<Enrollment[]>('/enrollments');
  const { data: responseShutdown } = useFetch('/shutdowns');
  const { data: groupsData } = useFetch<StudentsAgeDTO[]>('/groups/list', {
    params: { city: '' },
  });
  const { data: studentsData } = useFetch<IStudents[]>(`students/${page}`, {
    params: {
      name: '',
      sponsor_name: filterSponsorName,
      age: '',
      group: '',
    },
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
    const formatedData: IGroups[] = [];

    if (groupsData) {
      groupsData.forEach((group: StudentsAgeDTO) => {
        formatedData.push({
          label: group.name,
          students: group.students.length,
        });
      });

      setGroups(formatedData);
    }
  }, [groupsData]);

  useEffect(() => {
    if (studentsData) setStudents(studentsData);
  }, [studentsData]);

  useEffect(() => {
    api
      .get(`students/${page}`, {
        params: {
          name: '',
          sponsor_name: filterSponsorName,
          age: '',
          group: '',
        },
      })
      .then((response) => setStudents(response.data));
  }, [filterSponsorName, page]);

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
                <input
                  value={filterSponsorName}
                  type="text"
                  placeholder="Buscar"
                  onChange={(e) => setFilterSponsorName(e.target.value)}
                />
                <FiSearch color="#929292" size={18} />
              </SponsorTableSearch>
            </section>

            <SponsorTablePagination>
              <FiArrowLeft
                onClick={() =>
                  setPage((oldValue) =>
                    oldValue > 1 ? oldValue - 1 : oldValue,
                  )
                }
                color="#1F4A6E"
                size={16}
              />
              <span>
                Página: <strong>{page} </strong>
              </span>
              <FiArrowRight
                onClick={() => setPage((oldValue) => oldValue + 1)}
                color="#1F4A6E"
                size={16}
              />
            </SponsorTablePagination>
          </header>

          <SponsorTableContent>
            <section>
              <strong>Responsável</strong>
              {students.map((student) => (
                <span key={`${student.id}name`}>{student.sponsor.name}</span>
              ))}
            </section>
            <section>
              <strong>Aluno(a)</strong>
              {students.map((student) => (
                <span key={student.id}>{student.name}</span>
              ))}
            </section>
            <section>
              <strong>Telefone</strong>
              {students.map((student) => (
                <span key={`${student.id}phone`}>{student.sponsor.phone}</span>
              ))}
            </section>
            <section>
              <strong>Matrícula</strong>
              {students.map((student) => (
                <span
                  key={student.enrollment.id}
                  className={student.enrollment.status}
                >
                  {student.enrollment.status === 'ok'
                    ? 'Matriculado(a)'
                    : 'Pendente'}
                </span>
              ))}
            </section>
            <section>
              <strong>
                <FiSettings />
              </strong>
              {students.map((student) => (
                <span key={`${student.id}config`}>
                  <FiTrash size={18} color="#eb5757" />
                </span>
              ))}
            </section>
          </SponsorTableContent>

          <footer>
            <span>
              Novos associados: <strong>000</strong>
            </span>
            <span>
              Total de associados: <strong>000</strong>
            </span>
          </footer>
        </SponsorTable>
      </Content>
    </Container>
  );
};

export default Enrollments;
