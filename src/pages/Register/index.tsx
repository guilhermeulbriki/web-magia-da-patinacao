import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container, Content, Inputs } from './styles';
import SideMenu from '../../components/SideMenu';
import Input from '../../components/Input';
import Button from '../../components/Button';
import signUpImage from '../../assets/signup-image.png';
import { useToast } from '../../hooks/Toast';
import api from '../../services/api';
import getValidationError from '../../utils/getValidationError';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  phone: number;
  whatsapp?: number;
}

const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          phone: Yup.string()
            .min(11, 'Número com 11 digitos')
            .max(11, 'Número com 11 digitos')
            .required('Telefone obrigatório'),
          whatsapp: Yup.string().notRequired(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(
          '/admins',
          {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            whatsapp: data.whatsapp,
          },
          {
            params: {
              acessCode: 'e4dc60de383acfb2bb92123bbd3f7227',
            },
          },
        );

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você ja pode fazer seu logon',
        });

        formRef.current?.reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }

        let description = 'Ocorreu um erro ao alterar a competição';

        if (err) description = err.response.data.message;

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description,
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <SideMenu />

      <Content>
        <h1>Preencha as informações</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Inputs>
            <Input name="name" placeholder="Nome completo" />
            <Input name="email" placeholder="E-mail" type="email" />
            <Input name="password" placeholder="Senha" type="password" />
            <Input name="phone" placeholder="Telefone" type="number" />
            <Input name="whatsapp" placeholder="Whatsapp" type="number" />
          </Inputs>

          <Button type="submit">Cadastrar</Button>
        </Form>

        <img src={signUpImage} className="signup" alt="Sign-up" />
      </Content>
    </Container>
  );
};

export default Register;
