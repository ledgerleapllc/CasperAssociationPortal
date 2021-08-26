export const SHUFTI_CONST = {
  production: {
    clientId: 'e4tot3Y50imDSYYsVcWQbpQqG4jmZ7i7XoblVDp3CavbFn9Tvr1613403633',
    clientSecret:
      '$2y$10$f5Q.YTY6bl2wvmbS.aT8pONrDSxieRzmzQQdH.2VJkFdj7cRaR05i',
  },
  development: {
    clientId: 'KgeOivDVEpzTrAqkx8aBwLJenCgKnW4SSQDbv17hRq8fyhvZhD1612459148',
    clientSecret:
      '$2y$10$wHWfyqB/1dhfTKwQQnstv.k0y9z2gYHBhkkRMkBPtPPOpYODHi6l6',
  },
};

export const SHUFTI_API_URL = 'https://api.shuftipro.com';
export const DEFAULT_BASE_BLOCKS = 10;
export const DEFAULT_LINE_OPTIONS = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        borderDash: [5, 5],
        drawBorder: false,
      },
    },
  },
};
