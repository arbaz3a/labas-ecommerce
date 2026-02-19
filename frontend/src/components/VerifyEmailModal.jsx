import React from "react";

function VerifyEmailModal({
  originalEmail,
  verificationCode,
  setVerificationCode,
  confirmEmailChange,
  setShowVerifyModal,
}) {
  const handleCancel = () => {
    setVerificationCode("");
    setShowVerifyModal(false);
  };

  const handleSave = () => {
    confirmEmailChange();
    setVerificationCode("");
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm">
        <h3 className="text-sm font-semibold mb-2">Verify Email</h3>

        <p className="text-xs text-gray-500 mb-4">
          Enter the code sent to {originalEmail}
        </p>

        <input
          type="text"
          maxLength={6}
          placeholder="______"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-full border border-gray-300 text-center text-sm rounded-md px-2 py-2 tracking-widest
          focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
        />

        <div className="flex justify-between items-center text-xs mt-6">
          <button className="text-gray-500 text-[11px] cursor-pointer hover:underline">
            Resend Code
          </button>

          <div className="flex gap-3">
            <button onClick={handleCancel} className="cursor-pointer">Cancel</button>
            <button
              onClick={handleSave}
              className="bg-black cursor-pointer text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailModal;
