const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-2 mt-4 space-x-6">
      {payload.map((entry, index) => (
        <div className="flex items-center space-x-2" key={`legend-${index}`}>
          <div
            className="w-2.5 h-2.5 md:h-4 md:w-4 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>

          <span className="text-xs md:text-base text-red-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
