<script>
  import { showForm, selectedNote, searchQuery, isMenuOpen } from "../store";
  import { onMount } from "svelte";

  let notes = [];
  let filteredNotes = [];
 
  import { page } from "$app/stores";

  $: query = ($page.params.routes || "").toLowerCase();

  let loaded = false;
  const loadNotes = () => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      notes = JSON.parse(storedNotes).filter(
        (x) => !query || x.tag.toLowerCase() == query
      );
    }
    filterNotes();
    loaded = true;
  };

  onMount(loadNotes);

  $: if (loaded && query) loadNotes();

  const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const filterNotes = () => {
    searchQuery.subscribe((value) => {
      filteredNotes = notes.filter(
        (note) =>
          !note.archived && 
          (note.title.toLowerCase().includes(value.toLowerCase()) ||
           note.description.toLowerCase().includes(value.toLowerCase()))
      );
    });
  };

  const handleNoteClick = (note) => {
    selectedNote.set(note);
    showForm.set(true);
    isMenuOpen.set(true);
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
