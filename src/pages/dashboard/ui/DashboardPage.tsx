import { useState, useEffect } from 'react';
import { useCampaignStore, campaignApi, Campaign } from '@/entities/campaign';
import { useSearchCampaigns } from '@/features/search-campaigns';
import { useFilterCampaigns } from '@/features/filter-campaigns';
import { CampaignToolbar } from '@/widgets/campaign-toolbar';
import { CampaignList } from '@/widgets/campaign-list';
import { CampaignFormModal } from '@/widgets/campaign-form-modal';
import { FilterStatus, STATUS_ALL } from '@/shared/config';

export function DashboardPage() {
  const { campaigns, isLoading, dispatch } = useCampaignStore();

  // Local state for search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>(STATUS_ALL);

  // Local state for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [campaignToEdit, setCampaignToEdit] = useState<Campaign | null>(null);

  // Fetch initial data
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await campaignApi.fetchCampaigns();
        if (isMounted) {
          dispatch({ type: 'SET_CAMPAIGNS', payload: data });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: 'SET_ERROR', payload: 'Failed to load campaigns' });
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Apply filters via features
  const filteredByStatus = useFilterCampaigns(campaigns, statusFilter);
  const finalFilteredCampaigns = useSearchCampaigns(filteredByStatus, searchQuery);

  // Handlers
  const handleAddClick = () => {
    setModalMode('add');
    setCampaignToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (campaign: Campaign) => {
    setModalMode('edit');
    setCampaignToEdit(campaign);
    setIsModalOpen(true);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter(STATUS_ALL);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-12">
      <CampaignToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        campaigns={campaigns}
        onAddClick={handleAddClick}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <CampaignList
          campaigns={finalFilteredCampaigns}
          totalCampaignsCount={campaigns.length}
          isLoading={isLoading}
          onEditClick={handleEditClick}
          onClearFilters={handleClearFilters}
          onAddClick={handleAddClick}
        />
      </div>

      <CampaignFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        campaignToEdit={campaignToEdit}
      />
    </div>
  );
}
