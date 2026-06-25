import { useState } from 'react';
import { useCampaignStore, campaignApi, CampaignFormData, CampaignStatus } from '@/entities/campaign';
import { useToast } from '@/shared/ui';
import { validateCampaignForm, ValidationErrors } from '../lib/validation';

export function useAddCampaign(onSuccess?: () => void) {
  const { dispatch } = useCampaignStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<CampaignFormData>>({
    name: '',
    status: 'Active' as CampaignStatus,
    leadsCount: 0,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof CampaignFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const submit = async () => {
    const validationErrors = validateCampaignForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const validData = formData as CampaignFormData;
      const newCampaign = await campaignApi.createCampaign(validData);

      dispatch({ type: 'ADD_CAMPAIGN', payload: newCampaign });
      toast('Campaign created successfully!', 'success');

      if (onSuccess) {
        onSuccess();
      }

      // Reset form
      setFormData({ name: '', status: 'Active', leadsCount: 0 });
    } catch (error) {
      console.error('Failed to create campaign:', error);
      toast('Failed to create campaign. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    submit,
  };
}
