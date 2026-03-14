import React, { useState, useMemo } from 'react';
import { useEntryStore } from '../store/entryStore';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, FilmIcon, PuzzlePieceIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { AnimatedCounter } from '../components/common/AnimatedCounter';

// --- Reusable Slide Components ---
const Slide = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full h-full flex flex-col items-center justify-center text-center"
    >
        {children}
    </motion.div>
);

const IntroSlide = ({ total }) => (
    <Slide>
        <h2 className="text-2xl text-gray-400">This Year's Echo</h2>
        <AnimatedCounter value={total} className="text-7xl font-bold text-white mt-4" />
        <p className="text-2xl text-gray-400">experiences logged</p>
    </Slide>
);

const StatSlide = ({ label, value, icon: Icon }) => (
    <Slide>
        <Icon className="h-16 w-16 text-teal-400 mb-4" />
        <AnimatedCounter value={value} className="text-6xl font-bold text-white" />
        <p className="text-2xl text-gray-400">{label}</p>
    </Slide>
);

const MoodSlide = ({ mood }) => (
    <Slide>
        <p className="text-2xl text-gray-400 mb-4">Your most common mood was</p>
        <p className="text-8xl">{mood}</p>
    </Slide>
);
// --- End of Slide Components ---


export const Reflections = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const entries = useEntryStore((state) => state.entries);
    const navigate = useNavigate(); // <-- FIX #1: Hook to allow navigation

    const stats = useMemo(() => {
        if (entries.length === 0) return null;
        
        const totalEntries = entries.length;
        const typeCounts = entries.reduce((acc, e) => ({ ...acc, [e.type]: (acc[e.type] || 0) + 1 }), {});
        const mostFrequentType = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b, 'N/A');
        const moodCounts = entries.reduce((acc, e) => e.mood ? ({ ...acc, [e.mood]: (acc[e.mood] || 0) + 1 }) : acc, {});
        const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b, '🤔');
        const totalRating = entries.reduce((sum, e) => sum + e.userRating, 0);
        const averageRating = totalEntries > 0 ? (totalRating / totalEntries) : 0;

        return { totalEntries, mostFrequentType, mostFrequentMood, averageRating: averageRating.toFixed(1) };
    }, [entries]);

    if (!stats) {
        return (
             <div className="p-4 text-center h-[80vh] flex flex-col justify-center">
                <h1 className="text-3xl font-bold my-6">Your Echoes</h1>
                <p className="text-gray-400 mt-10">Log some experiences to see your reflections here!</p>
            </div>
        );
    }
    
    const storySlides = [
        <IntroSlide key="intro" total={stats.totalEntries} />,
        <StatSlide key="rating" label="Average Rating" value={parseFloat(stats.averageRating)} icon={StarIcon} />,
        <StatSlide key="type" label="Favorite Category" value={stats.mostFrequentType} icon={stats.mostFrequentType === 'movie' ? FilmIcon : PuzzlePieceIcon} />,
        <MoodSlide key="mood" mood={stats.mostFrequentMood} />
    ];

    // --- FIX #2: Updated logic to prevent the infinite loop ---
    const handleNext = () => {
        // If we are on the LAST slide, navigate home.
        if (slideIndex === storySlides.length - 1) {
            navigate('/');
        } else {
            // Otherwise, just go to the next slide.
            setSlideIndex(prev => prev + 1);
        }
    };
    
    const handleClose = () => navigate('/'); // Navigate home when close is clicked

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center p-4 bg-gray-950 -m-4 cursor-pointer" onClick={handleNext}>
            {/* FIX #1: The "Escape Hatch" Close Button */}
            <motion.button 
                onClick={(e) => { e.stopPropagation(); handleClose(); }} // stopPropagation prevents handleNext from firing too
                className="absolute top-5 right-5 z-50 text-gray-500 hover:text-white transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <XMarkIcon className="w-8 h-8"/>
            </motion.button>

             <AnimatePresence mode="wait">
                {storySlides[slideIndex]}
            </AnimatePresence>
            
            <div className="absolute bottom-20 left-4 right-4 h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                    key={slideIndex} // Re-trigger animation on slide change
                    className="h-1 bg-teal-400"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                    onAnimationComplete={handleNext} // Auto-advance after 5 seconds
                />
            </div>

            <p className="absolute bottom-10 text-gray-500 text-sm animate-pulse">Tap to continue</p>
        </div>
    );
};