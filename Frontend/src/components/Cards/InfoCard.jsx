const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-6 bg-white p-3 md:p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div
        className={`w-8 h-8 md:w-14 md:h-14 flex items-center justify-center text-base md:text-2xl text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>

      <div>
        <h6 className="text-xs md:text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-base md:text-2xl">${value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
