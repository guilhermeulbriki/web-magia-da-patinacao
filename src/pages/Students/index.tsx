/* eslint-disable react/jsx-curly-newline */
import React, { useCallback, useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { BounceLoader } from 'react-spinners';
import { mutate as mutateGlobal } from 'swr';

import {
  FiArrowLeft,
  FiArrowRight,
  FiSearch,
  FiSettings,
  FiTrash,
} from 'react-icons/fi';
import {
  Container,
  Content,
  StudentData,
  PieGraph,
  ClassTable,
  BarGraph,
  StudentTable,
  StudentTableContent,
  StudentTablePagination,
  StudentTableSearch,
} from './styles';
import SideMenu from '../../components/SideMenu';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';
import Select from '../../components/Select';

interface StudentsAgeDTO {
  id: string;
  age: number;
  name: string;
  students: [];
}

interface IDataGraphAges {
  value: number;
  total: number;
}

interface IGroups {
  id: string;
  name: string;
  students: IStudents[];
}

interface IStudents {
  id: string;
  name: string;
  age: number;
  sponsor: {
    id: string;
    name: string;
  };
  group: {
    id: string;
    name: string;
  };
  enrollment: {
    id: string;
    status: 'ok' | 'pending';
  };
}

const Students: React.FC = () => {
  const [studentsAge, setStudentsAge] = useState<IDataGraphAges[]>([]);
  const [groups, setGroups] = useState<IGroups[]>([]);
  const [students, setStudents] = useState<IStudents[]>([]);
  const [filterStudentName, setFilterStudentName] = useState('');
  const [studentChangeGroup, setStudentChangeGroup] = useState('');
  const [page, setPage] = useState(1);

  const { data: studentsAgeData } = useFetch<StudentsAgeDTO[]>('/studentsAges');
  const { data: groupsData, mutate } = useFetch<IGroups[]>('/groups/list', {
    params: { city: '' },
  });
  const { data: studentsData } = useFetch<IStudents[]>(`students/${page}`, {
    params: {
      name: '',
      sponsor_name: filterStudentName,
      age: '',
      group: '',
    },
  });

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
    // const formatedData: IGroups[] = [];

    // if (groupsData) {
    //   groupsData.forEach((group: StudentsAgeDTO) => {
    //     formatedData.push({
    //       id: group.id,
    //       label: group.name,
    //       students: group.students.length > 0 ? group.students.length : 0.1,
    //     });
    //   });

    if (groupsData) {
      setGroups(groupsData);
    }
  }, [groupsData]);

  useEffect(() => {
    if (studentsData) setStudents(studentsData);
  }, [studentsData]);

  useEffect(() => {
    api
      .get(`students/${page}`, {
        params: {
          sponsor_name: '',
          name: filterStudentName,
          age: '',
          group: '',
        },
      })
      .then((response) => setStudents(response.data));
  }, [filterStudentName, page]);

  const handleDeleteStudent = useCallback(
    async (id: string) => {
      await api.delete('students', { params: { id } });

      const updatedStudents = students.filter((student) => student.id !== id);

      updatedStudents.slice(0, page * 20);

      setStudents(updatedStudents);
    },
    [page, students],
  );

  const handleChangeGroup = useCallback(
    async (groupSelected: string) => {
      const groupFinded = groups.find((group) => group.name === groupSelected);

      if (groupFinded) {
        const studentUpdated = await api.patch<IStudents>('students', null, {
          params: { id: studentChangeGroup, group_id: groupFinded.id },
        });

        const groupsUpdated = groups.map((group) => {
          if (group.id === groupFinded.id) {
            return {
              ...group,
              students: [...group.students, studentUpdated.data],
            };
          }

          return group;
        });

        mutate(groupsUpdated, true);
        mutateGlobal('/groups/list', groupsUpdated);
      }
    },
    [groups, mutate, studentChangeGroup],
  );

  return (
    <Container>
      <SideMenu />

      <Content>
        <StudentData>
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

          <ClassTable>
            <strong>Alunos por turma</strong>

            <BarGraph>
              <ResponsiveBar
                data={groups.map(({ name, students: studentsGroup }) => {
                  return {
                    turma: name,
                    [name]: studentsGroup.length,
                  };
                })}
                keys={groups.map((group) => group.name)}
                indexBy="turma"
                enableLabel={false}
                enableGridY={false}
                margin={{ top: 30, right: 20, bottom: 30, left: 40 }}
                padding={0.5}
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [['darker', 5]] }}
                animate
                motionStiffness={40}
                motionDamping={15}
              />
            </BarGraph>
          </ClassTable>
        </StudentData>

        <StudentTable>
          <header>
            <section>
              <strong>Alunos(as)</strong>

              <StudentTableSearch>
                <input
                  value={filterStudentName}
                  type="text"
                  placeholder="Buscar"
                  onChange={(e) => setFilterStudentName(e.target.value)}
                />
                <FiSearch color="#929292" size={18} />
              </StudentTableSearch>
            </section>

            <StudentTablePagination>
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
            </StudentTablePagination>
          </header>

          <StudentTableContent>
            <section>
              <strong>Aluno(a)</strong>
              {students.map((student) => (
                <span key={student.id}>{student.name}</span>
              ))}
            </section>
            <section>
              <strong>Situação</strong>
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
              <strong>Idade</strong>
              {students.map((student) => (
                <span key={`${student.id}age`}>{`${student.age} anos`}</span>
              ))}
            </section>
            <section>
              <strong>Turma</strong>
              {students.map((student) => (
                <span key={`${student.id}group`}>
                  {student.group ? (
                    <Select
                      onFocus={() => setStudentChangeGroup(student.id)}
                      name="group"
                      defaultValue={student.group.name}
                      options={groups.map((group) => {
                        return {
                          label: group.name,
                          value: group.name,
                        };
                      })}
                      handleSelect={handleChangeGroup}
                    />
                  ) : (
                    '-'
                  )}
                </span>
              ))}
            </section>
            <section>
              <strong>Responsável</strong>
              {students.map((student) => (
                <span key={`${student.id}name`}>{student.sponsor.name}</span>
              ))}
            </section>
            <section>
              <strong>
                <FiSettings />
              </strong>
              {students.map((student) => (
                <span key={`${student.id}config`}>
                  <FiTrash
                    onClick={() => handleDeleteStudent(student.id)}
                    size={18}
                    color="#eb5757"
                  />
                </span>
              ))}
            </section>
          </StudentTableContent>

          <footer>
            <span>
              Novos alunos(as): <strong>000</strong>
            </span>
            <span>
              Total de alunas(as): <strong>000</strong>
            </span>
          </footer>
        </StudentTable>
      </Content>
    </Container>
  );
};

export default Students;
