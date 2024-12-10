<script>
    import { showForm, selectedNote, searchQuery } from "./store.js";
    import { onMount } from "svelte";

    let notes = [];
    let filteredNotes = [];

    // Cargar notas desde localStorage al montar el componente
    const loadNotes = () => {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
            notes = JSON.parse(storedNotes);
        }
        filterNotes();
    };

    onMount(loadNotes);

    // Guardar notas en localStorage
    const saveNotes = () => {
        localStorage.setItem("notes", JSON.stringify(notes));
    };

    // Filtrar notas en base a la búsqueda
    const filterNotes = () => {
        searchQuery.subscribe((value) => {
            filteredNotes = notes.filter(
                (note) =>
                    note.title.toLowerCase().includes(value.toLowerCase()) ||
                    note.description
                        .toLowerCase()
                        .includes(value.toLowerCase()),
            );
        });
    };

    // Manejar la selección de una nota
    const handleNoteClick = (note) => {
        selectedNote.set(note);
        showForm.set(true);
    };
</script>

{#each filteredNotes as note (note.id)}
    <button on:click={() => handleNoteClick(note)}>{note.title}</button>
{/each}

<style>
    button {
        height: 30px;
        border: 1px solid rgb(167, 167, 167);
        border-radius: 5px;
        margin-top: 20px;
        cursor: pointer;
    }

    button:hover {
        background-color: rgba(134, 134, 134, 0.26);
    }
</style>
