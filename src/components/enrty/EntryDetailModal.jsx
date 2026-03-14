import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, StarIcon, TrashIcon } from '@heroicons/react/24/solid';

const StaticStarRating = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} />
    ))}
  </div>
);

// We now accept an `onDelete` prop
export const EntryDetailModal = ({ entry, onClose, onDelete }) => {
  if (!entry) return null;

  const handleDelete = () => {
    // A simple confirmation dialog. For a real app, you might build a custom modal.
    if (window.confirm(`Are you sure you want to delete your entry for "${entry.title}"?`)) {
      onDelete(entry.id);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-800 rounded-xl w-full max-w-md p-6 relative flex flex-col space-y-4"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
          
          <div className="flex items-start space-x-4">
            <img src={entry.coverUrl} alt={entry.title} className="w-24 rounded-lg shadow-lg" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{entry.title}</h2>
              <p className="text-sm text-gray-400">{entry.year}</p>
              <div className="mt-2 flex items-center space-x-2">
                <StaticStarRating rating={entry.userRating} />
                {entry.mood && <span className="text-2xl">{entry.mood}</span>}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-teal-400 font-semibold mb-2">Your Private Notes</h3>
            <div className="bg-gray-900/50 p-4 rounded-lg max-h-40 overflow-y-auto">
              <p className="text-gray-300 whitespace-pre-wrap">
                {entry.notes || "You didn't write any notes for this entry."}
              </p>
            </div>
          </div>
          
          {/* ADD THE DELETE BUTTON HERE */}
          <div className="pt-4 mt-auto">
            <button
              onClick={handleDelete}
              className="w-full flex items-center justify-center space-x-2 text-sm text-red-400/80 hover:bg-red-500/10 hover:text-red-400 font-semibold p-2 rounded-lg transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
              <span>Delete Entry</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};