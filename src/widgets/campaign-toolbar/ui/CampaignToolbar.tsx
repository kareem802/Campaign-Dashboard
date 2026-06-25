import { useState, useEffect } from 'react';
import { SearchInput } from '@/features/search-campaigns';
import { StatusFilter } from '@/features/filter-campaigns';
import { Button, ConfirmDialog } from '@/shared/ui';
import { FilterStatus } from '@/shared/config';
import { Campaign } from '@/entities/campaign';
import { setSimulateFailure, getSimulateFailure } from '@/shared/api';

interface CampaignToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: FilterStatus;
  onStatusChange: (val: FilterStatus) => void;
  campaigns: Campaign[];
  onAddClick: () => void;
}

export function CampaignToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  campaigns,
  onAddClick,
}: CampaignToolbarProps) {
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [isFailureActive, setIsFailureActive] = useState(getSimulateFailure());
  const [modalMode, setModalMode] = useState<'start' | 'cancel'>('start');

  useEffect(() => {
    const handleUpdate = () => setIsFailureActive(getSimulateFailure());
    window.addEventListener('simulate-failure-change', handleUpdate);
    return () => window.removeEventListener('simulate-failure-change', handleUpdate);
  }, []);

  const handleToggleSimulation = () => {
    setSimulateFailure(modalMode === 'start');
    setIsSimulateModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalMode(isFailureActive ? 'cancel' : 'start');
    setIsSimulateModalOpen(true);
  };

  const visibleCount = statusFilter === 'All'
    ? campaigns.length
    : campaigns.filter(c => c.status === statusFilter).length;

  return (
    <div className="w-full">
      {/* Top Header Row - Full Width with Border */}
      <header className="w-full bg-white border-b border-dashed border-slate-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            className="w-full sm:max-w-xs"
          />
          <Button variant="primary" onClick={onAddClick} className="w-full sm:w-auto shrink-0">
            <svg className="w-5 h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Campaign
          </Button>
        </div>
      </header>

      {/* Page Header (Title + Tabs) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Campaigns</h1>
            <Button
              variant={isFailureActive ? 'danger' : 'secondary'}
              onClick={handleOpenModal}
              className="text-xs shrink-0"
            >
              {isFailureActive ? 'Cancel Next-Call Failure' : 'Fail Next Backend Call'}
            </Button>
          </div>
          <StatusFilter
            currentFilter={statusFilter}
            onChange={onStatusChange}
            campaigns={campaigns}
          />
        </div>

        {/* Count Header */}
        <div className="mt-6">
          <h2 className="text-base font-semibold text-slate-900">
            {visibleCount} {visibleCount === 1 ? 'Campaign' : 'Campaigns'}
          </h2>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isSimulateModalOpen}
        title={modalMode === 'cancel' ? "Cancel Simulation" : "Start Backend Failure"}
        message={
          modalMode === 'cancel'
            ? "Are you sure you want to cancel the pending backend failure? The next API call will succeed normally."
            : "Are you sure you want to start the simulation? The next API call (Add, Edit, or Delete) will intentionally fail to demonstrate error handling. This is solely for testing purposes."
        }
        confirmLabel={modalMode === 'cancel' ? "Cancel Failure" : "Start Simulation"}
        onConfirm={handleToggleSimulation}
        onCancel={() => setIsSimulateModalOpen(false)}
      />
    </div>
  );
}
