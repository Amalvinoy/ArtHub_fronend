import React from "react";

export default function ArtisanStatsCard({ icon, label, value }) {
  return (
    <div
      className="
      bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl 
      p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition 
      flex flex-col gap-3
    "
    >
      <div className="p-3 rounded-xl bg-white/70 shadow flex items-center justify-center">
        {icon}
      </div>

      <p className="text-gray-700 text-sm">{label}</p>

      <p className="text-3xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
}

