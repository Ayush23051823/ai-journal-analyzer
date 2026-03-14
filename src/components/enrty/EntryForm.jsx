import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEntryStore } from '../../store/entryStore';
import { StarRating } from '../common/StarRating';
import { motion } from 'framer-motion';

export const EntryForm = ({ selectedItem, onBack }) => {
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [mood, setMood] = useState('');
  const addEntry = useEntryStore((state) => state.addEntry);
  const navigate = useNavigate();

  const moods = ['🤩', '🤔', '😊', '😭', '❤️'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedItem || rating === 0) {
      alert('Please provide a rating.');
      return;
    }

    const newEntry = {
      ...selectedItem,
      userRating: rating,
      notes,
      mood,
      loggedDate: new Date().toISOString(),
    };
    
    addEntry(newEntry);
    navigate('/log');
  };

  return (
    <div className="p-4">
      <button onClick={onBack} className="text-teal-400 mb-4">&larr; Back to search</button>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-start space-x-4">
          <img src={selectedItem?.coverUrl} alt={selectedItem?.title} className="w-24 rounded-md shadow-lg" />
          <div>
            <h2 className="text-2xl font-bold">{selectedItem?.title}</h2>
            <p className="text-gray-400">{selectedItem?.year}</p>
          </div>
        </div>
        
        <div>
          <label className="block text-lg font-semibold mb-2">Your Rating</label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>

        <div>
           <label className="block text-lg font-semibold mb-3">How did it make you feel?</label>
            <div className="flex justify-around">
                {moods.map(m => (
                    <motion.button 
                        type="button" 
                        key={m} 
                        onClick={() => setMood(m)}
                        className={`text-4xl p-2 rounded-full transition-all duration-200 ${mood === m ? 'bg-teal-500/20' : ''}`}
                        whileHover={{ scale: 1.1 }}
                        animate={{ scale: mood === m ? 1.25 : 1 }}
                    >
                        {m}
                    </motion.button>
                ))}
            </div>
        </div>

        <div>
           <label htmlFor="notes" className="block text-lg font-semibold mb-2">Your Private Notes</label>
           <textarea
             id="notes"
             rows={5}
             className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
             placeholder="What stood out? Any favorite moments?"
             value={notes}
             onChange={(e) => setNotes(e.target.value)}
           />
        </div>

        <motion.button 
          type="submit" 
          className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Save to Log
        </motion.button>
      </form>
    </div>
  );
};