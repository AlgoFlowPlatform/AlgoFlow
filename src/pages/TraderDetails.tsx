// src/pages/TraderDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTraderById } from '../api'; // Уявімо, що це API функція для отримання трейдера за ID

interface Trader {
  id: string;
  name: string;
  description: string;
  links: string[];
}

const TraderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [trader, setTrader] = useState<Trader | null>(null);

  useEffect(() => {
    if (id) {
      // Імітація API запиту для отримання даних трейдера
      getTraderById(id).then((data) => {
        setTrader(data);
      });
    }
  }, [id]);

  if (!trader) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{trader.name}</h1>
      <p>{trader.description}</p>

      <h2 className="text-lg font-semibold mt-4">Links:</h2>
      <ul>
        {trader.links.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TraderDetails;
