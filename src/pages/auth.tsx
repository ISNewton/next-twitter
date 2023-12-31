import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
import Button from '@/components/base/Button'
import LoadingPage from '@/components/home/LoadingPage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const session = useSession()
  const router = useRouter()

  if(session.status === 'loading') {
    return <LoadingPage />
  }
  if(session.status === 'authenticated') {
    router.push('/')
    return
  }

  return (
    <div className="bg-gray-900 ">
      <div className="flex min-h-screen items-center justify-center">
        <div className="min-h-1/2 bg-gray-900  border border-gray-900 rounded-2xl">
          <div className="mx-4 sm:mx-24 md:mx-34 lg:mx-56 mx-auto  flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
            <svg
              viewBox="0 0 24 24"
              className=" h-12 w-12 text-white"
              fill="currentColor"
            >
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg>

            <h1 className="text-white text-2xl">Welcome To Twitter!</h1>
            { isLogin && <LoginForm />}
            { !isLogin && <RegisterForm />}
            <p>
              {isLogin ? "Don't have an account ? " : 'Already have an account ? '}
              <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-white">
                {" "}{isLogin ?  'Create an account.' : 'Login' }
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
