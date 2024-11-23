const Exchanges = ({ exchanges }: { exchanges: any[] }) => {
  return (
    <div className=" container mx-auto p-4 font-poppins">
      <table className=" min-w-full bg-[#000] text-[#fff]">
        <thead>
          <tr className="border-b">
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">24h Volume (Normalized)</th>
            <th className="p-2">24h Volume</th>
            <th className="p-2">Trust Score</th>
            <th className="p-2">Launched</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((exchange, index) => (
            <tr key={exchange.id} className="text-center">
              {/* row number */}
              <td className="p-2">{index + 1}</td>

              {/* exchange logo and name */}
              <td className="p-2">
                <div className="flex items-center justify-center">
                  <img
                    src={exchange.image}
                    alt={exchange.name}
                    width={20}
                    height={20}
                    className="inline-block mr-2"
                  />
                  <span>{exchange.name}</span>
                </div>
              </td>

              {/* volume 24 */}
              <td className="p-2">
                {" "}
                ${exchange.trade_volume_24h_btc_normalized?.toLocaleString()}
              </td>

              {/* volume 7d */}
              <td className="p-2">
                ${exchange.trade_volume_24h_btc?.toLocaleString()}
              </td>

              {/* markets */}
              <td className="p-2">
                <div
                  className={` rounded-lg px-2 p-1 ${
                    exchange.trust_score > 5
                      ? "bg-[#188503] bg-opacity-20 text-[#188503]"
                      : "bg-[#FF0000] bg-opacity-20 text-[#FF0000]"
                  }`}
                >
                  {exchange.trust_score}/10
                </div>
              </td>

              {/* launched */}
              <td className="p-2">{exchange.year_established}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Exchanges;
