import Image from 'next/image';
import AuthForm from './components/AuthForm';
export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8 bg-grey-100">
      <div className="sm: mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          src="/images/logo.png"
          height={48}
          width={48}
          className="mx-auto w-auto"
        />
        <h2 className="mt-6 text-center font-bold text-3xl tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
