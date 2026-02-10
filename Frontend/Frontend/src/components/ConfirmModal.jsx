import { AlertTriangle, X } from "lucide-react";

function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[200] animate-[fadeIn_0.2s_ease-out]"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl p-0 w-[440px] max-w-[90vw] shadow-2xl overflow-hidden animate-[scaleIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start">
          <div className="flex gap-4">
            <div className="bg-red-50 p-2.5 rounded-full shrink-0">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-normal pr-4">
                {message || "Are you sure you want to perform this action? This cannot be undone."}
              </p>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Footer */}
        <div className="bg-slate-50/50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 bg-white text-slate-600 border border-slate-200 text-sm font-semibold rounded-lg hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 transition-all shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-red-600 text-white border border-transparent text-sm font-semibold rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-600/20 transition-all shadow-sm flex items-center gap-2"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
