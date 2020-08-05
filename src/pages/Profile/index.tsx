import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiLock,
  FiPower,
  FiPhone,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useAuth } from '../../hooks/Auth';
import manAvatar from '../../assets/avatar.svg';
import { Container, Content, AvatarInput } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/Toast';
import api from '../../services/api';
import getValidationError from '../../utils/getValidationError';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { admin, updateAdmin, signOut } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          phone: Yup.string().required('Telefone obrigatório'),
          whatsapp: Yup.string(),
          old_password: Yup.string().required('Senha obrigatória'),
          password: Yup.string(),
          password_confirmation: Yup.string()
            .when('password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          phone,
          whatsapp,
          old_password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          phone,
          whatsapp,
          password: old_password,
          newPassword: password_confirmation,
        };

        const response = await api.put('/admins/profile', formData, {
          params: {
            id: admin.id,
          },
        });

        updateAdmin(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar suas informações, tente novamente.',
        });
      }
    },
    [addToast, admin.id, history, updateAdmin],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
          <FiPower onClick={signOut} />
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            whatsapp: admin.whatsapp,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={manAvatar} alt="Avatar" />
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="phone" icon={FiPhone} placeholder="Telefone" />
          <Input name="whatsapp" icon={FaWhatsapp} placeholder="WhatsApp" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
