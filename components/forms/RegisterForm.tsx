"use client";

import { FormEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiLogoGoogle } from 'react-icons/bi';
import { BiSolidShow } from 'react-icons/bi';
import { BiSolidHide } from 'react-icons/bi';
import { Button } from "../ui/button";

const Signup = () => {
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`, {
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
      });

      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        
        <section className="mb-8 space-y-4">
          <h1 className="header">Registre-se</h1>
        </section>
        {error && <div className="">{error}</div>}
        <div className="flex flex-col gap-4">
          <label className="text-white size-3">Nome completo:</label>
          <input
            type="text"
            placeholder="nome"
            className="shad-input border-0 w-full pl-[14px] rounded-md"
            name="name"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-white size-3">Email:</label>
          <input
            type="email"
            placeholder="email"
            className="shad-input border-0 w-full pl-[14px] rounded-md"
            name="email"
          />
        </div>
        <div className="flex flex-col gap-4">
        <label className="text-white size-3">Senha:</label>
          <div className="flex w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="senha"
              className="shad-input border-0 w-full pl-[14px] rounded-md"
              name="password"
            />
            <button
              className="w-2/12 bg-dark-400 flex items-center justify-center transition duration-150 ease hover:bg-[#1A1A1A]"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword)
              }}
            >
              {showPassword ? <BiSolidHide /> : <BiSolidShow />}
            </button>
          </div>
        </div>
        <Button
            type="submit"
            className="shad-primary-btn rounded-md h-[36px] w-full transition"
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Registre-se"}
        </Button>
        <Link href="/">
          <p className="text-white text-14-regular mt-4">Já tem acesso? <b>Faça login</b></p>
        </Link>
      </form>
    </section>
  );
}

export default Signup;