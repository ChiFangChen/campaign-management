import { Routes, Route, Navigate } from 'react-router-dom';

import { CampaignList } from './CampaignList';
import { CampaignDetails } from './CampaignDetails';
import { LineItemDetails } from './LineItemDetails';

const Campaigns = () => {
  return (
    <Routes>
      <Route path="/" element={<CampaignList />} />
      <Route path="line-items/:id" element={<LineItemDetails />} />
      <Route path=":id" element={<CampaignDetails />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Campaigns;
