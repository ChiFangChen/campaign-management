import { useForm as ReactHookFormUseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type FormData<Schema extends yup.AnyObjectSchema> = yup.InferType<Schema>;

export const useForm = ({
  schema,
  ...restConfigs
}: {
  schema: yup.AnyObjectSchema;
} & Parameters<typeof ReactHookFormUseForm>) => {
  return ReactHookFormUseForm<FormData<typeof schema>>({
    resolver: yupResolver(schema),
    ...restConfigs,
  });
};
