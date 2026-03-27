import type { StepId } from './steps';

export const craneBasePath = (craneId: string) => `/crane/${craneId}`;

export const stepToPath = (craneId: string, stepId: StepId): string => {
  const base = craneBasePath(craneId);

  switch (stepId) {
    case 'dashboard':
      return `${base}/dashboard`;
    case 'ardelt-k3':
      return `${base}/ardelt-k3`;
    case 'tukan':
      return `${base}/tukan`;
    case 'translation':
      return `${base}/points/translation`;
    case 'rotation':
      return `${base}/points/rotation`;
    case 'rotation:drive-groups':
      return `${base}/points/rotation/groupes`;
    case 'relevage':
      return `${base}/points/relevage`;
    case 'relevage:drive-groups':
      return `${base}/points/relevage/groupes`;
    case 'levage':
      return `${base}/points/levage`;
    case 'levage:drive-groups':
      return `${base}/points/levage/groupes`;
    case 'poulies':
      return `${base}/points/poulies`;
    case 'poulies:drive-groups':
      return `${base}/points/poulies/groupes`;
    default: {
      // translation:<zoneKey>
      if (stepId.startsWith('translation:')) {
        const zoneKey = stepId.replace('translation:', '');
        return `${base}/points/translation/${zoneKey}`;
      }

      return `${base}/dashboard`;
    }
  }
};
