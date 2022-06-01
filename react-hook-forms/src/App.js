import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormLogo from "./assets/form-logo.png";

import "./App.css";

const schema = yup
  .object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup
      .string()
      .email("Digite um email Válido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 dígitos")
      .required("A senha é obrigatório"),
    confirmPassword: yup
      .string()
      .required("Confirmar a senha é obrigatório")
      .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
  })
  .required();

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(watch("name"));

  function onSubmit(userData) {
    console.log(userData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <img src={FormLogo} alt="" />
      <label>
        Nome
        <input type="text" {...register("name", { required: true })} />
        <span>{errors.name?.message}</span>
      </label>
      <label>
        Email
        <input type="text" {...register("email", { required: true })} />
        <span>{errors.email?.message}</span>
      </label>
      <label>
        Senha
        <input type="password" {...register("password", { required: true })} />
        <span>{errors.password?.message}</span>
      </label>
      <label>
        Confirmar Senha
        <input
          type="password"
          {...register("confirmPassword", { required: true })}
        />
        <span>{errors.confirmPassword?.message}</span>
      </label>

      <button type="submit">Cadastrar-se</button>
    </form>
  );
}

export default App;
