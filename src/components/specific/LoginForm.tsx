'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../common/Button'
import { OrSeparator } from '../common/OrSeparator'
import { FormInput } from '../form/FormInput'

const loginSchema = z.object({
  email: z.string().email('Email must be a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

type TLoginForm = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: TLoginForm) => {
    toast.info('Not implemented yet')
    console.log(data)
  }

  return (
    <>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          control={control}
          name="email"
          componentProps={{
            required: true,
            label: 'E-mail',
            type: 'email',
            htmlAttributes: {
              placeholder: 'Enter your e-mail address',
            },
          }}
        />
        <FormInput
          control={control}
          name="password"
          componentProps={{
            required: true,
            label: 'Password',
            type: 'password',
            htmlAttributes: {
              placeholder: 'Enter your password',
            },
          }}
        />
        <Button htmlAttributes={{ type: 'submit' }}>Login</Button>

        <span className="w-full text-center text-xs text-dianne-100/50">
          Don&apos;t Have An Account?{' '}
          <Link className="font-bold text-dianne-50/80" href="/register">
            Register
          </Link>
        </span>

        <OrSeparator />
        <div className="flex flex-col gap-2">
          <Button
            className="bg-white text-black hover:bg-white/80"
            label="Sign in with Google"
            variant="with-icon"
            icon={
              <Image
                src={'/static/logos/google.png'}
                alt="Google Icon"
                width={20}
                height={20}
                quality={100}
              />
            }
          />
          <Button
            className="bg-[#262626] text-dianne-50 hover:bg-[#262626]/80"
            label="Sign in with GitHub"
            variant="with-icon"
            icon={
              <Image
                src={'/static/logos/github.png'}
                alt="GitHub Icon"
                width={20}
                height={20}
                quality={100}
              />
            }
          />
        </div>
      </form>
    </>
  )
}
