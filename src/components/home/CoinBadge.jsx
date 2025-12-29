export default function CoinBadge({ coin }) {
  if (!coin) return null;

  return (
    <div className="flex items-center justify-center gap-1">
      <img
        src={`https://assets.coincap.io/assets/icons/${coin.tag.toLowerCase()}@2x.png`}
        alt={coin.tag}
        className="w-5 h-5"
        onError={(e) => (e.target.style.display = "none")}
      />
      <span className="text-xs">{coin.tag}</span>
    </div>
  );
}
