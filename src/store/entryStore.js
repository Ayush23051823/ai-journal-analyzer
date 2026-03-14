import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useEntryStore = create(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => ({
          entries: [entry, ...state.entries].sort((a, b) => new Date(b.loggedDate) - new Date(a.loggedDate)),
        })),
      
      // ADD THIS NEW FUNCTION
      // It takes an entry's ID and removes it from the array.
      deleteEntry: (entryId) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== entryId),
        })),
    }),
    {
      name: 'echolog-v2-storage', // The name for localStorage
    }
  )
);