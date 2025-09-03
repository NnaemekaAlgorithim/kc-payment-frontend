import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useGetNotification } from "../../hooks/react-query/useUser";

function NotificationModal({ isOpen, onClose }) {
  const { data, isLoading, isError } = useGetNotification();

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="notif-modal"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed right-4 top-16 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-[9999]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Notifications</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <p className="p-4 text-sm text-gray-500">Loading...</p>
            ) : isError ? (
              <p className="p-4 text-sm text-red-500">Failed to load</p>
            ) : !data?.results?.length ? (
              <p className="p-4 text-sm text-gray-500">No notifications</p>
            ) : (
              <ul>
                {data.results.map((note) => (
                  <li
                    key={note.id}
                    className="px-4 py-3 border-b border-gray-100 text-sm hover:bg-gray-50"
                  >
                    <p className="font-medium text-gray-800">{note.title}</p>
                    <p className="text-gray-600 text-sm">{note.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(note.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default NotificationModal;
