<script>
    import { selectedNote, selectedNoteIdForDelete, isMenuOpen } from "../store.js";

    let noteId;
    let note;

    selectedNote.subscribe((value) => {
        note = value;
        noteId = value ? value.id : null;
    });

    const deleteTask = (id) => {
        if (typeof window !== "undefined" && id !== undefined) {
            const storedNotes = localStorage.getItem("notes");

            if (storedNotes) {
                let notes = JSON.parse(storedNotes);

                notes = notes.filter((note) => note.id !== id);
                localStorage.setItem("notes", JSON.stringify(notes));
                console.log("Nota eliminada");

                selectedNoteIdForDelete.set(null);
                selectedNote.set(null);
            } else {
                console.warn("No hay notas guardadas.");
            }
        }
    };

    const archiveTask = (id, archive) => {
        if (typeof window !== "undefined" && id !== undefined) {
            const storedNotes = localStorage.getItem("notes");

            if (storedNotes) {
                let notes = JSON.parse(storedNotes);

                notes = notes.map((note) =>
                    note.id === id ? { ...note, archived: archive } : note,
                );
                localStorage.setItem("notes", JSON.stringify(notes));
                console.log(`Nota ${archive ? "archivada" : "desarchivada"}`);

                selectedNote.set(null);
            } else {
                console.warn("No hay notas guardadas.");
            }
        }
    };

    const handleDeleteClick = () => {
        if (noteId) {
            deleteTask(noteId);
            window.location.reload();
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

{#if $isMenuOpen}
<div class="section">
    <div class="options">
        <button class="archive" on:click={handleArchiveClick}
            >Archivar Nota</button
        >
        <button class="unarchive" on:click={handleUnarchiveClick}
            >Desarchivar Nota</button
        >
        <button class="delete" on:click={handleDeleteClick}
            >Eliminar Nota</button
        >
    </div>
</div>
{/if}

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
        border: 1px solid rgb(167, 167, 167);
        border-radius: 5px;
        width: 200px;
        height: 40px;
        padding-left: 30px;
        background: url("/icon-archive.svg") no-repeat 4px center;
        background-size: 20px;
        cursor: pointer;
        margin: 10px 20px;
        align-self: center;
    }

    .archive:hover {
        background-color: rgba(134, 134, 134, 0.26);
    }

    .delete {
        border: 1px solid rgb(167, 167, 167);
        border-radius: 5px;
        width: 200px;
        height: 40px;
        padding-left: 30px;
        background: url("/icon-delete.svg") no-repeat 4px center;
        background-size: 20px;
        cursor: pointer;
        margin: 10px 20px;
        align-self: center;
    }

    .delete:hover {
        background-color: rgba(134, 134, 134, 0.26);
    }

    .unarchive {
        border: 1px solid rgb(167, 167, 167);
        border-radius: 5px;
        width: 200px;
        height: 40px;
        padding-left: 30px;
        background: url("/icon-delete.svg") no-repeat 4px center;
        background-size: 20px;
        cursor: pointer;
        margin: 10px 20px;
        align-self: center;
    }
    .unarchive:hover {
        background-color: rgba(134, 134, 134, 0.26);
    }
</style>
