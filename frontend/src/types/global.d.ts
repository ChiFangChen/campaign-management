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

  type PaginationData = {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };

  type ApiResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
  };

  type PagedData<T> = {
    pagination: PaginationData;
    data: T;
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
    bookedTotalAmount: number;
    actualTotalAmount: number;
    invoicesCount: number;
    lineItemsCount: number;
  };

  type CampaignDetailsLineItem = {
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

  type CampaignDetails = {
    id: number;
    name: string;
    lineItems: CampaignDetailsLineItem[];
  };

  type LineItemDetails = {
    id: number;
    name: string;
    actualAmount: number;
    bookedAmount: number;
    campaign: BasicItem;
    invoices: {
      id: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };

  type Invoice = {
    id: number;
    createdAt: string;
    updatedAt: string;
    totalAmount: number;
  };

  type InvoiceDetailsCampaignLineItem = {
    id: number;
    name: string;
    actualAmount: number;
  };

  type InvoiceDetailsCampaign = BasicItem & {
    totalAmount: number;
    lineItems: InvoiceDetailsCampaignLineItem[];
  };

  type InvoiceDetails = {
    id: number;
    createdAt: string;
    updatedAt: string;
    adjustments: number;
    totalActualAmount: number;
    campaigns: InvoiceDetailsCampaign[];
  };

  type ComparisonData = {
    id: number;
    campaignName: string;
    totalBooked: number;
    totalActual: number;
  };

  type DashboardData = {
    totalCampaigns: number;
    totalLineItems: number;
    totalAdjustments: number;
    amount: {
      totalBookedAmount: number;
      totalActualAmount: number;
      comparisonData: ComparisonData[];
    };
  };
}

export {};
