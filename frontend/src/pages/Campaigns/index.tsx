import { Routes, Route, Navigate } from 'react-router-dom';
import { CampaignList } from './CampaignList';
import { CampaignDetail } from './CampaignDetail';
import { LineItemDetail } from './LineItemDetail';

export const Campaigns = () => {
  return (
    <Routes>
      <Route path="/" element={<CampaignList />} />
      <Route path="line-items/:id" element={<LineItemDetail />} />
      <Route path=":id" element={<CampaignDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
