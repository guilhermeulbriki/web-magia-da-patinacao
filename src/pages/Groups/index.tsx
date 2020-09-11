import React from 'react';
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

const Groups: React.FC = () => {
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
            <span className="active">Seberi</span>
            <span>Frederico Westphalen</span>
            <span>Palmitinho</span>
            <span>Seberi</span>
            <span>Taquaruçu do Sul</span>
          </GroupsListCities>

          <GroupsList>
            <Group index={1}>
              <header>
                <strong>Branca</strong>

                <aside>
                  <span className="city">Frederico Westphalen</span>
                  <span className="teacher">Julia Girardello Frizon</span>
                </aside>
              </header>

              <GroupSchedules>
                <main>
                  <GroupSchedule>
                    <p>Segunda</p>

                    <span>8: 30 - 9:30</span>
                    <span>10: 30 - 11:30</span>
                  </GroupSchedule>

                  <GroupSchedule>
                    <p>Quinta</p>

                    <span>8: 30 - 9:30</span>
                  </GroupSchedule>
                </main>

                <aside>
                  <FiEdit2 color="#219653" />
                  <FiTrash color="#EB5757" />
                  <FiPlus color="#F2994A" />
                </aside>
              </GroupSchedules>
            </Group>

            <Group index={2}>
              <header>
                <strong>Branca</strong>

                <aside>
                  <span className="city">Frederico Westphalen</span>
                  <span className="teacher">Julia Girardello Frizon</span>
                </aside>
              </header>

              <GroupSchedules>
                <main>
                  <GroupSchedule>
                    <p>Segunda</p>

                    <span>8: 30 - 9:30</span>
                    <span>10: 30 - 11:30</span>
                  </GroupSchedule>

                  <GroupSchedule>
                    <p>Quinta</p>

                    <span>8: 30 - 9:30</span>
                  </GroupSchedule>
                </main>

                <aside>
                  <FiEdit2 color="#219653" />
                  <FiTrash color="#EB5757" />
                  <FiPlus color="#F2994A" />
                </aside>
              </GroupSchedules>
            </Group>

            <Group index={3}>
              <header>
                <strong>Branca</strong>

                <aside>
                  <span className="city">Frederico Westphalen</span>
                  <span className="teacher">Julia Girardello Frizon</span>
                </aside>
              </header>

              <GroupSchedules>
                <main>
                  <GroupSchedule>
                    <p>Segunda</p>

                    <span>8: 30 - 9:30</span>
                    <span>10: 30 - 11:30</span>
                  </GroupSchedule>

                  <GroupSchedule>
                    <p>Quinta</p>

                    <span>8: 30 - 9:30</span>
                  </GroupSchedule>
                </main>

                <aside>
                  <FiEdit2 color="#219653" />
                  <FiTrash color="#EB5757" />
                  <FiPlus color="#F2994A" />
                </aside>
              </GroupSchedules>
            </Group>
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
