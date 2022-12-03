import { Url } from './RawChampion';

export interface Skin {
    name: string;
    id: number;
    isBase: boolean;
    availability: keyof typeof Availability;
    formatName: string;
    lootEligible: boolean;
    cost: number | string;
    sale: number;
    distribution?: string | null;
    rarity?: string | number | null;
    chromas: Chroma[];
    lore?: string | null;
    release: string;
    set: string[];
    splashPath: Url;
    uncenteredSplashPath: Url;
    tilePath: Url;
    loadScreenPath: Url;
    loadScreenVintagePath?: Url | null;
    newEffects: boolean;
    newAnimations: boolean;
    newRecall: boolean;
    newVoice: boolean;
    newQuotes: boolean;
    voiceActor: string[];
    splashArtist: string[];
}

interface Chroma {
    name: string;
    id: number;
    chromaPath: Url;
    colors: string[];
    descriptions: ChromaDescription[];
    rarities: ChromaRarity[];
}

interface ChromaDescription {
    description?: string | null;
    region?: string | null;
}

interface ChromaRarity {
    rarity?: number | null;
    region?: string | null;
}

enum Availability {
  'Available',
  'Rare',
  'Limited',
  'Legacy',
  'Upcoming',
}