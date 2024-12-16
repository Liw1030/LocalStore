import { writable } from 'svelte/store';

export const showForm = writable(false);
export const selectedNote = writable({
    title: "",
    description: "",
    tag: "",
});
export const selectedNoteIdForDelete = writable(null);
export const searchQuery = writable("");
export const archiveStatus = writable(false);


export const getNotesFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const storedNotes = localStorage.getItem('notes');
        return storedNotes ? JSON.parse(storedNotes) : [];
    }
    return [];
};


export const saveNotesToLocalStorage = (notes) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('notes', JSON.stringify(notes));
    }
};


export const filterTag = writable('');