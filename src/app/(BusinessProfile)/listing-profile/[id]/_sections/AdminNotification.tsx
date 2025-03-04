import React from "react";

export default function AdminNotification({ note }: { note: string }) {
  return (
    <div className="mb-5 rounded-lg border border-bg1 bg-bg1 bg-opacity-10 p-3 font-medium text-bg1">
      {note}
    </div>
  );
}
