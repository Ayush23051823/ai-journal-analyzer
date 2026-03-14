import { useState } from "react";
import { useEntryStore } from "../store/entryStore";
import { EntryCard } from "../components/enrty/EntryCard";
import { EntryDetailModal } from "../components/enrty/EntryDetailModal";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const Log = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  // Get both the entries and the deleteEntry function from the store
  const { entries, deleteEntry } = useEntryStore();

  const handleDelete = (entryId) => {
    deleteEntry(entryId);
    setSelectedEntry(null); // Close the modal after deletion
  };

  return (
    <>
      <EntryDetailModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        onDelete={handleDelete} // Pass the handler function to the modal
      />

      <div className="p-4">
        <motion.h1
          className="text-3xl font-bold my-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Log
        </motion.h1>
        {entries.length > 0 ? (
          <motion.div
            className="flex flex-wrap gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {entries.map((entry) => (
              <motion.div
                key={entry.id + entry.loggedDate}
                variants={itemVariants}
                className="flex-shrink-0 w-36 sm:w-40 md:w-44"
              >
                <div
                  onClick={() => setSelectedEntry(entry)}
                  className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image */}
                  <img
                    src={entry.coverUrl}
                    alt={entry.title}
                    className="w-full h-auto object-scale-down"
                  />
                  {/* Text */}
                  <div className="p-2">
                    <p className="text-sm font-semibold text-gray-100 truncate">
                      {entry.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {entry.year || "Unknown"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-400 mt-10">
            You haven't logged any experiences yet.
          </p>
        )}
      </div>
    </>
  );
};
