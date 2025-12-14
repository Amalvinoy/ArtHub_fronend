import React from "react";

export default function AdminStatsCard({ icon, label, value, color }) {
  return (
    <div
      className="
        bg-white/70 backdrop-blur-xl border border-white/40 
        rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] 
        transition flex flex-col gap-3
      "
    >
      {/* Icon Section */}
      <div className="p-3 rounded-xl bg-white/60 shadow-md w-fit">
        {React.cloneElement(icon, { className: `w-7 h-7 ${color}` })}
      </div>

      {/* Label */}
      <p className="text-gray-700 text-sm">{label}</p>

      {/* Value */}
      <p className="text-3xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
}
