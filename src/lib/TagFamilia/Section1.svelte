<script>
    import { showForm, selectedNote, searchQuery } from "../store.js";
    import ListTagFamilia from "./ListTagFamilia.svelte";


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
    <ListTagFamilia />
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
