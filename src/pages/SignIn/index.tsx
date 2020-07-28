import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';
import getValidationError from '../../utils/getValidationError';

import { Container, Content, SignUp, SideBackground } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

interface SignInData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autentificação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [addToast, history, signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Magia da Patinação" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" placeholder="E-mail" type="email" icon={FiMail} />
          <Input
            name="password"
            placeholder="Senha"
            type="password"
            icon={FiLock}
          />
          <Button type="submit">Logar</Button>

          <SignUp>
            <span>Não possui uma conta?</span>
            <Link to="/signup">Cadastre-se</Link>
          </SignUp>
        </Form>

        <SideBackground />
      </Content>
    </Container>
  );
};

export default SignIn;
