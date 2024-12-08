import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { InferType, object, number } from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit } from 'lucide-react';

import { cn } from '@/lib/utils';
import { formatAmount } from '@/lib/formatter-utils';
import { useForm, useToast } from '@/hooks';
import { updateInvoice } from '@/apis';
import { moduleName } from '@/queries';
import { Popover, PopoverContent, PopoverTrigger, Input, Button, Loader } from '@/components';

const schema = object().shape({
  amount: number().nullable().required('isRequired'),
});

type FormData = InferType<typeof schema>;

export type AmountPopoverType = 'adjustments' | 'final';

type AmountPopoverProps = {
  amountPopoverAnchorRef: React.RefObject<HTMLDivElement>;
  name: string;
  type: AmountPopoverType;
  amount?: number;
  totalActualAmount: number;
};

export const AmountPopover = ({
  amountPopoverAnchorRef,
  name,
  type,
  amount,
  totalActualAmount,
}: AmountPopoverProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { id } = useParams() as { id: string };
  const [editPopoverOpen, setEditPopoverOpen] = useState(false);
  const [popoverContentAlignOffset, setPopoverContentAlignOffset] = useState<number>(-176);
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
      toast({ title: t('updatedSuccessfully') });
      queryClient.invalidateQueries({ queryKey: [moduleName] });
      setEditPopoverOpen(false);
    },
  });

  const handleClick = (open: boolean) => {
    if (!isPending) {
      if (amountPopoverAnchorRef.current) {
        const rect = amountPopoverAnchorRef.current.getBoundingClientRect();
        setPopoverContentAlignOffset(rect.width / 2 - 176);
      }
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
        <Edit className="w-4 h-4 cursor-pointer text-gray-500 dark:text-gray-300" />
      </PopoverTrigger>
      <PopoverContent
        className="w-80 relative"
        side="top"
        sideOffset={60}
        align="end"
        alignOffset={popoverContentAlignOffset}
      >
        {isPending && <Loader className="inset-0" />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between text-sm text-gray-700 dark:text-gray-400 mb-2">
            <span>{t('Update {{name}}', { name })} </span>
            <Button type="submit" size="sm" className="h-6" disabled={isPending}>
              {t('submit')}
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
          {errors.amount && (
            <p className="mt-1 text-sm text-red-500">{t(errors.amount.message as string)}</p>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};
