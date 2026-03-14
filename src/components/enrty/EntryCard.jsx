import { StarIcon } from '@heroicons/react/24/solid';

const StaticStarRating = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
      />
    ))}
  </div>
);

export const EntryCard = ({ entry, onClick, compact = false }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300"
    >
      {/* Image Container */}
      <div
        className={`w-full bg-gray-700 relative ${
          compact ? 'h-32' : 'aspect-[2/3]'
        }`}
      >
        <img
          src={entry.coverUrl}
          alt={entry.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-3 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-100 truncate">{entry.title}</h3>
          <p className="text-xs text-gray-400 capitalize mb-2">
            {entry.type} &middot; {entry.year}
          </p>
        </div>
        <StaticStarRating rating={entry.userRating} />
      </div>
    </div>
  );
};