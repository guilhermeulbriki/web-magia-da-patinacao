import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import putFirstLetterUperCase from '../../utils/putFirstLetterUperCase';
import { useAuth } from '../../hooks/Auth';

import { Container, Profile, Content } from './styles';
import logo from '../../assets/logo.svg';
import pointer from '../../assets/pointer.svg';
import manAvatar from '../../assets/man-avatar.png';
import dashboard from '../../assets/menu/dashboard.svg';
import enrollments from '../../assets/menu/family-skating.svg';
import students from '../../assets/menu/girl.svg';
import groups from '../../assets/menu/groups.svg';
import competitions from '../../assets/menu/competitions.svg';
import spectacles from '../../assets/menu/megaphone.svg';
import directors from '../../assets/menu/directors.svg';

const SideMenu: React.FC = () => {
  const { admin } = useAuth();
  const location = useLocation();

  return (
    <Container>
      <Profile>
        <section>
          <span>Bem vindo,</span>
          <strong>{putFirstLetterUperCase(admin.name)}</strong>
        </section>

        <Link to="/profile">
          <img src={manAvatar} alt="avatar" />
        </Link>
      </Profile>

      <Content>
        <div className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">
            <img src={dashboard} alt="dashboard" />
            <span>Dashboard</span>
          </Link>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/enrollments' ? 'active' : ''}>
          <Link to="/enrollments">
            <img src={enrollments} alt="enrollments" />
            <span>Associados, matrículas e desistências</span>
          </Link>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/students' ? 'active' : ''}>
          <Link to="/students">
            <img src={students} alt="students" />
            <span>Alunos</span>
          </Link>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/groups' ? 'active' : ''}>
          <Link to="/groups">
            <img src={groups} alt="groups" />
            <span>Turmas</span>
          </Link>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/competitions' ? 'active' : ''}>
          <Link to="/competitions">
            <img src={competitions} alt="competitions" />
            <span>Competições</span>
          </Link>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/spectacles' ? 'active' : ''}>
          <Link to="/spectacles">
            <img src={spectacles} alt="spectacles" />
            <span>Shows</span>
          </Link>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/directors' ? 'active' : ''}>
          <Link to="/directors">
            <img src={directors} alt="directors" />
            <span>Diretorias</span>
          </Link>

          <img src={pointer} alt="pointer" />
        </div>

        <div className={location.pathname === '/register' ? 'active' : ''}>
          <Link to="/register">
            <img src={directors} alt="create-director" />
            <span>Cadastrar administrador</span>
          </Link>

          <img src={pointer} alt="pointer" />
        </div>
      </Content>

      <img src={logo} alt="Magia da Patinação" />
    </Container>
  );
};

export default SideMenu;
