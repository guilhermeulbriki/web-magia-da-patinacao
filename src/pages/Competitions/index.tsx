import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  FiSettings,
  FiTrash,
  FiEdit2,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { mutate as mutateGlobal } from 'swr';

import { format } from 'date-fns';
import {
  Container,
  Content,
  Table,
  TableContent,
  TablePagination,
  TableRow,
  ContentEditions,
  AddEdition,
  AlterEdition,
} from './styles';
import SideMenu from '../../components/SideMenu';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import SelectInput from '../../components/SelectInput';

interface ICompetition {
  id: string;
  name: string;
  city: string;
  category: string;
  date: Date;
  award: 1 | 2 | 3 | 4 | 5;
  student_name: string;
}

const Competitions: React.FC = () => {
  const formAddRef = useRef<FormHandles>(null);
  const formUpdateRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [page, setPage] = useState(1);
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const [selectedAward, setSelectedAward] = useState('');
  const [selectedUpdateAward, setSelectedUpdateAward] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState(0);
  const [defaultValue, setDefaultValue] = useState('0');

  const { data, mutate } = useFetch<ICompetition[]>('/competitions', {
    params: { page },
  });

  useEffect(() => {
    if (data) setCompetitions(data);
  }, [data]);

  useEffect(() => {
    api
      .get('competitions', { params: { page } })
      .then((response) => setCompetitions(response.data));
  }, [page]);

  const handleSelectAward = useCallback((value) => {
    setSelectedAward(value);
  }, []);

  const handleSelectUpdateAward = useCallback((value) => {
    setSelectedUpdateAward(value);
  }, []);

  const handleAddCompetition = useCallback(
    async (formData) => {
      try {
        const formatedData = {
          ...formData,
          date: format(new Date(formData.date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
          award: selectedAward,
        };

        const competitionAdded = await api.post<ICompetition>(
          'competitions',
          formatedData,
        );

        const updatedCompetitions = [...competitions, competitionAdded.data];

        mutate(updatedCompetitions, true);
        mutateGlobal('/competitions', updatedCompetitions);

        addToast({
          type: 'success',
          title: 'Competição adicionada',
          description: 'A competição foi adicionada com sucesso',
        });

        formAddRef.current?.reset();
      } catch (err) {
        let description = 'Ocorreu um erro ao adicionar a competição';

        if (err) description = err.response.data.message;

        addToast({
          type: 'error',
          title: 'Erro ao adicionar a competição',
          description,
        });
      }
    },
    [addToast, competitions, mutate, selectedAward],
  );

  const handleSetUpdate = useCallback(
    (index: number) => {
      setSelectedCompetition(index);

      const competition = competitions[index];

      const formatedData = {
        ...competition,
        date: format(new Date(competition.date), 'yyyy-MM-dd'),
      };

      setDefaultValue(String(formatedData.award));
      formUpdateRef.current?.setData(formatedData);
    },
    [competitions],
  );

  const handleUpdateCompetition = useCallback(
    async (formData) => {
      try {
        const competitionWillUpdate = competitions[selectedCompetition];

        const formatedData = {
          ...formData,
          date: format(new Date(formData.date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
          award:
            selectedUpdateAward.length < 1
              ? competitionWillUpdate.award
              : selectedUpdateAward,
        };

        const competitionUpdated = await api.put<ICompetition>(
          `competitions/${competitionWillUpdate.id}`,
          formatedData,
        );

        const updatedCompetitions = competitions.map((competition) => {
          if (competition.id === competitionUpdated.data.id) {
            return competitionUpdated.data;
          }

          return competition;
        });

        updatedCompetitions.slice(0, page * 20);

        setCompetitions(updatedCompetitions);

        formUpdateRef.current?.reset();
        setSelectedUpdateAward('');

        addToast({
          type: 'success',
          title: 'Competição alterada',
          description: 'A competição foi alterada com sucesso',
        });
      } catch (err) {
        let description = 'Ocorreu um erro ao alterar a competição';

        if (err) description = err.response.data.message;

        addToast({
          type: 'error',
          title: 'Erro ao alterar a competição',
          description,
        });
      }
    },
    [
      addToast,
      competitions,
      mutate,
      page,
      selectedCompetition,
      selectedUpdateAward,
    ],
  );

  const handleDeleteCompetition = useCallback(
    async (index: number) => {
      const competitionWillDeleted = competitions[index];

      await api.delete(`competitions/${competitionWillDeleted.id}`);

      const updatedCompetitions = competitions.filter(
        (competition) => competition.id === competitionWillDeleted.id,
      );

      mutate(updatedCompetitions, true);
      mutateGlobal('/competitions', updatedCompetitions);
    },
    [competitions, mutate],
  );

  return (
    <Container>
      <SideMenu />

      <Content>
        <Table>
          <header>
            <strong>Competições</strong>

            <TablePagination>
              <FiArrowLeft
                size={16}
                color="#4f4f4f"
                onClick={() =>
                  setPage((oldValue) =>
                    oldValue > 1 ? oldValue - 1 : oldValue,
                  )
                }
              />
              <span>
                Pagina: <strong>{page}</strong>
              </span>
              <FiArrowRight
                onClick={() => setPage((oldValue) => oldValue + 1)}
                size={16}
                color="#4f4f4f"
              />
            </TablePagination>
          </header>

          <TableContent>
            <section>
              <strong>Nome</strong>
              {competitions.map((competition) => (
                <TableRow key={`${competition.id}name`}>
                  {competition.name}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>Cidade</strong>
              {competitions.map((competition) => (
                <TableRow key={`${competition.id}city`}>
                  {competition.city}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>Aluno(a)</strong>
              {competitions.map((competition) => (
                <TableRow key={`${competition.id}student`}>
                  {competition.student_name}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>Categoria</strong>
              {competitions.map((competition) => (
                <TableRow key={`${competition.id}category`}>
                  {competition.category}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>Premiação</strong>
              {competitions.map((competition) => (
                <TableRow key={`${competition.id}award`}>
                  {`${competition.award}º lugar`}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>
                <FiSettings size={18} />
              </strong>
              {competitions.map((competition, index) => (
                <TableRow key={`${competition.id}settings`}>
                  <FiEdit2
                    size={14}
                    onClick={() => handleSetUpdate(index)}
                    color="#6FCF97"
                  />
                  <FiTrash
                    size={14}
                    onClick={() => handleDeleteCompetition(index)}
                    color="#EB5757"
                  />
                </TableRow>
              ))}
            </section>
          </TableContent>
        </Table>

        <ContentEditions>
          <AddEdition ref={formAddRef} onSubmit={handleAddCompetition}>
            <strong>Adicionar nova competição</strong>
            <Input name="name" placeholder="Nome" />
            <Input name="city" placeholder="Cidade" />
            <Input name="student_name" placeholder="Aluno(a)" />
            <Input name="category" placeholder="Categoria" />
            <SelectInput
              options={[
                {
                  label: '1º lugar',
                  value: '1',
                },
                {
                  label: '2º lugar',
                  value: '2',
                },
                {
                  label: '3º lugar',
                  value: '3',
                },
                {
                  label: '4º lugar',
                  value: '4',
                },
                {
                  label: '5º lugar',
                  value: '5',
                },
              ]}
              name="award"
              handleSelect={handleSelectAward}
            />
            <Input name="date" type="date" placeholder="Data" />
            <Button type="submit">Adicionar</Button>
          </AddEdition>
          <AlterEdition ref={formUpdateRef} onSubmit={handleUpdateCompetition}>
            <strong>Alterar uma competição</strong>
            <Input name="name" placeholder="Nome" />
            <Input name="city" placeholder="Cidade" />
            <Input name="student_name" placeholder="Aluno(a)" />
            <Input name="category" placeholder="Categoria" />
            <SelectInput
              options={[
                {
                  label: '1º lugar',
                  value: '1',
                },
                {
                  label: '2º lugar',
                  value: '2',
                },
                {
                  label: '3º lugar',
                  value: '3',
                },
                {
                  label: '4º lugar',
                  value: '4',
                },
                {
                  label: '5º lugar',
                  value: '5',
                },
              ]}
              name="award"
              defaultValue={defaultValue}
              handleSelect={handleSelectUpdateAward}
            />
            <Input name="date" type="date" placeholder="Data" />
            <Button type="submit">Alterar</Button>
          </AlterEdition>
        </ContentEditions>
      </Content>
    </Container>
  );
};

export default Competitions;
