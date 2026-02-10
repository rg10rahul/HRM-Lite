import { Inbox } from "lucide-react";

function EmptyState({ message, icon, action}) {
  const IconComponent = icon || Inbox;

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        {typeof IconComponent === 'string' ? (
          <span className="text-4xl opacity-50 grayscale">{IconComponent}</span>
        ) : (
          <IconComponent size={48} className="text-slate-300" strokeWidth={1.5} />
        )}
      </div>
      <p className="text-slate-500 font-medium text-center max-w-sm">
        {message || "No data found"}
      </p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
