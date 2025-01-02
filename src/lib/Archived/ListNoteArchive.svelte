<script>
    import { showForm, selectedNote, searchQuery, isMenuOpen } from "../store";
    import { onMount } from "svelte";

    let archivedNotes = [];


    onMount(() => {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
            let notes = JSON.parse(storedNotes);
            archivedNotes = notes.filter((note) => note.archived === true);
        }
    });

    const handleNoteClick = (note) => {
        selectedNote.set(note);
        showForm.set(true);
        isMenuOpen.set(true);
        console.log("Nota seleccionada:", note);
    };
</script>

<main>
    {#if archivedNotes.length > 0}
        {#each archivedNotes as note (note.id)}
            <button on:click={() => handleNoteClick(note)}>{note.title}</button>
        {/each}
    {:else}
        <p>No hay notas archivadas.</p>
    {/if}
</main>

<style>
    button {
        width: 100%;
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
