import { Coin } from "../../interfaces/interfaces";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
//@ts-ignore
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

const Favorites = ({
  coins,
  favorites,
}: {
  coins: Coin[];
  favorites: string[];
}) => {
  const favoriteCoins = coins.filter((coin) => favorites.includes(coin.id));

  const getTrendArrow = (percent: number) => {
    return percent > 0 ? <FaArrowUp /> : <FaArrowDown />;
  };
  return (
    <div className=" container mx-auto p-4">
      <table className=" min-w-full bg-[#000] text-[#fff]">
        <thead>
          <tr className="border-b">
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">1h %</th>
            <th className="p-2">24h %</th>
            <th className="p-2">7d %</th>
            <th className="p-2">Price</th>
            <th className="p-2">Market Cap</th>
            <th className="p-2">Volume 24h</th>
            <th className="p-2">Price Graph(7d)</th>
          </tr>
        </thead>
        <tbody>
          {favoriteCoins?.map((coin, index) => (
            <tr key={coin.id} className=" text-center">
              {/* row number */}
              <td className="p-2 flex items-center">
                {/* <button onClick={() => toggleFavorite(coin.id)}>
                  {favorites.includes(coin.id) ? (
                    <MdOutlineStarBorderPurple500 className="text-[#009FDF]" />
                  ) : (
                    <MdOutlineStarBorderPurple500 className="text-[#fff]" />
                  )}
                </button> */}
                <span className="ml-2">{index + 1}</span>
              </td>

              {/* coin logo and name */}
              <td className="p-2">
                <div className="flex items-center justify-center">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    width={20}
                    height={20}
                    className="inline-block mr-2"
                  />
                  <span>{coin.name}</span>
                </div>
              </td>

              {/* 1h % change */}
              <td className="p-2">
                <div
                  className={`flex items-center justify-center rounded-lg px-2 py-1 ${
                    coin.price_change_percentage_24h > 0
                      ? "bg-[#188503] bg-opacity-20 text-[#188503]"
                      : "bg-[#FF0000] bg-opacity-20 text-[#FF0000]"
                  }`}
                >
                  {getTrendArrow(coin.price_change_percentage_24h)}
                  <span className="ml-1">
                    {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                  </span>
                </div>
              </td>

              {/* 24h % change */}
              <td className="p-2">
                <div
                  className={`flex items-center justify-center rounded-lg px-2 py-1 ${
                    coin.price_change_percentage_24h > 0
                      ? "bg-[#188503] bg-opacity-20 text-[#188503]"
                      : "bg-[#FF0000] bg-opacity-20 text-[#FF0000]"
                  }`}
                >
                  {getTrendArrow(coin.price_change_percentage_24h)}
                  <span className="ml-1">
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>
              </td>

              {/* 7d % change */}
              <td className="p-2">
                <div
                  className={`flex items-center justify-center rounded-lg px-2 py-1 ${
                    coin.price_change_percentage_7d_in_currency > 0
                      ? "bg-[#188503] bg-opacity-20 text-[#188503]"
                      : "bg-[#FF0000] bg-opacity-20 text-[#FF0000]"
                  }`}
                >
                  {getTrendArrow(coin.price_change_percentage_7d_in_currency)}
                  <span className="ml-1">
                    {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                  </span>
                </div>
              </td>

              {/* price */}
              <td className="p-2">${coin.current_price.toLocaleString()}</td>

              {/* market cap */}
              <td className="p-2">${coin.market_cap.toLocaleString()}</td>

              {/* volume 24h */}
              <td className="p-2">${coin.total_volume.toLocaleString()}</td>

              {/* 7-day price graph */}
              <td className="p-2">
                <Sparklines data={coin.sparkline_in_7d.price} limit={10}>
                  <SparklinesLine
                    style={{ fill: "none" }}
                    color={
                      coin.price_change_percentage_7d_in_currency > 0
                        ? "green"
                        : "red"
                    }
                  />
                  <SparklinesSpots />
                </Sparklines>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favorites;
