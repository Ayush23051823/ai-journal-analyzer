import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

export const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input type="radio" name="rating" className="sr-only" value={ratingValue} onClick={() => onRatingChange(ratingValue)} />
            <StarIcon
              className={`w-10 h-10 cursor-pointer transition-colors duration-200 ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-600'}`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};