import { FormHandles } from '@unform/core';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiEdit2,
  FiSettings,
  FiTrash,
} from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';

import SideMenu from '../../components/SideMenu';
import { useToast } from '../../hooks/Toast';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';
import {
  Container,
  Content,
  Table,
  TablePagination,
  TableContent,
  TableRow,
  ContentEditions,
  AddEdition,
  AlterEdition,
} from './styles';

interface IDirector {
  id: string;
  president: string;
  vice: string;
  start: Date;
  end: Date;
}

const Directors: React.FC = () => {
  const formAddRef = useRef<FormHandles>(null);
  const formUpdateRef = useRef<FormHandles>(null);
  const [directors, setDirectors] = useState<IDirector[]>([]);
  const [page, setPage] = useState(1);
  const { addToast } = useToast();
  const [selectedDirector, setSelectedDirector] = useState('');

  const { data } = useFetch<IDirector[]>('/directors');

  useEffect(() => {
    if (data) setDirectors(data);
  }, [data]);

  useEffect(() => {
    api
      .get('spectacles', { params: { page } })
      .then((response) => setDirectors(response.data));
  }, [page]);

  const handleAddDirector = useCallback(
    async (formData) => {
      try {
        const formatedData = {
          ...formData,
          start: format(
            new Date(formData.start),
            "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
          ),
          end: format(new Date(formData.end), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        };

        const directorAdded = await api.post<IDirector>(
          'directors',
          formatedData,
        );

        const updatedDirectors = [...directors, directorAdded.data];

        updatedDirectors.slice(0, page * 20);

        setDirectors(updatedDirectors);

        addToast({
          type: 'success',
          title: 'Diretoria adicionada',
          description: 'A diretoria foi adicionada com sucesso',
        });

        formAddRef.current?.reset();
      } catch (err) {
        let description = 'Ocorreu um erro ao adicionar a diretoria';

        if (err) description = err.response.data.message;

        addToast({
          type: 'error',
          title: 'Erro ao adicionar a diretoria',
          description,
        });
      }
    },
    [addToast, directors, page],
  );

  const handleSetUpdate = useCallback(
    (id: string) => {
      setSelectedDirector(id);

      const findedDirector = directors.find((director) => director.id === id);

      if (findedDirector) {
        const formatedData = {
          ...findedDirector,
          start: format(new Date(findedDirector.start), 'yyyy-MM-dd'),
          end: format(new Date(findedDirector.end), 'yyyy-MM-dd'),
        };

        formUpdateRef.current?.setData(formatedData);
      }
    },
    [directors],
  );

  const handleUpdateDirector = useCallback(
    async (formData) => {
      try {
        const directorWillUpdate = directors.find(
          (director) => director.id === selectedDirector,
        );

        if (directorWillUpdate) {
          const formatedData = {
            ...formData,
            start: format(
              new Date(formData.start),
              "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
            ),
            end: format(new Date(formData.end), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
          };

          const directorUpdated = await api.put<IDirector>(
            `directors/${directorWillUpdate.id}`,
            formatedData,
          );

          const updatedDirectors = directors.map((director) => {
            if (director.id === directorUpdated.data.id) {
              return directorUpdated.data;
            }

            return director;
          });

          updatedDirectors.slice(0, page * 20);

          setDirectors(updatedDirectors);

          formUpdateRef.current?.reset();

          addToast({
            type: 'success',
            title: 'Diretoria alterado',
            description: 'A diretoria foi alterada com sucesso',
          });
        }
      } catch (err) {
        let description = 'Ocorreu um erro ao alterar a diretoria';

        if (err) description = err.response.data.message;

        addToast({
          type: 'error',
          title: 'Erro ao alterar a diretoria',
          description,
        });
      }
    },
    [addToast, directors, page, selectedDirector],
  );

  const handleDeleteDirector = useCallback(
    async (id: string) => {
      await api.delete(`directors/${id}`);

      const updatedDirectors = directors.filter(
        (director) => director.id !== id,
      );

      updatedDirectors.slice(0, (page - 1) * 20);

      setDirectors(updatedDirectors);
    },
    [directors, page],
  );

  return (
    <Container>
      <SideMenu />

      <Content>
        <Table>
          <header>
            <strong>Diretorias</strong>

            <TablePagination>
              <FiArrowLeft
                onClick={
                  () =>
                    setPage((oldValue) =>
                      oldValue > 1 ? oldValue - 1 : oldValue,
                    )
                  // eslint-disable-next-line react/jsx-curly-newline
                }
                size={16}
                color="#4f4f4f"
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
              <strong>Presidente</strong>
              {directors.map((director) => (
                <TableRow key={`${director.id}president`}>
                  {director.president}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>Vice-presidente</strong>
              {directors.map((director) => (
                <TableRow key={`${director.id}vice`}>{director.vice}</TableRow>
              ))}
            </section>
            <section>
              <strong>Início</strong>
              {directors.map((director) => (
                <TableRow key={`${director.id}start`}>
                  {format(new Date(director.start), 'dd/MM/yyyy')}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>Término</strong>
              {directors.map((director) => (
                <TableRow key={`${director.id}end`}>
                  {format(new Date(director.end), 'dd/MM/yyyy')}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>
                <FiSettings size={18} />
              </strong>
              {directors.map((director) => (
                <TableRow key={`${director.id}settings`}>
                  <FiEdit2
                    onClick={() => handleSetUpdate(director.id)}
                    size={14}
                    color="#6FCF97"
                  />
                  <FiTrash
                    onClick={() => handleDeleteDirector(director.id)}
                    size={14}
                    color="#EB5757"
                  />
                </TableRow>
              ))}
            </section>
          </TableContent>
        </Table>

        <ContentEditions>
          <AddEdition ref={formAddRef} onSubmit={handleAddDirector}>
            <strong>Adicionar nova diretoria</strong>
            <Input name="president" placeholder="Presidente" />
            <Input name="vice" placeholder="Vice-presidente" />
            <Input name="start" placeholder="Início" type="date" />
            <Input name="end" placeholder="Fim" type="date" />
            <Button type="submit">Adicionar</Button>
          </AddEdition>
          <AlterEdition ref={formUpdateRef} onSubmit={handleUpdateDirector}>
            <strong>Alterar uma diretoria</strong>
            <Input name="president" placeholder="Presidente" />
            <Input name="vice" placeholder="Vice-presidente" />
            <Input name="start" placeholder="Início" type="date" />
            <Input name="end" placeholder="Fim" type="date" />
            <Button type="submit">Alterar</Button>
          </AlterEdition>
        </ContentEditions>
      </Content>
    </Container>
  );
};

export default Directors;
