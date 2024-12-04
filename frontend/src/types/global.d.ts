declare global {
  type ComponentWithChildren<T = object> = T & {
    children?: ReactNode;
  };

  type PathFn = (data: string) => string;

  type ResourceApi = {
    list: string;
    detail: PathFn;
    create: string;
    update: PathFn;
    delete: PathFn;
  };

  type PaginationParams = {
    pageIndex: number;
    pageSize: number;
  };

  type ApiResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
  };

  type PathFn = (data: string) => string;

  type BasicItem = {
    id: number;
    name: string;
  };

  type ResourceApi = {
    list: string;
    detail: PathFn;
    create: string;
    update: PathFn;
    delete: PathFn;
  };

  type Campaign = {
    id: number;
    name: string;
    bookedAmount: number;
    actualAmount: number;
    invoicesCount: number;
    campaign: BasicItem;
  };

  type CampaignDetailLineItem = {
    id: number;
    name: string;
    actualAmount: number;
    bookedAmount: number;
    invoices?: {
      id: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };

  type CampaignDetail = {
    id: number;
    name: string;
    lineItems: CampaignDetailLineItem[];
  };

  type Invoice = {
    id: number;
    createdAt: string;
    updatedAt: string;
    totalAmount: number;
  };
}

export {};
