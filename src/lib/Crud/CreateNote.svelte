<script>
    import {
        showForm,
        getNotesFromLocalStorage,
        saveNotesToLocalStorage
    } from "../store";

    export let note = {
        id: null,
        title: "",
        description: "",
        tag: "",
    };

    const resetNote = () => {
        note = {
            id: null,
            title: "",
            description: "",
            tag: "",
        };
    };

    const addOrUpdateNote = () => {
        let notes = getNotesFromLocalStorage();

        if (note.id) {
            notes = notes.map((n) => (n.id === note.id ? note : n));
            console.log("Nota actualizada");
        } else {
            note.id = Date.now().toString();
            notes.push(note);
            console.log("Nota agregada");
        }

        saveNotesToLocalStorage(notes);
    };

    const handleSubmit = () => {
        addOrUpdateNote();
        resetNote();
        showForm.set(false);
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };
</script>

<h2>{note.id ? "Edita tu nota" : "Crea tu nueva nota"}</h2>
<form on:submit|preventDefault={handleSubmit}>
    <label for="title">Titulo</label>
    <input
        type="text"
        name="title"
        placeholder="Titulo de la nota"
        bind:value={note.title}
    />
    <div class="tag">
        <label for="tag"><img src="../icon-tag.svg" alt="tag"></label>
        <select name="tag" id="tag" bind:value={note.tag}>
            <option value="Casa">Casa </option>
            <option value="Trabajo">Trabajo</option>
            <option value="Mascotas">Mascotas</option>
            <option value="Familia">Familia</option>
            <option value="Otros">Otros</option>
        </select>
    </div>
    <label for="description">Descripción</label>
    <textarea
        name="description"
        rows="5"
        placeholder="Descripción de la nota"
        bind:value={note.description}
    ></textarea>
    <button class="add_button">Guardar</button>
</form>

<style>
    h2 {
        margin: 15px 15px 0px 15px;
        justify-content: center;
        display: flex;
        color: #000000a2;
    }
    form {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        padding: 15px;
    }
    label {
        margin-bottom: 5px;
    }
    input {
        margin: 10px 0px;
        border: 1px solid rgb(167, 167, 167);
        border-radius: 5px;
        height: 30px;
        width: 100%;
    }
    textarea {
        margin: 10px 0px;
        height: 359px;
        width: 100%;
        border: 1px solid rgb(167, 167, 167);
        border-radius: 5px;
        font-family: Arial, Helvetica, sans-serif;
    }
    button {
        background-color: #1875f0;
        color: #fff;
        border-radius: 4px;
        border: none;
        height: 30px;
        margin-top: 15px;
        cursor: pointer;
        width: 100%;
    }

    .tag {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        label{
            align-items: center;
        }
        img{
            height: 20px;
            margin-right: 10px;
            align-self: center;
        }
    }

    select{
        border: 1px solid rgb(167, 167, 167);
        border-radius: 5px;
        
    }
</style>
