export interface ItadApi {
  getGame(title: string): Promise<ItadLookupResponse>;
  getPrices(id: string): Promise<ItadPriceResponse>;
}

interface ItadAssets {
  boxart?: string;
  banner145?: string;
  banner300?: string;
  banner400?: string;
  banner600?: string;
}

interface ItadGame {
  id: string;
  slug: string;
  title: string;
  type: 'game' | 'dlc' | null;
  mature: boolean;
  assets: ItadAssets;
}

interface ItadLookupNotFound {
  found: false;
}

interface ItadLookupFound {
  found: true;
  game: ItadGame;
}

export type ItadLookupResponse = ItadLookupNotFound | ItadLookupFound;

interface ItadPrice {
  amount: number;
  amountInt: number;
  currency: string;
}

interface ItadShop {
  id: number;
  name: string;
}

interface ItadDrm {
  id: number;
  name: string;
}

interface ItadPlatform {
  id: number;
  name: string;
}

interface ItadDeal {
  shop: ItadShop;
  price: ItadPrice;
  regular: ItadPrice;
  cut: number;
  voucher: string | null;
  storeLow: ItadPrice;
  flag: string | null;
  drm: ItadDrm[];
  platforms: ItadPlatform[];
  timestamp: string;
  expiry: string | null;
  url: string;
}

export interface ItadPriceResponse {
  id: string;
  historyLow: {
    all: ItadPrice;
    y1: ItadPrice;
    m3: ItadPrice;
  };
  deals: ItadDeal[];
}
