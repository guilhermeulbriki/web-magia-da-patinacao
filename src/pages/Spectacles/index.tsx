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

interface ISpectacle {
  id: string;
  theme: string;
  local: string;
  public: string;
  date: Date;
}

const Spectacles: React.FC = () => {
  const [spectacles, setSpectacles] = useState<ISpectacle[]>([]);
  const [selectedSpectacle, setSelectedSpectacle] = useState('');
  const [page, setPage] = useState(1);
  const { addToast } = useToast();
  const formAddRef = useRef<FormHandles>(null);
  const formUpdateRef = useRef<FormHandles>(null);

  const { data } = useFetch<ISpectacle[]>('/spectacles', {
    params: { order: 'DESC', page },
  });

  useEffect(() => {
    if (data) setSpectacles(data);
  }, [data]);

  useEffect(() => {
    api
      .get('spectacles', { params: { order: 'DESC', page } })
      .then((response) => setSpectacles(response.data));
  }, [page]);

  const handleAddShow = useCallback(
    async (formData) => {
      try {
        const formatedData = {
          ...formData,
          date: format(new Date(formData.date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
          // eslint-disable-next-line radix
          public: parseInt(formData.public),
        };

        const spectacleAdded = await api.post<ISpectacle>(
          'spectacles',
          formatedData,
        );

        const updatedSpectacles = [...spectacles, spectacleAdded.data];

        updatedSpectacles.slice(0, page * 20);

        setSpectacles(updatedSpectacles);

        addToast({
          type: 'success',
          title: 'Show adicionado',
          description: 'O show foi adicionado com sucesso',
        });

        formAddRef.current?.reset();
      } catch (err) {
        let description = 'Ocorreu um erro ao adicionar o show';

        if (err) description = err.response.data.message;

        addToast({
          type: 'error',
          title: 'Erro ao adicionar o show',
          description,
        });
      }
    },
    [addToast, page, spectacles],
  );

  const handleSetUpdate = useCallback(
    (id: string) => {
      setSelectedSpectacle(id);

      const findedSpectacle = spectacles.find(
        (spectacle) => spectacle.id === id,
      );

      if (findedSpectacle) {
        const formatedData = {
          ...findedSpectacle,
          date: format(new Date(findedSpectacle.date), 'yyyy-MM-dd'),
        };

        formUpdateRef.current?.setData(formatedData);
      }
    },
    [spectacles],
  );

  const handleUpdateCompetition = useCallback(
    async (formData) => {
      try {
        const spectacleWillUpdate = spectacles.find(
          (spectacle) => spectacle.id === selectedSpectacle,
        );

        if (spectacleWillUpdate) {
          const formatedData = {
            ...formData,
            date: format(
              new Date(formData.date),
              "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
            ),
          };

          const spectacleUpdated = await api.put<ISpectacle>(
            `spectacles/${spectacleWillUpdate.id}`,
            formatedData,
          );

          const updatedSpectacles = spectacles.map((spectacle) => {
            if (spectacle.id === spectacleUpdated.data.id) {
              return spectacleUpdated.data;
            }

            return spectacle;
          });

          updatedSpectacles.slice(0, page * 20);

          setSpectacles(updatedSpectacles);

          formUpdateRef.current?.reset();

          addToast({
            type: 'success',
            title: 'Show alterado',
            description: 'O show foi alterado com sucesso',
          });
        }
      } catch (err) {
        let description = 'Ocorreu um erro ao alterar o show';

        if (err) description = err.response.data.message;

        addToast({
          type: 'error',
          title: 'Erro ao alterar o show',
          description,
        });
      }
    },
    [addToast, page, selectedSpectacle, spectacles],
  );

  const handleDeleteCompetition = useCallback(
    async (id: string) => {
      await api.delete(`spectacles/${id}`);

      const updatedSpectacles = spectacles.filter(
        (spectacle) => spectacle.id !== id,
      );

      updatedSpectacles.slice(0, (page - 1) * 20);

      setSpectacles(updatedSpectacles);
    },
    [page, spectacles],
  );

  return (
    <Container>
      <SideMenu />

      <Content>
        <Table>
          <header>
            <strong>Shows</strong>

            <TablePagination>
              <FiArrowLeft
                size={16}
                color="#4f4f4f"
                onClick={
                  () =>
                    setPage((oldValue) =>
                      oldValue > 1 ? oldValue - 1 : oldValue,
                    )
                  // eslint-disable-next-line react/jsx-curly-newline
                }
              />
              <span>
                Pagina: <strong>{page}</strong>
              </span>
              <FiArrowRight
                size={16}
                color="#4f4f4f"
                onClick={() => setPage((oldValue) => oldValue + 1)}
              />
            </TablePagination>
          </header>

          <TableContent>
            <section>
              <strong>Tema</strong>
              {spectacles.map((spectacle) => (
                <TableRow key={`${spectacle.id}theme`}>
                  {spectacle.theme}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>Local</strong>
              {spectacles.map((spectacle) => (
                <TableRow key={`${spectacle.id}local`}>
                  {spectacle.local}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>Data</strong>
              {spectacles.map((spectacle) => (
                <TableRow key={`${spectacle.id}date`}>
                  {format(new Date(spectacle.date), 'dd/MM/yyyy')}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>Publico</strong>
              {spectacles.map((spectacle) => (
                <TableRow key={`${spectacle.id}public`}>
                  {spectacle.public}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>
                <FiSettings size={18} />
              </strong>
              {spectacles.map((spectacle) => (
                <TableRow key={`${spectacle.id}settings`}>
                  <FiEdit2
                    onClick={() => handleSetUpdate(spectacle.id)}
                    size={14}
                    color="#6FCF97"
                  />
                  <FiTrash
                    onClick={() => handleDeleteCompetition(spectacle.id)}
                    size={14}
                    color="#EB5757"
                  />
                </TableRow>
              ))}
            </section>
          </TableContent>
        </Table>

        <ContentEditions>
          <AddEdition ref={formAddRef} onSubmit={handleAddShow}>
            <strong>Adicionar novo show</strong>
            <Input name="theme" placeholder="Tema" />
            <Input name="local" placeholder="Local" />
            <Input name="date" type="date" placeholder="Data" />
            <Input name="public" type="number" placeholder="Público" />
            <Button type="submit">Adicionar</Button>
          </AddEdition>
          <AlterEdition ref={formUpdateRef} onSubmit={handleUpdateCompetition}>
            <strong>Alterar um show</strong>
            <Input name="theme" placeholder="Tema" />
            <Input name="local" placeholder="Local" />
            <Input name="date" type="date" placeholder="Data" />
            <Input name="public" type="number" placeholder="Público" />
            <Button type="submit">Alterar</Button>
          </AlterEdition>
        </ContentEditions>
      </Content>
    </Container>
  );
};

export default Spectacles;
