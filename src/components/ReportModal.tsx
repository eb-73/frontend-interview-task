import { useState } from "react";
import Modal from "../shared/Modal";

type ReportModalProps = {
  onClose: () => void;
  confirm: (selectedReport: string) => void;
};

const reportOptions = ["Spam", "Harassment", "Inappropriate Content", "Other"];

const ReportModal: React.FC<ReportModalProps> = ({ onClose, confirm }) => {
  const [selectedReport, setSelectedReport] = useState<string>("");

  // Methods
  const handleOptionChange = (report: string) => {
    setSelectedReport(report);
  };

  const handleConfirm = () => {
    if (!selectedReport) return;
    confirm(selectedReport);
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      confirm={handleConfirm}
      title="Report Content"
      disabled={!selectedReport}
      description="Please select a reason for reporting."
    >
      <div className="mt-4">
        {reportOptions.map((option, index) => (
          <button
            key={index}
            className={`w-full border-2 border-solid text-start p-2 text-sm rounded-md bg-gray-100 my-0.5 truncate transition-all ${
              selectedReport === option
                ? "border-blue-400 text-blue-500"
                : "border-transparent hover:border-blue-200 text-gray-600"
            }`}
            onClick={() => handleOptionChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default ReportModal;
