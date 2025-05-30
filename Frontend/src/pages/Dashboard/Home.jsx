import InfoCard from "../../components/Cards/InfoCard";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { useEffect, useState } from "react";
import { addThousandSeparator } from "../../utils/helper";
import { getDashboardData } from "../../services/authService";
import { HashLoader } from "react-spinners";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import { useNavigate } from "react-router-dom";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransaction from "../../components/Dashboard/ExpenseTransaction";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data: ", error);
      if (error === "Unauthorised") {
        toast.error("Session expired.Please login to continue.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <HashLoader color="#ffcb00" size={200} />
        </div>
      )}

      <div className="mx-auto my-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransaction
            transactions={
              dashboardData?.last30DaysExpenseTransactions?.transactions || []
            }
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenseTransactions?.transactions}
          />

          <RecentIncomeWithChart
            data={
              dashboardData?.last60DaysIncomeTransactions?.transactions?.slice(
                0,
                4
              ) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={
              dashboardData?.last60DaysIncomeTransactions?.transactions || []
            }
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
