import AuthForm from '@/components/AuthForm';
import React from 'react';

export const runtime = 'edge';

const SignIn = () => {
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type="sign-in"/>
    </section>
  )
}

export default SignIn