import Image from 'next/image'

import { LoginForm } from '@/components/specific/LoginForm'

export default function Login() {
  return (
    <main className="relative flex h-screen w-screen items-start justify-center overflow-hidden bg-background-dark py-16">
      <div className="absolute bottom-0 h-min w-full overflow-hidden">
        <Image
          src="/static/svg/bottom-login.svg"
          alt="SVG"
          layout="responsive"
          width={1728}
          height={246}
          quality={100}
          objectFit="contain"
        />
      </div>
      <div
        className="flex flex-col gap-6 rounded-lg border-4 border-white bg-[#141d20] p-8 text-white shadow-xl xl:w-2/5 2xl:w-1/3"
        style={{ backdropFilter: 'blur(21.600000381469727px)' }}
      >
        <h1 className="mt-2 text-left text-xl font-normal">
          Enter your account
        </h1>
        <LoginForm />
      </div>
    </main>
  )
}
