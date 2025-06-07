const Card = ({ ad }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl m-4 p-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {ad.campaign}
      </h2>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium">Adset:</span> {ad.adset}
        </p>
        <p>
          <span className="font-medium">Creative:</span> {ad.creative}
        </p>
        <p>
          <span className="font-medium">Spend:</span> ${ad.spend}
        </p>
        <p>
          <span className="font-medium">Impressions:</span> {ad.impressions}
        </p>
        <p>
          <span className="font-medium">Clicks:</span> {ad.clicks}
        </p>
        <p>
          <span className="font-medium">Results:</span> {ad.results}
        </p>
      </div>
    </div>
  );
};
export default Card;
