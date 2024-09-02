// store.js
import create from 'zustand';

const useStore = create((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData }),
    clearUser: () => set({ user: null }),
}));

export default useStore;
