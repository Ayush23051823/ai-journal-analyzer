import { useState } from "react";
import { Link } from "react-router-dom";
import { useEntryStore } from "../store/entryStore";
import { EntryCard } from "../components/enrty/EntryCard";
import { EntryDetailModal } from "../components/enrty/EntryDetailModal";
import { motion } from "framer-motion";

export const Dashboard = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const { entries, deleteEntry } = useEntryStore();

  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const onThisDayEntry = entries.find((entry) => {
    const entryDate = new Date(entry.loggedDate);
    return (
      entryDate.getMonth() === todayMonth &&
      entryDate.getDate() === todayDate &&
      entryDate.getFullYear() !== today.getFullYear()
    );
  });

  const recentEntries = entries.slice(0, 4);
  const todayFormatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const handleDelete = (entryId) => {
    deleteEntry(entryId);
    setSelectedEntry(null); // Close the modal after deletion
  };

  const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good Morning"; // From midnight to 11:59 AM
  } else if (currentHour < 16) {
    return "Good Afternoon"; // From 12:00 PM to 5:59 PM
  } else {
    return "Good Evening"; // From 6:00 PM to 11:59 PM
  }
};

const greeting = getGreeting(); // Call the helper function

  return (
    <>
      <EntryDetailModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        onDelete={handleDelete} // Pass the handler function to the modal
      />

      <div className="p-4 space-y-8">
        <header className="mt-6">
           <h1 className="text-3xl font-bold text-white">{greeting}</h1>
          <p className="text-gray-400">It's {todayFormatted}.</p>
        </header>

        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
          <h2 className="font-semibold text-teal-400 mb-3">On This Day</h2>
          {onThisDayEntry ? (
            <div>
              <p className="text-sm text-gray-400 mb-3">
                One year ago, you logged this experience:
              </p>
              <EntryCard
                entry={onThisDayEntry}
                onClick={() => setSelectedEntry(onThisDayEntry)}
                compact={true}
              />
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              No memories from this day yet. Add one!
            </p>
          )}
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
          {recentEntries.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {recentEntries.map((entry) => (
                <motion.div
                  key={entry.id + entry.loggedDate}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
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
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-800/50 rounded-lg">
              <p className="text-gray-400">Your journal is empty.</p>
              <Link
                to="/add"
                className="mt-4 inline-block bg-teal-500 text-white font-bold py-2 px-4 rounded-lg"
              >
                Add Your First Entry
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
