export type CryptoAsset = {
  name: string;                      // Nom de la cryptomonnaie (ex: "Bitcoin")
  symbol: string;                    // Symbole de la cryptomonnaie (ex: "BTC")
  sector: string;                    // Secteur de la cryptomonnaie
  quantity: number;                  // Quantité de la cryptomonnaie dans le portefeuille
  current_price: number;             // Prix actuel par unité de la cryptomonnaie
  total_value: number;               // Valeur totale de la cryptomonnaie (quantité * prix)
  percentage_of_portfolio: number;   // Pourcentage de cette cryptomonnaie dans le portefeuille
  price_change_percentage_24h: number;  // Variation du prix en % sur 24 heures
};

export type TPortfolio = CryptoAsset[];
