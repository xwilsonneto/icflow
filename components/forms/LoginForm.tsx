"use client";

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc'; // Ícone do Google

const LoginForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [session, status, router]);

  const handleLogin = async () => {
    const result = await signIn("google", { redirect: false });
  
    if (result?.error) {
      console.error(result.error); // Para depuração
    } else {
      router.push("/"); // Redireciona para a página inicial se o login for bem-sucedido
    }
  };    

  return (
    <section>
      <form className="space-y-6 flex-1" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <section className='mb-8 space-y-4'>
          <h1 className='header'>Ic-Flow</h1>
          <p className='text-dark-700'>Organizando a loucura</p>
        </section>
        <button 
          type="submit" // Para o botão enviar o formulário
          className='flex items-center justify-center bg-white text-purple-1 border border-gray-300 rounded-md h-[36px] w-full transition hover:bg-gray-100'
        >
          <FcGoogle className='mr-2' /> {/* Ícone do Google */}
          Faça o login com sua conta Google
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
