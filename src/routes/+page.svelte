<script>
    import Sidebar from '$lib/Sidebar.svelte';
    import Header from '$lib/Header.svelte';
    import Section1 from '$lib/Section1.svelte';
    import Section2 from '$lib/Section2.svelte';
    import Section3 from '$lib/Section3.svelte';
    import { onMount } from 'svelte';

    let section3Content = '';

    onMount(() => {
        if (typeof window !== 'undefined') {
            section3Content = localStorage.getItem('section3') || '';
        }
    });

    $: if (typeof window !== 'undefined') {
        localStorage.setItem('section3', section3Content);
    }
</script>

<div class="sidebar">
    <Sidebar />
</div>
<div class="content">
    <Header />
    <div class="body">
        <div class="section1">
            <Section1 />
        </div>
        <div class="section2">
            <Section2 />
        </div>
        <div class="section3">
            <Section3 bind:content={section3Content} />
        </div>
    </div>
</div>

<style>
    .sidebar {
        width: 250px;
        background-color: #f4f4f4;
        padding: 10px;
    }
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 250px;
    }
    .body {
        display: flex;
        height: 100%;
        padding: 10px;
        background-color: #fafafa;
    }
    .section1, .section2, .section3 {
        padding: 10px;
        border: 1px solid #ccc;
        background-color: #fff;
    }
    .section2 {
        flex: 2;
    }
</style>

