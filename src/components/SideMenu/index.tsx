import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import { Container, Profile, Content } from './styles';

import logo from '../../assets/logo.svg';
import pointer from '../../assets/pointer.svg';
import manAvatar from '../../assets/man-avatar.png';
import dashboard from '../../assets/menu/dashboard.svg';
import enrollments from '../../assets/menu/familySkating.svg';
import students from '../../assets/menu/girl.svg';
import groups from '../../assets/menu/groups.svg';
import competitions from '../../assets/menu/competitions.svg';
import spectacles from '../../assets/menu/megaphone.svg';
import directors from '../../assets/menu/directors.svg';

const SideMenu: React.FC = () => {
  const location = useLocation();

  return (
    <Container>
      <Profile>
        <section>
          <span>Bem vindo,</span>
          <strong>Guilherme Ulbriki</strong>
        </section>

        <img src={manAvatar} alt="avatar" />
      </Profile>

      <Content>
        <div className={location.pathname === '/dashboard' ? 'active' : ''}>
          <span>
            <img src={dashboard} alt="dashboard" />
            <Link to="/dashboard">Dashboard</Link>
          </span>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/enrollments' ? 'active' : ''}>
          <span>
            <img src={enrollments} alt="enrollments" />
            <Link to="/enrollments">Associados, matrículas e desistências</Link>
          </span>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/students' ? 'active' : ''}>
          <span>
            <img src={students} alt="students" />
            <Link to="/students">Alunos</Link>
          </span>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/groups' ? 'active' : ''}>
          <span>
            <img src={groups} alt="groups" />
            <Link to="/groups">Turmas</Link>
          </span>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/competitions' ? 'active' : ''}>
          <span>
            <img src={competitions} alt="competitions" />
            <Link to="/competitions">Competições</Link>
          </span>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/spectacles' ? 'active' : ''}>
          <span>
            <img src={spectacles} alt="spectacles" />
            <Link to="/spectacles">Shows</Link>
          </span>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/directors' ? 'active' : ''}>
          <span>
            <img src={directors} alt="directors" />
            <Link to="/directors">Diretorias</Link>
          </span>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/register' ? 'active' : ''}>
          <span>
            <img src={directors} alt="create-director" />
            <Link to="/register">Cadastrar administrador</Link>
          </span>

          <img src={pointer} alt="pointer" />
        </div>
      </Content>

      <img src={logo} alt="Magia da Patinação" />
    </Container>
  );
};

export default SideMenu;
