import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { Campaign } from './types';

interface CampaignState {
  campaigns: Campaign[];
  isLoading: boolean;
  error: string | null;
}

type CampaignAction =
  | { type: 'SET_CAMPAIGNS'; payload: Campaign[] }
  | { type: 'ADD_CAMPAIGN'; payload: Campaign }
  | { type: 'UPDATE_CAMPAIGN'; payload: Campaign }
  | { type: 'DELETE_CAMPAIGN'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: CampaignState = {
  campaigns: [],
  isLoading: true,
  error: null,
};

function campaignReducer(state: CampaignState, action: CampaignAction): CampaignState {
  switch (action.type) {
    case 'SET_CAMPAIGNS':
      return { ...state, campaigns: action.payload, isLoading: false, error: null };
    case 'ADD_CAMPAIGN':
      return { ...state, campaigns: [action.payload, ...state.campaigns] };
    case 'UPDATE_CAMPAIGN':
      return {
        ...state,
        campaigns: state.campaigns.map((c) => (c.id === action.payload.id ? action.payload : c)),
      };
    case 'DELETE_CAMPAIGN':
      return {
        ...state,
        campaigns: state.campaigns.filter((c) => c.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

interface CampaignContextType extends CampaignState {
  dispatch: React.Dispatch<CampaignAction>;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(campaignReducer, initialState);

  return (
    <CampaignContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaignStore() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaignStore must be used within a CampaignProvider');
  }
  return context;
}
