<script>
  import Sidebar from "$lib/Sidebar.svelte";
  import Header from "../../lib/Archived/Header.svelte";
  import Section1 from "../../lib/Archived/Section1.svelte";
  import Section2 from "$lib/Sections/Section2.svelte";
  import Section3 from "$lib/Sections/Section3.svelte";
  import { onMount } from "svelte";
  import { isMenuOpen } from "../../lib/store";

  let section3Content = "";

  onMount(() => {
    if (typeof window !== "undefined") {
      console.log(window.localStorage);
      section3Content = localStorage.getItem("section3") || "";
    }
  });

  $: if (typeof window !== "undefined") {
    localStorage.setItem("section3", section3Content);
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
        <Section1 />
      </div>
      <div class="section2" style="flex: {$isMenuOpen ? '2' : '3'};">
        <Section2 />
      </div>
      {#if $isMenuOpen}
      <div class="section3">
        <Section3 bind:content={section3Content} />
      </div>
      {/if}
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
  .section1 {
    flex: 1;
    height: 100%;
  }
  .section2 {
    height: 100%;
    transition: flex 0.3s;
  }
  .section3 {
    flex: 1;
    height: 100%;
  }
</style>
