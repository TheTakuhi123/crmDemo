export interface RaynetIdValue {
  id: number;
  value: string;
}

export interface RaynetAddress {
  id: number;
  city: string;
  country: string;
  name: string;
  province: string;
  street: string;
  zipCode: string;
  lat: number | null;
  lng: number | null;
}

export interface RaynetContactInfo {
  email: string | null;
  email2: string | null;
  primary: boolean;
  tel1: string | null;
  tel1Type: string | null;
  tel2: string | null;
  tel2Type: string | null;
  www: string | null;
  otherContact: string | null;
}

export interface RaynetAddressContainer {
  id: number;
  primary: boolean;
  contactAddress: boolean;
  address: RaynetAddress;
  territory: RaynetIdValue | null;
  contactInfo: RaynetContactInfo;
}

export interface RaynetRowInfo {
  "rowInfo.createdAt": string;
  "rowInfo.createdBy": string;
  "rowInfo.updatedAt"?: string;
  "rowInfo.updatedBy"?: string;
}

export interface RaynetClient extends RaynetRowInfo {
  id: number;
  name: string;
  role: string;
  state: string;
  rating: string;
  owner: { id: number; fullName: string };
  regNumber: string;
  taxNumber: string | null;
  taxPayer: string; // "YES" | "NO"
  primaryAddress: RaynetAddressContainer;
  contactAddress?: RaynetAddressContainer;
  category: RaynetIdValue | null;
  turnover: RaynetIdValue | null;
  economyActivity: RaynetIdValue | null;
  paymentTerm: RaynetIdValue | null;
  tags: string[];
  notice: string | null;
  _version: number;
}