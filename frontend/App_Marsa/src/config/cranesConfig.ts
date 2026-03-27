import grueImage from '../assets/Grue.png';
import grueMobileImage from '../assets/Grue2.png';
import ardeltK3Image from '../assets/ARDELT K3.png';
import tukanImage from '../assets/3.TUKAN.png';
import tukanTranslationImage from '../assets/SYSTÈME DE TRANSLATION TUKAN 2, 3.png';
import tukanTranslationNordAImage from '../assets/3.1.1.Translation  Coté MerNord - A.png';
import tukanTranslationSudBImage from '../assets/3.1.2.Translation  Coté MerSud - B.png';
import nordAImage from '../assets/Coté Mer Nord A.png';
import sudBImage from '../assets/Coté Mer Sud B.png';
import sudCImage from '../assets/Coté Mer Sud C.png';
import nordDImage from '../assets/Coté Mer Nord D.png';
import rotationSystemImage from '../assets/Système de rotation de la grue.png';
import relevageSystemImage from '../assets/Système de relevage de la flèche.png';
import levageSystemImage from '../assets/2.4.Système de levage.png';
import rotationDriveGroupsImage from '../assets/Groupes d’entrainement.png';
import tukanRotationDriveGroupsImage from '../assets/Rotation   Groupes d’entrainement.png';
import relevageDriveGroupsImage from '../assets/Relevage flèche  Groupe d’entrainement.png';
import tukanRelevageDriveGroupsImage from '../assets/2.3.1.Relevage flèche  Groupe d’entrainement.png';
import levageDriveGroupsImage from '../assets/2.4.1..Levage  Groupes d’entrainement.png';
import tukanLevageDriveGroupsImage from '../assets/4.1..Levage  Groupes d’entrainement.png';
import pouliesCablesImage from '../assets/Système des poulies des câbles.png';
import pouliesDriveGroupsImage from '../assets/2.5.. Système des poulies des câbles 2.png';
import tukanPouliesCablesImage from '../assets/3.5.. Système des poulies des câbles.png';

export type CraneId = 'kranbau' | 'ardelt' | 'tukan' | 'terex' | 'regianne';
export type CraneCategory = 'rail' | 'mobile';

export interface CraneImages {
  nordA: string;
  sudB: string;
  sudC: string;
  nordD: string;
  rotation: string;
  relevage: string;
  levage: string;
  rotationDriveGroups: string;
  relevageDriveGroups: string;
  levageDriveGroups: string;
  pouliesCables: string;
  pouliesDriveGroups: string;
  overview?: string;
  translation?: string;
}

export interface CraneConfig {
  id: CraneId;
  name: string;
  dashboardLabel: string;
  category: CraneCategory;
  hasData: boolean;
  dashboardImage: string;
  dashboardImageAlt: string;
  images: CraneImages;
}

export const DEFAULT_CRANE_ID: CraneId = 'kranbau';

const DEFAULT_IMAGES: CraneImages = {
  nordA: nordAImage,
  sudB: sudBImage,
  sudC: sudCImage,
  nordD: nordDImage,
  rotation: rotationSystemImage,
  relevage: relevageSystemImage,
  levage: levageSystemImage,
  rotationDriveGroups: rotationDriveGroupsImage,
  relevageDriveGroups: relevageDriveGroupsImage,
  levageDriveGroups: levageDriveGroupsImage,
  pouliesCables: pouliesCablesImage,
  pouliesDriveGroups: pouliesDriveGroupsImage,
};

const buildCraneConfig = (config: Omit<CraneConfig, 'images'> & { images?: CraneImages }): CraneConfig => {
  return {
    ...config,
    images: config.images ?? DEFAULT_IMAGES,
  };
};

export const cranes: Record<CraneId, CraneConfig> = {
  kranbau: buildCraneConfig({
    id: 'kranbau',
    name: 'ARDELT K3 (40T)',
    dashboardLabel: '2. ARDELT K3 (40T)',
    category: 'rail',
    hasData: false,
    dashboardImage: grueImage,
    dashboardImageAlt: 'Grue sur rails Kranbau',
  }),
  ardelt: buildCraneConfig({
    id: 'ardelt',
    name: 'KRANBAU K1, K2 (38T)',
    dashboardLabel: '1. KRANBAU K1, K2 (38T)',
    category: 'rail',
    hasData: true,
    dashboardImage: grueImage,
    dashboardImageAlt: 'Grue sur rails Ardelt',
    images: {
      ...DEFAULT_IMAGES,
      translation: tukanTranslationImage,
      overview: ardeltK3Image,
    },
  }),
  tukan: buildCraneConfig({
    id: 'tukan',
    name: 'TUKAN 2, 3 (40T)',
    dashboardLabel: '3. TUKAN 2, 3 (40T)',
    category: 'rail',
    hasData: true,
    dashboardImage: grueImage,
    dashboardImageAlt: 'Grue sur rails Tukan',
    images: {
      ...DEFAULT_IMAGES,
      overview: tukanImage,
      translation: tukanTranslationImage,
      nordA: tukanTranslationNordAImage,
      sudB: tukanTranslationSudBImage,
      sudC: tukanTranslationNordAImage,
      nordD: tukanTranslationSudBImage,
      rotationDriveGroups: tukanRotationDriveGroupsImage,
      relevageDriveGroups: tukanRelevageDriveGroupsImage,
      levageDriveGroups: tukanLevageDriveGroupsImage,
      pouliesCables: tukanPouliesCablesImage,
    },
  }),
  terex: buildCraneConfig({
    id: 'terex',
    name: 'TEREX 1, 2 (63T)',
    dashboardLabel: '4. TEREX 1, 2 (63T)',
    category: 'mobile',
    hasData: false,
    dashboardImage: grueMobileImage,
    dashboardImageAlt: 'Grue mobile Terex',
  }),
  regianne: buildCraneConfig({
    id: 'regianne',
    name: 'REGIANNE 1, 2 (40T)',
    dashboardLabel: '5. REGIANNE 1, 2 (40T)',
    category: 'mobile',
    hasData: false,
    dashboardImage: grueMobileImage,
    dashboardImageAlt: 'Grue mobile Regianne',
  }),
};

export const getCraneConfig = (craneId?: string | null): CraneConfig => {
  if (!craneId) {
    return cranes[DEFAULT_CRANE_ID];
  }

  return cranes[craneId as CraneId] ?? cranes[DEFAULT_CRANE_ID];
};

export const getCraneCardsByCategory = () => {
  const craneList = Object.values(cranes);

  const sortByLabelPrefix = (a: CraneConfig, b: CraneConfig) => {
    const extractIndex = (label: string) => {
      const match = /^\s*(\d+)\./.exec(label);
      return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
    };

    return extractIndex(a.dashboardLabel) - extractIndex(b.dashboardLabel);
  };

  return {
    rail: craneList.filter(crane => crane.category === 'rail').sort(sortByLabelPrefix),
    mobile: craneList.filter(crane => crane.category === 'mobile').sort(sortByLabelPrefix),
  };
};



