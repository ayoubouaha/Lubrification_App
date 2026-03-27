import { type MarkerMetadata } from '../types';

export const BASE_MARKERS = [
  {
    id: 'left-wheel-hub-outer',
    name: 'Moyeu roue exterieure gauche',
    shortDescription: 'Palier roue - extremite gauche',
    tagPrimary: 'K3-STR-A01',
    frequency: '07j',
    plannedAmount: '415g',
    details:
      'Graissage du palier de roue exterieure cote gauche. Injecter la quantite specifiee puis verifier la rotation libre de la roue et l absence de fuite sur joint.',
  },
  {
    id: 'left-bogie-upper-pin',
    name: 'Axe superieur bogie gauche',
    shortDescription: 'Articulation superieure bogie',
    tagPrimary: 'K3-STR-C19',
    tagSecondary: 'K3-STR-C20',
    frequency: '07j',
    plannedAmount: '125g',
    details:
      'Point de graissage de l articulation verticale du bogie gauche. Appliquer une graisse EP2 jusqu a apparition d un leger cordon au niveau de la bague.',
  },
  {
    id: 'left-bogie-center',
    name: 'Pivot central bogie gauche',
    shortDescription: 'Pivot central de rotation',
    tagPrimary: 'K3-STR-A06',
    frequency: '07j',
    plannedAmount: '415g',
    details:
      'Point critique de la cinematique de translation. Nettoyer la zone puis injecter la graisse jusqu a renouvellement visible sur le joint de pivot.',
  },
  {
    id: 'left-bogie-lower-link',
    name: 'Biellette inferieure gauche',
    shortDescription: 'Liaison inferieure du bogie',
    tagPrimary: 'K3-STR-A21',
    tagSecondary: 'K3-STR-A22',
    frequency: '07j',
    plannedAmount: '50g',
    details:
      'Graisseur de liaison inferieure. Appliquer la graisse jusqu a purge propre puis effectuer un controle visuel de l alignement de la biellette.',
  },
  {
    id: 'left-bogie-wheel-inner',
    name: 'Roue interne bogie gauche',
    shortDescription: 'Palier roue interne',
    tagPrimary: 'K3-STR-A05',
    frequency: '07j',
    plannedAmount: '415g',
    details:
      'Point de graissage de la roue interne. Verifier le jeu radial avant lubrification et controler la temperature au premier cycle de roulage.',
  },
  {
    id: 'center-turret-bearing',
    name: 'Palier central de tourelle',
    shortDescription: 'Support central superieur',
    tagPrimary: 'K3-STR-A17',
    tagSecondary: 'K3-STR-A18',
    frequency: '07j',
    plannedAmount: '250g',
    details:
      'Palier central situe sous la structure superieure. Utiliser une graisse haute adhesion et controler la regularite de repartition sur le chemin de roulement.',
  },
  {
    id: 'right-bogie-upper-pin',
    name: 'Axe superieur bogie droit',
    shortDescription: 'Articulation superieure droite',
    tagPrimary: 'K3-STR-A04',
    frequency: '07j',
    plannedAmount: '415g',
    details:
      'Point de graissage de la colonne bogie droite. Appliquer par impulsions courtes et verifier que la graisse neuve apparait sans contamination.',
  },
  {
    id: 'right-bogie-center',
    name: 'Pivot central bogie droit',
    shortDescription: 'Pivot central droit',
    tagPrimary: 'K3-STR-A02',
    frequency: '07j',
    plannedAmount: '415g',
    details:
      'Lubrification du pivot principal du bogie droit. Verifier la mobilite transversale et l absence de bruit metallique apres intervention.',
  },
  {
    id: 'right-bogie-lower-link',
    name: 'Biellette inferieure droite',
    shortDescription: 'Liaison inferieure droite',
    tagPrimary: 'K3-STR-A11',
    tagSecondary: 'K3-STR-A12',
    frequency: '07j',
    plannedAmount: '100g',
    details:
      'Point inferieur de transmission des efforts. Nettoyer l embout de graisseur, injecter la dose recommandee puis essuyer tout excedent.',
  },
  {
    id: 'right-bogie-wheel-inner',
    name: 'Roue interne bogie droit',
    shortDescription: 'Palier roue interne droite',
    tagPrimary: 'K3-STR-A13',
    tagSecondary: 'K3-STR-A14',
    frequency: '07j',
    plannedAmount: 'g',
    details:
      'Graissage du palier de roue interne du bogie droit. Inspecter la bague et surveiller la montee en temperature sur la premiere mise en charge.',
  },
  {
    id: 'right-wheel-hub-outer',
    name: 'Moyeu roue exterieure droite',
    shortDescription: 'Palier roue - extremite droite',
    tagPrimary: 'K3-STR-A09',
    tagSecondary: 'K3-STR-A10',
    frequency: '07j',
    plannedAmount: '125g',
    details:
      'Palier exterieur cote droit. Appliquer la graisse NLGI recommandee et verifier le comportement dynamique de la roue sur translation lente.',
  },
  {
    id: 'right-stop-roller-1',
    name: 'Galet de butee avant droit',
    shortDescription: 'Galet de guidage terminal',
    tagPrimary: 'K3-STR-A03',
    frequency: '07j',
    plannedAmount: '415g',
    details:
      'Point terminal de guidage situe en extremite droite. Graisser modereement pour eviter projection et controler l alignement avec le rail.',
  },
  {
    id: 'right-stop-roller-2',
    name: 'Galet de butee avant droit 2 ',
    shortDescription: 'Galet de guidage terminal',
    tagPrimary: 'K3-STR-A15',
    tagSecondary: 'K3-STR-A16',
    frequency: '07j',
    plannedAmount: '125g',
    details:
      'Point terminal de guidage situe en extremite droite. Graisser modereement pour eviter projection et controler l alignement avec le rail.',
  },
  {
    id: 'right-stop-roller-3',
    name: 'Galet de butee avant droit',
    shortDescription: 'Galet de guidage terminal',
    tagPrimary: 'K3-STR-A07',
    tagSecondary: 'K3-STR-A08',
    frequency: '07j',
    plannedAmount: '125g',
    details:
      'Point terminal de guidage situe en extremite droite. Graisser modereement pour eviter projection et controler l alignement avec le rail.',
  },
] as const satisfies readonly MarkerMetadata[];

export type MarkerId = (typeof BASE_MARKERS)[number]['id'];

const validateUniqueMarkerIds = () => {
  const markerIds = new Set<string>();

  for (const marker of BASE_MARKERS) {
    if (markerIds.has(marker.id)) {
      throw new Error(`Duplicate diagram marker id detected: ${marker.id}`);
    }

    markerIds.add(marker.id);
  }
};

validateUniqueMarkerIds();

