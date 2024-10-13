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

const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Email must be a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(255, 'Password must be less than 255 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ),
  position: z.string().min(3, 'Position must be at least 3 characters long'),
})

type TRegisterForm = z.infer<typeof registerSchema>

export const RegisterForm = () => {
  const { control, handleSubmit } = useForm<TRegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: TRegisterForm) => {
    toast.info('Not implemented yet')
    console.log(data)
  }

  return (
    <>
      <form
        className="flex w-full flex-col gap-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          control={control}
          name="name"
          componentProps={{
            required: true,
            label: 'Name',
            type: 'text',
            htmlAttributes: {
              placeholder: 'Enter your name',
            },
          }}
        />
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
        <FormInput
          control={control}
          name="position"
          componentProps={{
            required: true,
            label: 'Position',
            type: 'text',
            htmlAttributes: {
              placeholder: 'Enter your position',
            },
          }}
        />
        <Button
          className="mt-2"
          label="Register"
          htmlAttributes={{ type: 'submit' }}
        />
      </form>

      <span className="w-full text-center text-xs text-dianne-100/50">
        Already have an account?{' '}
        <Link className="font-bold text-dianne-50/80" href="/login">
          Log-in
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
    </>
  )
}
