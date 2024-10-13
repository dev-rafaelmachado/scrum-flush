import Image from 'next/image'

import { RegisterForm } from '@/components/specific/RegisterForm'

export default function Register() {
  return (
    <main className="flex h-screen w-screen items-center justify-center overflow-hidden bg-background-dark">
      <div className="absolute left-0 top-0 h-full overflow-hidden">
        <Image
          src="/static/svg/left-login.svg"
          alt="SVG"
          layout="responsive"
          width={277}
          height={1117}
          quality={100}
          objectFit="contain"
        />
      </div>
      <div className="absolute right-0 top-0 h-full overflow-hidden">
        <Image
          src="/static/svg/right-login.svg"
          alt="SVG"
          layout="responsive"
          width={237}
          height={1107}
          quality={100}
          objectFit="contain"
        />
      </div>

      <div
        className="flex w-2/5 flex-col gap-2 rounded-lg border-4 border-white bg-[#141d20] p-8 text-white shadow-xl"
        style={{ backdropFilter: 'blur(21.600000381469727px)' }}
      >
        <h1 className="mt-2 text-left text-xl font-normal">
          Create Your Account
        </h1>
        <RegisterForm />
      </div>
    </main>
  )
}
