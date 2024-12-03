import { Routes, Route, Navigate } from 'react-router-dom';
import { CampaignList } from './CampaignList';
import { CampaignDetail } from './CampaignDetail';

export const Campaigns = () => {
  return (
    <Routes>
      <Route path="/" element={<CampaignList />} />
      <Route path=":id" element={<CampaignDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
