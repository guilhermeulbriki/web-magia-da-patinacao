/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import { FormHandles } from '@unform/core';
import { mutate as mutateGlobal } from 'swr';

import {
  Container,
  Content,
  GroupsContent,
  GroupsListCities,
  GroupsList,
  Group,
  GroupSchedules,
  GroupSchedule,
  GroupScheduleActions,
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
import { useToast } from '../../hooks/Toast';

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
  const formAddRef = useRef<FormHandles>(null);
  const formUpdateRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [groups, setGroups] = useState<IGroups[]>([]);
  const [filteredCity, setFilteredCity] = useState('');
  const [selectedCity, setSelectedCity] = useState<IGroups>({} as IGroups);
  const [functionClicked, setFunctionClicked] = useState<
    'delete' | 'alter' | 'add' | null
  >();

  const { data: groupsData, mutate } = useFetch<IGroups[]>('/groups/list', {
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
        params: { city: filteredCity },
      })
      .then((response) => setGroups(response.data));
  }, [filteredCity]);

  const handleSelectCity = useCallback(
    (city: string) => {
      const alreadySelected = filteredCity === city;

      if (alreadySelected) {
        setFilteredCity('');
      } else {
        setFilteredCity(city);
      }
    },
    [filteredCity],
  );

  const handleAddGroup = useCallback(
    async (data) => {
      try {
        const groupAdded = await api.post<IGroups>('groups', data);

        const updatedGroups = [...groups, groupAdded.data];

        mutate(updatedGroups, true);
        mutateGlobal('/groups/list', updatedGroups);

        addToast({
          type: 'success',
          title: 'Turma adicionada',
          description: 'A turma foi adicionada com sucesso',
        });
      } catch (err) {
        let description = 'Ocorreu um erro ao adicionar a turma';

        if (err) description = err.response.data.message;

        addToast({
          type: 'error',
          title: 'Erro ao adicionar a turma',
          description,
        });
      }
    },
    [addToast, groups, mutate],
  );

  const handleUpdateGroup = useCallback(
    async (data) => {
      try {
        const groupUpdated = await api.put<IGroups>('groups', data, {
          params: { id: selectedCity.id },
        });

        const updatedGroups = groups.map((group) => {
          if (group.id === groupUpdated.data.id) {
            return groupUpdated.data;
          }

          return group;
        });

        mutate(updatedGroups, true);
        mutateGlobal('/groups/list', updatedGroups);

        formUpdateRef.current?.reset();

        addToast({
          type: 'success',
          title: 'Turma alterada',
          description: 'A turma foi alterada com sucesso',
        });
      } catch (err) {
        let description = 'Ocorreu um erro ao alterar a turma';

        if (err) description = err.response.data.message;

        addToast({
          type: 'error',
          title: 'Erro ao alterar a turma',
          description,
        });
      }
    },
    [addToast, groups, mutate, selectedCity.id],
  );

  const handleSetData = useCallback((data: IGroups) => {
    formUpdateRef.current?.setData(data);
    setSelectedCity(data);
  }, []);

  const handleDeleteGroup = useCallback(
    async (id: string) => {
      await api.delete(`groups/${id}`);

      const updatedGroups = groups.filter((group) => group.id === id);

      if (selectedCity.id === id) formUpdateRef.current?.reset();

      mutate(updatedGroups, true);
      mutateGlobal('/groups/list', updatedGroups);
    },
    [groups, mutate, selectedCity.id],
  );

  const handleSetFunctionClick = useCallback(
    (action: 'delete' | 'alter' | 'add' | null) => {
      if (functionClicked !== action) {
        setFunctionClicked(action);
      } else {
        setFunctionClicked(null);
      }
    },
    [functionClicked],
  );

  const handleDeleteSchedule = useCallback(
    async (id: string) => {
      await api.delete(`schedules/${id}`);

      const updatedGroups = groups.map((group) => {
        group.schedules.filter((schedule) => schedule.id === id);

        return group;
      });

      mutate(updatedGroups, true);
      mutateGlobal('/groups/list', updatedGroups);
    },
    [mutate, groups],
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
              className={filteredCity === 'seberi' ? 'active' : ''}
              onClick={() => handleSelectCity('seberi')}
            >
              Seberi
            </span>
            <span
              className={
                filteredCity === 'frederico westphalen' ? 'active' : ''
              }
              onClick={() => handleSelectCity('frederico westphalen')}
            >
              Frederico Westphalen
            </span>
            <span
              className={filteredCity === 'palmitinho' ? 'active' : ''}
              onClick={() => handleSelectCity('palmitinho')}
            >
              Palmitinho
            </span>
            <span
              className={filteredCity === 'taquaruçu do sul' ? 'active' : ''}
              onClick={() => handleSelectCity('taquaruçu do sul')}
            >
              Taquaruçu do Sul
            </span>
          </GroupsListCities>

          <GroupsList>
            {groups.map((group) => (
              <Group
                selected={selectedCity.id === group.id}
                onClick={() => handleSetData(group)}
              >
                <header>
                  <span>
                    <strong>{putFirstLetterUperCase(group.name)}</strong>
                    {selectedCity.id === group.id &&
                      functionClicked === 'delete' && (
                        <FiTrash
                          color="#EB5757"
                          onClick={() => handleDeleteGroup(group.id)}
                        />
                      )}
                  </span>

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
                        {selectedCity.id === group.id &&
                          functionClicked === 'delete' && (
                            <span>
                              <IoIosClose
                                color="#EB5757"
                                size={24}
                                onClick={
                                  () => handleDeleteSchedule(schedule.id)
                                  // eslint-disable-next-line react/jsx-curly-newline
                                }
                              />
                            </span>
                          )}

                        <div>
                          <p>{putFirstLetterUperCase(schedule.day)}</p>

                          <span>
                            {schedule.start} - {schedule.finish}
                          </span>
                        </div>
                      </GroupSchedule>
                    ))}
                  </main>

                  <GroupScheduleActions>
                    <FiEdit2
                      onClick={() => handleSetFunctionClick('alter')}
                      color="#219653"
                      name="alter"
                    />
                    <FiTrash
                      onClick={() => handleSetFunctionClick('delete')}
                      color="#EB5757"
                      name="delete"
                    />
                    <FiPlus
                      onClick={() => handleSetFunctionClick('add')}
                      color="#F2994A"
                      name="add"
                    />
                  </GroupScheduleActions>
                </GroupSchedules>
              </Group>
            ))}
          </GroupsList>
        </GroupsContent>

        <GroupsEdit>
          <AddGroup ref={formAddRef} onSubmit={handleAddGroup}>
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
            <Input name="instructor" placeholder="Professor(a)" />

            <Button type="submit">Adicionar</Button>
          </AddGroup>

          <UpdateGroup
            initialData={selectedCity}
            ref={formUpdateRef}
            onSubmit={handleUpdateGroup}
          >
            <strong>Alterar uma turma</strong>

            <div>
              <Input name="name" placeholder="Nome" />
              <Input name="color" placeholder="Cor" />
            </div>

            <Input name="city" placeholder="Cidade" />
            <Input name="instructor" placeholder="Professor(a)" />

            <Button type="submit">Alterar</Button>
          </UpdateGroup>
        </GroupsEdit>
      </Content>
    </Container>
  );
};

export default Groups;
