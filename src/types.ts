export type Country = 'spain' | 'mexico' | 'usa';

export interface DataField {
  id: string;
  label: string;
  enabled: boolean;
}

export interface GeneratedRecord {
  [key: string]: string;
}

export interface CountryConfig {
  name: string;
  phonePrefix: string;
  names: {
    male: string[];
    female: string[];
    surnames: string[];
  };
  cities: string[];
  streets: string[];
  streetTypes: string[];
  postalCodePattern: string;
  emailDomains: string[];
}
