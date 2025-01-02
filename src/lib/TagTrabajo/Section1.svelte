<script>
    import { showForm, selectedNote, searchQuery } from "../store.js";
    import ListTagTrabajo from "./ListTagTrabajo.svelte";
    import LisTagTrabajo from "./ListTagTrabajo.svelte"


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
    <ListTagTrabajo />
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

</style>
