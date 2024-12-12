<script>
    import { onMount } from "svelte";
    import { selectedNoteIdForDelete, searchQuery } from "./store.js";

    let archivedNotes = [];

    const tags = [
        { name: "Casa" },
        { name: "Trabajo" },
        { name: "Mascotas" },
        { name: "Familia" },
        { name: "Otros" },
    ];

    const reloadPage = () => {
        window.location.reload();
    };

    const loadArchivedNotes = () => {
        if (typeof window !== "undefined") {
            const storedNotes = localStorage.getItem("notes");
            if (storedNotes) {
                const notes = JSON.parse(storedNotes);
                archivedNotes = notes.filter((note) => note.archived === true);
            } else {
                console.warn("error");
            }
        }
    };

    const filterNotesByTag = (tag) => {
        if (typeof window !== "undefined") {
            searchQuery.set(tag.toLowerCase());  // Convertir a minúsculas para el filtrado uniforme
        }
    };

    onMount(loadArchivedNotes);

    $: selectedNoteIdForDelete.subscribe(() => {
        loadArchivedNotes();
    });
</script>

<div class="sidebar">
    <div class="logo">
        <img src="/logo.svg" alt="Logo" />
    </div>
    <div class="section">
        <h2>Todas las notas</h2>
        <ul>
            <li>
                <button on:click={reloadPage}
                    ><img src="/icon-home.svg" alt="All Notes Icon" />Todas las
                    notas</button
                >
            </li>
            <li>
                <button on:click={loadArchivedNotes}
                    ><img
                        src="/icon-archive.svg"
                        alt="Archived Notes Icon"
                    />Notas archivadas</button
                >
            </li>
        </ul>
        {#if archivedNotes.length > 0}
            <ul>
                {#each archivedNotes as note}
                    <li><button>{note.title}</button></li>
                {/each}
            </ul>
        {/if}
    </div>
    <div class="section">
        <h2>Etiquetas</h2>
        <ul>
            {#each tags as tag}
                <li>
                    <button
                        class="tag"
                        on:click={() => filterNotesByTag(tag.name)}
                        ><img
                            src="/icon-tag.svg"
                            alt="Tag Icon"
                        />{tag.name}</button
                    >
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .sidebar {
        width: 200px;
        background-color: #fff;
        padding: 20px;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        height: 100vh;
    }
    .logo {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        margin-top: 20px;
    }

    .section {
        margin-bottom: 20px;
    }
    .section h2 {
        margin: 0;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .section ul {
        list-style: none;
        padding: 0;
    }
    .section li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .section li img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    button {
        display: flex;
        align-items: center;
        background-color: transparent;
        background-size: 20px;
        cursor: pointer;
        border: none;
        margin-top: 10px;
    }
</style>
