<!-- src/lib/Archived/SectionArchived1.svelte -->
<script>
    import { showForm, selectedNote, searchQuery } from "../../store.js";  // Ajusta la ruta al store correctamente
    import ListNote from "../ListNote.svelte";  // Ajusta la ruta según corresponda
    import { onMount } from "svelte";
    import { get } from "svelte/store";
  
    let notes = [];
  
    const handleClick = () => {
      selectedNote.set({
        title: "",
        description: "",
        tag: "",
      });
      showForm.set(true);
    };
  </script>
  
  <div class="section-1">
    <button class="create" on:click={handleClick}>+Crear Nueva Nota</button>
    <ListNote />
  </div>
  
  <style>
    .section-1 {
      flex: 1;
      padding: 10px;
      background-color: #fff;
      height: 100%;
      border-top: 1px solid rgb(167, 167, 167);
      border-left: 1px solid rgb(167, 167, 167);
      display: flex;
      flex-direction: column;
    }
  
    .create {
      background-color: #18f018;
      color: #fff;
      border-radius: 4px;
      border: none;
      height: 30px;
    }
  </style>
  