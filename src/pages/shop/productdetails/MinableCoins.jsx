import React from "react";

const coins = [
  {
    name: "Bitcoin",
    img: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  {
    name: "Litecoin",
    img: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
  },
  {
    name: "Dash",
    img: "https://assets.coingecko.com/coins/images/19/large/dash-logo.png",
  },
  {
    name: "Bitcoin Cash",
    img: "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png",
  },
  {
    name: "Namecoin",
    img: "https://assets.coingecko.com/coins/images/8/large/namecoin.png",
  },
  {
    name: "Bitcoin SV",
    img: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  {
    name: "Bitcoin Gold",
    img: "https://assets.coingecko.com/coins/images/19/large/dash-logo.png",
  },
];

const MinableCoins = () => {
  return (
    <section className="mt-24 mb-24">
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-center mb-10">
        Mineable Coins
      </h2>

      {/* COINS */}
      <div className="flex flex-wrap justify-center items-center gap-10">
        {coins.map((coin, index) => (
          <div
            key={index}
            className="w-14 h-14 rounded-full flex items-center justify-center"
            title={coin.name}
          >
            <img
              src={coin.img}
              alt={coin.name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MinableCoins;
