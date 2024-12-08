import { Routes, Route, Navigate } from 'react-router-dom';

import { InvoiceList } from './InvoiceList';
import { InvoiceDetails } from './InvoiceDetails';

const Invoices = () => {
  return (
    <Routes>
      <Route path="/" element={<InvoiceList />} />
      <Route path=":id" element={<InvoiceDetails />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Invoices;
