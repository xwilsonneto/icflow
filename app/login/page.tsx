import LoginForm from '@/components/forms/LoginForm';
import Image from 'next/image';
import React from 'react';

const Login = () => {
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[496px]'>
          <Image 
            src="/icons/iclogobranca.PNG"
            height={1000}
            width={1000}
            alt='iclogo'
            className='mb-12 h-10 w-fit'
          />
          <LoginForm />
          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © 2024 The Experience Lab.
            </p>
          </div>
        </div>
      </section>
      <Image 
        src="/assets/images/equipe.PNG"
        height={1000}
        width={1000}
        alt='equipe'
        className='side-img max-w-[50%]'
      />
    </div>
  );
}

export default Login;
