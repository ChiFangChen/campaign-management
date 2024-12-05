import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { InferType, object, number } from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit } from 'lucide-react';
import { updateInvoice } from '@/queries/api';
import { moduleName } from '@/queries/invoices';
import { useForm } from '@/hooks';
import { useToast } from '@/hooks/use-toast';
import {
  Skeleton,
  Card,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Button,
} from '@/components';

const schema = object().shape({
  amount: number().typeError('Please input number').nullable().required('The field is required'),
});

type FormData = InferType<typeof schema>;

type AmountCardProps = {
  type: 'actual' | 'adjustments' | 'final';
  data: { totalActualAmount: number; adjustments: number };
};

export const AmountCard = ({ type, data }: AmountCardProps) => {
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

  const { name, amount, isEditable } = useMemo(() => {
    switch (type) {
      case 'actual':
        return { name: 'Actual Total', amount: data?.totalActualAmount, isEditable: false };
      case 'adjustments':
        return { name: 'Adjustments', amount: data?.adjustments, isEditable: true };
      case 'final':
      default:
        return {
          name: 'Final Total Amount',
          amount: data && data.totalActualAmount + data.adjustments,
          isEditable: true,
        };
    }
  }, [type, data]);

  const handleClick = (open: boolean) => {
    if (!isPending) {
      setEditPopoverOpen(open);
    }
  };

  const onSubmit = ({ amount: inputAmount }: FormData) => {
    const adjustments = type === 'adjustments' ? inputAmount : inputAmount - data.totalActualAmount;
    console.log('adjustments:', adjustments);
    mutate({ id, data: { adjustments } });
  };

  useEffect(() => {
    if (editPopoverOpen) {
      reset();
      formReset();
    }
  }, [editPopoverOpen, reset, formReset]);

  return (
    <Card className="min:w-1/5 p-4 relative group">
      <div className="pb-0 text-sm text-gray-700">{name}</div>
      {typeof amount === 'number' ? (
        <>
          <div className="text-3xl">{amount}</div>
          {isEditable && (
            <Popover open={editPopoverOpen} onOpenChange={handleClick}>
              <PopoverTrigger asChild>
                <div className="absolute inset-0 w-full h-full rounded-xl bg-gray-300 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:cursor-pointer transition-opacity">
                  <Edit className="w-12 h-12 text-white" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>Update {name}</span>
                    <Button type="submit" size="sm" className="h-6">
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
                        placeholder={String(amount)}
                        value={field.value ?? ''}
                        step={0.01}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const inputValue = e.target.value;
                          if (/^-?\d*\.?\d{0,2}$/.test(inputValue)) {
                            field.onChange(inputValue);
                          }
                        }}
                        className={`block w-full border ${
                          errors.amount
                            ? 'border-red-500 focus-visible:ring-red-500 focus:border-red-500'
                            : ''
                        }`}
                      />
                    )}
                  />
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>
                  )}
                </form>
              </PopoverContent>
            </Popover>
          )}
        </>
      ) : (
        <div className="text-3xl">
          <Skeleton className="h-6" />
        </div>
      )}
    </Card>
  );
};
