// src/api.ts

// Імітація отримання трейдера за ID
export const getTraderById = async (id: string) => {
    const traders = [
      {
        id: '1',
        name: 'Trader One',
        description: 'This is Trader One.',
        links: ['https://example.com', 'https://example2.com'],
      },
      {
        id: '2',
        name: 'Trader Two',
        description: 'This is Trader Two.',
        links: ['https://example3.com', 'https://example4.com'],
      },
    ];
  
    return traders.find((trader) => trader.id === id) || null;
  };
  