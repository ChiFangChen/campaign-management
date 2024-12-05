import { Routes, Route, Navigate } from 'react-router-dom';

import { InvoiceList } from './InvoiceList';
import { InvoiceDetail } from './InvoiceDetail';

export const Invoices = () => {
  return (
    <Routes>
      <Route path="/" element={<InvoiceList />} />
      <Route path=":id" element={<InvoiceDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
