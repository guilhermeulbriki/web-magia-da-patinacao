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

interface ISpectacle {
  id: string;
  theme: string;
  local: string;
  public: string;
  date: Date;
}

const Spectacles: React.FC = () => {
  const [spectacles, setSpectacles] = useState<ISpectacle[]>([]);

  const { data } = useFetch<ISpectacle[]>('/spectacles', {
    params: { order: 'DESC' },
  });

  useEffect(() => {
    if (data) setSpectacles(data);
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
                  {spectacle.date}
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
                  <FiEdit2 size={14} color="#6FCF97" />
                  <FiTrash size={14} color="#EB5757" />
                </TableRow>
              ))}
            </section>
          </TableContent>
        </Table>

        <ContentEditions>
          <AddEdition onSubmit={() => {}}>
            <strong>Adicionar novo show</strong>
            <Input name="theme" placeholder="Tema" />
            <Input name="local" placeholder="Local" />
            <Input name="date" type="date" placeholder="Data" />
            <Input name="public" type="number" placeholder="Público" />
            <Button>Adicionar</Button>
          </AddEdition>
          <AlterEdition onSubmit={() => {}}>
            <strong>Alterar um show</strong>
            <Input name="theme" placeholder="Tema" />
            <Input name="local" placeholder="Local" />
            <Input name="date" type="date" placeholder="Data" />
            <Input name="public" type="number" placeholder="Público" />
            <Button>Alterar</Button>
          </AlterEdition>
        </ContentEditions>
      </Content>
    </Container>
  );
};

export default Spectacles;
