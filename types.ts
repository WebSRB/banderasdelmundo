
export enum Continent {
  AMERICA = "América",
  EUROPE = "Europa",
  ASIA = "Asia",
  AFRICA = "África",
  OCEANIA = "Oceanía",
}

export interface CountryInfo {
  id: number;
  name: string;
  capital: string;
  continent: Continent;
  flagImageUrl: string;
}