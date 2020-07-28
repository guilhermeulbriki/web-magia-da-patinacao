import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, SignIn, FormContent, Inputs } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/Toast';
import logo from '../../assets/logo.svg';
import signUpImage from '../../assets/signup-image.png';
import getValidationError from '../../utils/getValidationError';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  phone: number;
  whatsapp?: number;
  code: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

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
          code: Yup.string().required('Código obrigatório'),
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
              acessCode: data.code,
            },
          },
        );

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você ja pode fazer seu logon',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Magia da Patinação" />

        <FormContent>
          <h1>Preencha suas informações</h1>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Inputs>
              <article>
                <Input name="name" placeholder="Nome completo" />
                <Input name="email" placeholder="E-mail" type="email" />
                <Input name="password" placeholder="Senha" type="password" />
                <Input name="code" placeholder="Código" type="password" />
              </article>

              <article>
                <Input name="phone" placeholder="Telefone" type="number" />
                <Input name="whatsapp" placeholder="Whatsapp" type="number" />
              </article>
            </Inputs>

            <Button type="submit">Cadastrar</Button>
          </Form>
          <SignIn>
            <span>Já possui uma conta?</span>
            <Link to="/">Faça seu logon</Link>
          </SignIn>
        </FormContent>

        <img src={signUpImage} className="signup" alt="Sign-up" />
      </Content>
    </Container>
  );
};

export default SignUp;
