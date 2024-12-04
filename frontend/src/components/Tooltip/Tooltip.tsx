import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactNode } from 'react';

type TooltipProps = { content: ReactNode } & ComponentWithChildren;

export const Tooltip = ({ children, content = null }: TooltipProps) => (
  <UITooltip>
    <TooltipTrigger asChild>
      <div>{children}</div>
    </TooltipTrigger>
    <TooltipContent>{content}</TooltipContent>
  </UITooltip>
);
