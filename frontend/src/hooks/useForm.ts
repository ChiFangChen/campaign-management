import { useForm as RHFUseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type FormData<Schema extends yup.AnyObjectSchema> = yup.InferType<Schema>;

export const useForm = ({
  schema,
  ...restConfigs
}: {
  schema: yup.AnyObjectSchema;
} & Parameters<typeof RHFUseForm>) => {
  return RHFUseForm<FormData<typeof schema>>({
    resolver: yupResolver(schema),
    ...restConfigs,
  });
};
