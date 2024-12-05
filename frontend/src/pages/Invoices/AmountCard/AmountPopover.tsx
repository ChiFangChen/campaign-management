import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { InferType, object, number } from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit } from 'lucide-react';

import { cn } from '@/lib/utils';
import { formatAmount } from '@/lib/formatter-utils';
import { useForm, useToast } from '@/hooks';
import { updateInvoice } from '@/apis';
import { moduleName } from '@/queries/invoices';
import { Popover, PopoverContent, PopoverTrigger, Input, Button, Loader } from '@/components';

const schema = object().shape({
  amount: number().typeError('Please input number').nullable().required('The field is required'),
});

type FormData = InferType<typeof schema>;

export type AmountPopoverType = 'adjustments' | 'final';

type AmountPopoverProps = {
  name: string;
  type: AmountPopoverType;
  amount: number;
  totalActualAmount: number;
};

export const AmountPopover = ({ name, type, amount, totalActualAmount }: AmountPopoverProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { id } = useParams() as { id: string };
  const [editPopoverOpen, setEditPopoverOpen] = useState(false);
  const {
    handleSubmit,
    control,
    reset: formReset,
    formState: { errors },
  } = useForm({
    schema,
  });

  const { isPending, reset, mutate } = useMutation({
    mutationFn: updateInvoice,
    onSuccess: () => {
      toast({ title: 'Successfully updated!' });
      queryClient.invalidateQueries({ queryKey: [moduleName] });
      setEditPopoverOpen(false);
    },
  });

  const handleClick = (open: boolean) => {
    if (!isPending) {
      setEditPopoverOpen(open);
    }
  };

  const onSubmit = ({ amount: inputAmount }: FormData) => {
    const adjustments = type === 'adjustments' ? inputAmount : inputAmount - totalActualAmount;
    mutate({ id, data: { adjustments } });
  };

  useEffect(() => {
    if (editPopoverOpen) {
      reset();
      formReset();
    }
  }, [editPopoverOpen, reset, formReset]);
  return (
    <Popover open={editPopoverOpen} onOpenChange={handleClick}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'absolute inset-0 w-full h-full rounded-xl bg-gray-300 bg-opacity-50 flex items-center justify-center group-hover:opacity-100 group-hover:cursor-pointer transition-opacity',
            editPopoverOpen ? '' : 'opacity-0'
          )}
        >
          <Edit className="w-12 h-12 text-white" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 relative">
        {isPending && <Loader className="inset-0" />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span>Update {name}</span>
            <Button type="submit" size="sm" className="h-6" disabled={isPending}>
              Submit
            </Button>
          </div>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder={formatAmount(amount)}
                value={field.value ?? ''}
                step={0.01}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const inputValue = e.target.value;
                  if (/^-?\d*\.?\d{0,2}$/.test(inputValue)) {
                    field.onChange(inputValue);
                  }
                }}
                className={cn(
                  'block w-full border',
                  errors.amount
                    ? 'border-red-500 focus-visible:ring-red-500 focus:border-red-500'
                    : ''
                )}
              />
            )}
          />
          {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>}
        </form>
      </PopoverContent>
    </Popover>
  );
};
