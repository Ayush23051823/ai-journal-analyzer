import { NavLink } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeSolid, BookOpenIcon as LogSolid, SparklesIcon as EchoesSolid, PlusCircleIcon } from '@heroicons/react/24/solid';

const NavItem = ({ to, icon: IconOutline, iconSolid: IconSolid, label }) => (
    <NavLink 
      to={to} 
      className="flex flex-col items-center justify-center w-full pt-2 pb-1 text-gray-400 hover:text-teal-300 transition-colors"
    >
        {({ isActive }) => (
            <>
                {isActive ? <IconSolid className="w-6 h-6 text-teal-400" /> : <IconOutline className="w-6 h-6" />}
                <span className={`text-xs mt-1 ${isActive ? 'text-teal-400 font-semibold shadow-glow-teal shadow-teal-400/50' : 'font-normal'}`}>{label}</span>
            </>
        )}
    </NavLink>
);

export const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900/70 backdrop-blur-sm border-t border-gray-700/50 grid grid-cols-4 z-50">
        <NavItem to="/" icon={HomeIcon} iconSolid={HomeSolid} label="Home" />
        <NavItem to="/log" icon={BookOpenIcon} iconSolid={LogSolid} label="Log" />
        <NavLink to="/add" className="flex justify-center items-center text-gray-400 hover:text-teal-300">
            <PlusCircleIcon className="w-12 h-12 text-teal-400 transform hover:scale-110 transition-transform" />
        </NavLink>
        <NavItem to="/reflections" icon={SparklesIcon} iconSolid={EchoesSolid} label="Echoes" />
    </nav>
);