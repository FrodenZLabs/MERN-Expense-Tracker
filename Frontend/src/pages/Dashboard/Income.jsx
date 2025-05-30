import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import IncomeList from "../../components/Income/IncomeList";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import DeleteAlert from "../../components/layouts/DeleteAlert";
import {
  addIncome,
  fetchAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} from "../../services/incomeService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetchAllIncome();

      if (response.success) {
        setIncomeData(response.income);
      }
    } catch (error) {
      console.error("Error fetching income details: ", error);
      if (error === "Unauthorised") {
        toast.error("Session expired.Please login to continue.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    const newErrors = {};

    if (!amount) newErrors.amount = "Income amount is required";
    if (!source) newErrors.source = "Income source is required";
    if (!date) newErrors.source = "Income date is required";
    if (!icon) newErrors.icon = "Income icon emoji is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await addIncome({ source, amount, date, icon });

      toast.success(response.message);
      fetchIncomeDetails();
      setOpenAddIncomeModal(false);
    } catch (error) {
      console.error("Error adding incoome: ", error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id);
      toast.success();
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income: ", error);
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await downloadIncomeExcel();

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details: ", error);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <ClipLoader color="#ad46ff" size={130} />
        </div>
      )}

      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              openDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} errors={errors} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income details?"
            onDelete={() => {
              handleDeleteIncome(openDeleteAlert.data);
            }}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
