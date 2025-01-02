<script>
  import { onMount } from "svelte";
  import {
    getNotesFromLocalStorage,
    searchQuery,
    showForm,
    isMenuOpen,
    selectedNote,
  } from "../store";

  let otrosNotes = [];

  const loadotrosNotes = () => {
    const notes = getNotesFromLocalStorage();
    otrosNotes = notes.filter((note) => note.tag === "Otros");
  };

  onMount(loadotrosNotes);

  $: searchQuery.subscribe((query) => {
    if (query === "Otros") {
      loadotrosNotes();
    }
  });

  const handleNoteClick = (note) => {
    selectedNote.set(note);
    showForm.set(true);
    isMenuOpen.set(true);
    console.log("Nota seleccionada:", note);
  };
</script>

{#each otrosNotes as note}
  <button on:click={() => handleNoteClick(note)}>{note.title}</button>
{:else}
      <p>No hay notas con la etiquea "Otros".</p>
{/each}

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
