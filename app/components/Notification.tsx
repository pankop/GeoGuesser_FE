"use client"; // Pastikan ini adalah Client Component

import { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Hide notification after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white transition-transform transform ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } ${visible ? "translate-y-0" : "translate-y-full"}`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="mr-2">{type === "success" ? "✔️" : "❌"}</span>
        <span>{message}</span>
      </div>
    </div>
  ) : null;
};

export default Notification;
