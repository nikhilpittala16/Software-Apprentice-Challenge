import { useEffect, useState } from "react";
import Card from "./Card";
import normalizeAd from "./Helper";
const Layout = () => {
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("http://localhost:3000/fakeDataSet");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        //extract the ads without google analytics and create a single array with everything
        const transform = Object.entries(data)
          .slice(0, 3)
          .map(([platform, ads]) => ads)
          .flat()
          .map((ad) => normalizeAd(ad));

        // this array contains the google analytics
        const results = Object.entries(data)
          .slice(3)
          .map(([platform, ads]) => ads)
          .flat()
          .map((ad) => normalizeAd(ad));

        // adding results to individual ads from the results array
        results.forEach((res) => {
          const match = transform.find(
            (ad) =>
              ad.campaign === res.campaign &&
              //  ad.adset === res.adset &&
              // ad.creative === res.creative &&
              (ad.results === "" || ad.results === null) // not already assigned
          );

          if (match) {
            match.results = res.results;
          }
        });

        setAds(transform);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAds();
  }, []);
  const handleSort = (order) => {
    setSortOrder(order);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const clearSort = () => {
    setSortOrder(null);
  };

  const filteredAds = () => {
    let result = [...ads];

    if (searchTerm.trim() !== "") {
      result = result.filter((ad) =>
        ad.campaign.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder) {
      result.sort((a, b) =>
        sortOrder === "asc" ? a.spend - b.spend : b.spend - a.spend
      );
    }

    return result;
  };

  return (
    <>
      <div className="p-4 max-w-screen-lg mx-auto">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by campaign name"
            value={searchTerm}
            onChange={handleSearch}
            className="border px-2 py-1 rounded w-1/2"
          />
          <div className="space-x-2">
            <button
              onClick={() => handleSort("asc")}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Sort ↑
            </button>
            <button
              onClick={() => handleSort("desc")}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Sort ↓
            </button>
            <button
              onClick={clearSort}
              className="bg-gray-400 text-white px-2 py-1 rounded"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-4 m-8">
          {filteredAds().map((ad, index) => {
            return <Card key={index} ad={ad} />;
          })}
        </div>
      </div>
    </>
  );
};
export default Layout;
