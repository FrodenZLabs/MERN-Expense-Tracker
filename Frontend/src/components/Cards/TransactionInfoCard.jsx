import {
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () => {
    return type === "income"
      ? "bg-green-50 text-green-500"
      : "bg-red-50 text-red-500";
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-1 md:p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-4 h-4 md:w-6 md:h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-xs md:text-base text-gray-700 font-medium">
            {title}
          </p>
          <p className="text-[10px] md:text-sm text-gray-400 mt-0.5 md:mt-1">
            {date}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:bg-red-200 p-1 md:p-2 hover:text-red-500 rounded-lg transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 className="text-sm md:text-xl" />
            </button>
          )}

          <div
            className={`flex items-center gap-1 md:gap-2 px-1 md:px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-[10px] md:text-sm font-medium">
              {type === "income" ? "+" : "-"}Kshs. {amount.toLocaleString()}
            </h6>
            {type === "income" ? (
              <LuTrendingUp className="text-sm md:text-xl" />
            ) : (
              <LuTrendingDown className="text-sm md:text-xl" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
