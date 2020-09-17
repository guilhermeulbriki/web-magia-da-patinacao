import React, { useEffect, useState } from 'react';
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
import { useFetch } from '../../hooks/useFetch';
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
  const [directors, setDirectors] = useState<IDirector[]>([]);

  const { data } = useFetch<IDirector[]>('/directors');

  useEffect(() => {
    if (data) setDirectors(data);
  }, [data]);

  return (
    <Container>
      <SideMenu />

      <Content>
        <Table>
          <header>
            <strong>Competições</strong>

            <TablePagination>
              <FiArrowLeft size={16} color="#4f4f4f" />
              <span>
                Pagina: <strong>1</strong>
              </span>
              <FiArrowRight size={16} color="#4f4f4f" />
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
                  {director.start}
                </TableRow>
              ))}
            </section>
            <section>
              <strong>Término</strong>
              {directors.map((director) => (
                <TableRow key={`${director.id}end`}>{director.end}</TableRow>
              ))}
            </section>
            <section>
              <strong>
                <FiSettings size={18} />
              </strong>
              {directors.map((director) => (
                <TableRow key={`${director.id}settings`}>
                  <FiEdit2 size={14} color="#6FCF97" />
                  <FiTrash size={14} color="#EB5757" />
                </TableRow>
              ))}
            </section>
          </TableContent>
        </Table>

        <ContentEditions>
          <AddEdition onSubmit={() => {}}>
            <strong>Adicionar nova diretoria</strong>
            <Input name="president" placeholder="Presidente" />
            <Input name="vice" placeholder="Vice-presidente" />
            <Input name="start" placeholder="Início" type="date" />
            <Input name="end" placeholder="Fim" type="date" />
            <Button>Adicionar</Button>
          </AddEdition>
          <AlterEdition onSubmit={() => {}}>
            <strong>Alterar uma diretoria</strong>
            <Input name="president" placeholder="Presidente" />
            <Input name="vice" placeholder="Vice-presidente" />
            <Input name="start" placeholder="Início" type="date" />
            <Input name="end" placeholder="Fim" type="date" />
            <Button>Alterar</Button>
          </AlterEdition>
        </ContentEditions>
      </Content>
    </Container>
  );
};

export default Directors;
