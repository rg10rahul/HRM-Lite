import { AlertTriangle, RotateCw } from "lucide-react";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 bg-red-50/50 rounded-xl border border-red-100">
      <div className="bg-red-100 p-3 rounded-full mb-3">
        <AlertTriangle size={32} className="text-red-500" />
      </div>
      <p className="text-slate-800 font-medium text-center mb-1">Processing Error</p>
      <p className="text-red-600/80 text-sm text-center mb-5 max-w-md">
        {message || "Something went wrong. Please try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 hover:border-red-300 transition-all shadow-sm active:scale-95"
        >
          <RotateCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
