<script>
    import { saveNotesToLocalStorage, selectedNoteIdForDelete } from '../store.js';

    export let noteId;

    const deleteTask = (id) => {
        if (id) {
            const storedNotes = localStorage.getItem('notes');
            if (storedNotes) {
                let notes = JSON.parse(storedNotes);
                notes = notes.filter(note => note.id !== id);
                localStorage.setItem('notes', JSON.stringify(notes));
                console.log("Nota eliminada");
                selectedNoteIdForDelete.set(null);
            }
        }
    };


    $: if (noteId) {
        deleteTask(noteId);
    }
</script>
