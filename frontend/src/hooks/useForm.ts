import { useForm as RHFUseForm, UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type FormData<Schema extends yup.AnyObjectSchema> = yup.InferType<Schema>;

export const useForm = <Schema extends yup.AnyObjectSchema>({
  schema,
  ...restConfigs
}: {
  schema: Schema;
} & UseFormProps<FormData<Schema>>) => {
  return RHFUseForm<FormData<Schema>>({
    resolver: yupResolver(schema),
    ...restConfigs,
  });
};
