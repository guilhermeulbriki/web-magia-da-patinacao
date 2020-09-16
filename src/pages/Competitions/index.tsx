import React, { useEffect, useState } from 'react';
import {
  FiSettings,
  FiTrash,
  FiEdit2,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi';

import {
  Container,
  Content,
  Table,
  TableContent,
  TableRow,
  TablePagination,
  ContentEditions,
  AddEdition,
  AlterEdition,
} from './styles';
import SideMenu from '../../components/SideMenu';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useFetch } from '../../hooks/useFetch';

interface ICompetition {
  id: string;
  name: string;
  city: string;
  category: string;
  award: 1 | 2 | 3 | 4 | 5;
  student_name: string;
}

const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);

  const { data } = useFetch<ICompetition[]>('/competitions');

  useEffect(() => {
    if (data) setCompetitions(data);
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
              {competitions.map((competition) => (
                <TableRow key={`${competition.id}settings`}>
                  <FiEdit2 size={14} color="#6FCF97" />
                  <FiTrash size={14} color="#EB5757" />
                </TableRow>
              ))}
            </section>
          </TableContent>
        </Table>

        <ContentEditions>
          <AddEdition onSubmit={() => {}}>
            <strong>Adicionar nova competição</strong>
            <Input name="name" placeholder="Nome" />
            <Input name="city" placeholder="Cidade" />
            <Input name="student" placeholder="Aluno(a)" />
            <Input name="category" placeholder="Categoria" />
            <Button>Adicionar</Button>
          </AddEdition>
          <AlterEdition onSubmit={() => {}}>
            <strong>Alterar uma competição</strong>
            <Input name="name" placeholder="Nome" />
            <Input name="city" placeholder="Cidade" />
            <Input name="student" placeholder="Aluno(a)" />
            <Input name="category" placeholder="Categoria" />
            <Button>Alterar</Button>
          </AlterEdition>
        </ContentEditions>
      </Content>
    </Container>
  );
};

export default Competitions;
