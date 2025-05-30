import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addExpense,
  deleteExpense,
  downloadExpenseExcel,
  fetchAllExpense,
} from "../../services/expenseService";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import ExpenseList from "../../components/Expense/ExpenseList";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import DeleteAlert from "../../components/layouts/DeleteAlert";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetchAllExpense();

      if (response.success) {
        setExpenseData(response.expense);
      }
    } catch (error) {
      console.error("Error fetching expense details: ", error);
      if (error === "Unauthorised") {
        toast.error("Session expired.Please login to continue.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    const newErrors = {};

    if (!amount) newErrors.amount = "Expense amount is required";
    if (!category) newErrors.category = "Expense category is required";
    if (!date) newErrors.source = "Expense date is required";
    if (!icon) newErrors.icon = "Expense Icon Emoji is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await addExpense({ category, amount, date, icon });

      toast.success(response.message);
      fetchExpenseDetails();
      setOpenAddExpenseModal(false);
    } catch (error) {
      console.error("Error adding incoome: ", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      toast.success();
      fetchAllExpense();
    } catch (error) {
      console.error("Error deleting income: ", error);
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await downloadExpenseExcel();

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details: ", error);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              openDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} errors={errors} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense details?"
            onDelete={() => {
              handleDeleteExpense(openDeleteAlert.data);
            }}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
