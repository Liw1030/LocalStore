<script>
    import { selectedNote, selectedNoteIdForDelete } from './store.js';

    let noteId;
    let note;

    selectedNote.subscribe(value => {
        note = value;
        noteId = value ? value.id : null;
    });

    const deleteTask = (id) => {
        const storedNotes = localStorage.getItem('notes');
        let notes = storedNotes ? JSON.parse(storedNotes) : [];

        notes = notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes));
        console.log("Nota eliminada");

        selectedNoteIdForDelete.set(null);
        selectedNote.set(null);
    };

    const archiveTask = (id, archive) => {
        const storedNotes = localStorage.getItem('notes');
        let notes = storedNotes ? JSON.parse(storedNotes) : [];

        notes = notes.map(note => note.id === id ? { ...note, archived: archive } : note);
        localStorage.setItem('notes', JSON.stringify(notes));
        console.log(`Nota ${archive ? 'archivada' : 'desarchivada'}`);

        selectedNote.set(null);
    };

    const handleDeleteClick = () => {
        if (noteId) {
            deleteTask(noteId);
        }
    };

    const handleArchiveClick = () => {
        if (noteId) {
            archiveTask(noteId, true);
        }
    };

    const handleUnarchiveClick = () => {
        if (noteId) {
            archiveTask(noteId, false);
        }
    };
</script>

<div class="section">
    <div class="options">
        <button class="archive" on:click={handleArchiveClick}>Archivar Nota</button>
        <button class="unarchive" on:click={handleUnarchiveClick}>Desarchivar Nota</button>
        <button class="delete" on:click={handleDeleteClick}>Eliminar Nota</button>
    </div>
</div>

<style>
    .section {
        flex: 1;
        padding: 10px;
        background-color: #ffffff;
        height: 100%;
        border-top: 1px solid rgb(167, 167, 167);
    }

    .options {
        display: flex;
        flex-direction: column;
    }

    .archive {
        background-color: transparent;
        border: 1px solid rgb(167, 167, 167);
        border-radius: 5px;
        width: 200px;
        height: 40px;
        padding-left: 30px;
        background: url("/icon-archive.svg") no-repeat 4px center;
        background-size: 20px;
        cursor: pointer;
        margin: 10px 20px;
    }

    .archive:hover {
        background-color: rgba(134, 134, 134, 0.26);
    }

    .delete {
        background-color: transparent;
        border: 1px solid rgb(167, 167, 167);
        border-radius: 5px;
        width: 200px;
        height: 40px;
        padding-left: 30px;
        background: url("/icon-delete.svg") no-repeat 4px center;
        background-size: 20px;
        cursor: pointer;
        margin: 10px 20px;
    }

    .delete:hover {
        background-color: rgba(134, 134, 134, 0.26);
    }

    .unarchive {
        background-color: transparent;
        border: 1px solid rgb(167, 167, 167);
        border-radius: 5px;
        width: 200px;
        height: 40px;
        padding-left: 30px;
        background: url("/icon-unarchive.svg") no-repeat 4px center;
        background-size: 20px;
        cursor: pointer;
        margin: 10px 20px;
    }

    .unarchive:hover {
        background-color: rgba(134, 134, 134, 0.26);
    }
</style>
