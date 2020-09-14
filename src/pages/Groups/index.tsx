/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useCallback } from 'react';
import { FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';

import {
  Container,
  Content,
  GroupsContent,
  GroupsListCities,
  GroupsList,
  Group,
  GroupSchedules,
  GroupSchedule,
  GroupsEdit,
  AddGroup,
  UpdateGroup,
} from './styles';
import SideMenu from '../../components/SideMenu';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useFetch } from '../../hooks/useFetch';
import putFirstLetterUperCase from '../../utils/putFirstLetterUperCase';
import api from '../../services/api';

interface IGroups {
  id: string;
  name: string;
  color: string;
  city: string;
  instructor: string;
  schedules: Array<{
    id: string;
    day: string;
    start: string;
    finish: string;
  }>;
}

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<IGroups[]>([]);
  const [selectedCity, setSelectedCity] = useState('');

  const { data: groupsData } = useFetch<IGroups[]>('/groups/list', {
    params: { city: '' },
  });

  useEffect(() => {
    if (groupsData) {
      setGroups(groupsData);
    }
  }, [groupsData]);

  useEffect(() => {
    api
      .get('/groups/list', {
        params: { city: selectedCity },
      })
      .then((response) => setGroups(response.data));
  }, [selectedCity]);

  const handleSelectCity = useCallback(
    (city: string) => {
      const alreadySelected = selectedCity === city;

      if (alreadySelected) {
        setSelectedCity('');
      } else {
        setSelectedCity(city);
      }
    },
    [selectedCity],
  );

  return (
    <Container>
      <SideMenu />

      <Content>
        <GroupsContent>
          <header>
            <strong>Turmas</strong>

            <span>
              Total de turmas: <strong>000</strong>
            </span>
          </header>

          <GroupsListCities>
            <span
              className={selectedCity === 'seberi' ? 'active' : ''}
              onClick={() => handleSelectCity('seberi')}
            >
              Seberi
            </span>
            <span
              className={
                selectedCity === 'frederico westphalen' ? 'active' : ''
              }
              onClick={() => handleSelectCity('frederico westphalen')}
            >
              Frederico Westphalen
            </span>
            <span
              className={selectedCity === 'palmitinho' ? 'active' : ''}
              onClick={() => handleSelectCity('palmitinho')}
            >
              Palmitinho
            </span>
            <span
              className={selectedCity === 'taquaruçu do sul' ? 'active' : ''}
              onClick={() => handleSelectCity('taquaruçu do sul')}
            >
              Taquaruçu do Sul
            </span>
          </GroupsListCities>

          <GroupsList>
            {groups.map((group) => (
              <Group>
                <header>
                  <strong>{putFirstLetterUperCase(group.name)}</strong>

                  <aside>
                    <span className="city">
                      {putFirstLetterUperCase(group.city)}
                    </span>
                    <span className="teacher">
                      {putFirstLetterUperCase(group.instructor)}
                    </span>
                  </aside>
                </header>

                <GroupSchedules>
                  <main>
                    {group.schedules.map((schedule) => (
                      <GroupSchedule>
                        <p>{putFirstLetterUperCase(schedule.day)}</p>

                        <span>
                          {schedule.start} - {schedule.finish}
                        </span>
                      </GroupSchedule>
                    ))}
                  </main>

                  <aside>
                    <FiEdit2 color="#219653" />
                    <FiTrash color="#EB5757" />
                    <FiPlus color="#F2994A" />
                  </aside>
                </GroupSchedules>
              </Group>
            ))}
          </GroupsList>
        </GroupsContent>

        <GroupsEdit>
          <AddGroup onSubmit={() => {}}>
            <strong>Adicionar nova turma</strong>

            <div>
              <Input
                containerStyle={{ marginTop: 0 }}
                name="name"
                placeholder="Nome"
              />
              <Input name="color" placeholder="Cor" />
            </div>

            <Input name="city" placeholder="Cidade" />

            <Button type="submit">Adicionar</Button>
          </AddGroup>

          <UpdateGroup onSubmit={() => {}}>
            <strong>Alterar uma turma</strong>

            <div>
              <Input name="name" placeholder="Nome" />
              <Input name="color" placeholder="Cor" />
            </div>

            <Input name="city" placeholder="Cidade" />

            <Button type="submit">Alterar</Button>
          </UpdateGroup>
        </GroupsEdit>
      </Content>
    </Container>
  );
};

export default Groups;
