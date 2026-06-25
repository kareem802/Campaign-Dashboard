import { useState, useEffect } from 'react';
import { useCampaignStore, campaignApi, Campaign, CampaignFormData } from '@/entities/campaign';
import { useToast } from '@/shared/ui';
import { validateCampaignForm, ValidationErrors } from '@/features/add-campaign';

export function useEditCampaign(initialCampaign: Campaign, onSuccess?: () => void) {
  const { dispatch } = useCampaignStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<CampaignFormData>>({
    name: initialCampaign.name,
    status: initialCampaign.status,
    leadsCount: initialCampaign.leadsCount,
  });

  useEffect(() => {
    setFormData({
      name: initialCampaign.name,
      status: initialCampaign.status,
      leadsCount: initialCampaign.leadsCount,
    });
  }, [initialCampaign]);

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof CampaignFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      const updatedCampaign = await campaignApi.updateCampaign(initialCampaign.id, validData);

      dispatch({ type: 'UPDATE_CAMPAIGN', payload: updatedCampaign });
      toast('Campaign updated successfully!', 'success');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to update campaign:', error);
      toast('Failed to update campaign. Please try again.', 'error');
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
