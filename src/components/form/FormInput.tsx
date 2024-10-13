import {
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useCallback,
  useImperativeHandle,
} from 'react'
import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  useController,
} from 'react-hook-form'

import { Eye } from '@phosphor-icons/react/dist/ssr'
import { tv } from 'tailwind-variants'

const inputStyles = tv({
  base: 'relative block w-full px-4 py-3 rounded-lg sm:text-sm focus:outline-none bg-transparent text-dianne-50 placeholder:text-dianne-100/50',
  variants: {
    variant: {
      default:
        'border-2 border-dianne-50 focus:border-indigo-500 focus:ring-indigo-500',
      filled:
        'border-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500',
    },
    error: {
      true: 'border-red-500',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    error: false,
  },
})

type BaseInputProps = {
  label: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  variant?: 'default' | 'filled'
  error?: string
  icon?: React.ReactNode
  required?: boolean
  htmlAttributes?: InputHTMLAttributes<HTMLInputElement>
}

type FormInputProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  defaultValue?: FieldPathValue<T, FieldPath<T>>
  componentProps: BaseInputProps
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      label,
      type = 'text',
      variant = 'default',
      error,
      icon,
      required = false,
      htmlAttributes,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    useImperativeHandle(ref, () => inputRef.current!)

    const handleEyeClick = useCallback(() => {
      if (inputRef.current) {
        inputRef.current.type =
          inputRef.current.type === 'text' ? 'password' : 'text'
      }
    }, [])

    return (
      <div className={`flex flex-col gap-2 ${error ? 'mb-0' : 'mb-1'}`}>
        <label className="block text-sm font-medium text-dianne-100">
          {label} {required && <span className="">*</span>}
        </label>
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {icon}
            </div>
          )}
          <input
            {...htmlAttributes}
            type={type}
            className={inputStyles({ variant, error: Boolean(error) })}
            ref={inputRef}
          />
          {type === 'password' && (
            <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3">
              <Eye
                size={32}
                className="h-5 w-5 text-dianne-50 transition-colors duration-100 ease-in-out hover:text-dianne-200"
                onClick={handleEyeClick}
              />
            </div>
          )}
        </div>
        {error && <p className="mt-0 text-sm text-purpose-error">{error}</p>}
      </div>
    )
  },
)

BaseInput.displayName = 'BaseInput'

function FormInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  componentProps,
}: FormInputProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: (defaultValue || '') as FieldPathValue<T, FieldPath<T>>,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
    componentProps.htmlAttributes?.onChange?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur()
    componentProps.htmlAttributes?.onBlur?.(e)
  }

  return (
    <BaseInput
      {...componentProps}
      variant={componentProps.variant}
      error={error?.message}
      ref={ref}
      htmlAttributes={{
        ...componentProps.htmlAttributes,
        onChange: handleChange,
        onBlur: handleBlur,
        value,
      }}
    />
  )
}

export { FormInput }
