import { Url } from '../RawChampion';

export interface Chroma {
    name: string;
    id: number;
    chromaPath: Url;
    colors: string[];
    descriptions: ChromaDescription[];
    rarities: ChromaRarity[];
}

export interface ChromaDescription {
    description?: string | null;
    region?: string | null;
}

export interface ChromaRarity {
    rarity?: number | null;
    region?: string | null;
}
