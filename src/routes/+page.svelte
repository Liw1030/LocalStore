<script>
    import Sidebar from "$lib/Sidebar.svelte";
    import Header from "$lib/Header.svelte";
    import Section1 from "$lib/Sections/Section1.svelte";
    import Section2 from "$lib/Sections/Section2.svelte";
    import Section3 from "$lib/Sections/Section3.svelte";
    import { onMount } from "svelte";
    import { isMenuOpen } from "$lib/store.js";
    import { get } from "svelte/store";

    let section3Content = "";

    onMount(() => {
        if (typeof window !== "undefined") {
            section3Content = localStorage.getItem("section3") || "";
        }
    });

    $: if (typeof window !== "undefined") {
        localStorage.setItem("section3", section3Content);
    }

    let menuOpen = get(isMenuOpen);

    $: menuOpen = $isMenuOpen;

    function toggleMenu() {
        isMenuOpen.set(!menuOpen);
    }
</script>

<section>
    <div class="sidebar">
        <Sidebar />
    </div>
    <div class="content">
        <Header />
        <div class="body">
            <div class="section1">
                <Section1 {toggleMenu} />
            </div>
            <div class="section2">
                <Section2 />
            </div>
            <div class="section3" class:is-visible={$isMenuOpen}>
                <Section3 bind:content={section3Content} />
            </div>
        </div>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .body {
        display: flex;
        height: 100%;
    }
    .section1, .section3 {
        flex: 1;
        height: 100%;
    }
    .section2 {
        flex: 2;
        height: 100%;
    }
    .section3 {
        display: none;  /* Ocultar inicialmente */
    }
    .section3.is-visible {
        display: block;  /* Mostrar cuando is-visible esté activo */
    }
</style>
