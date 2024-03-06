<script lang="ts">
	import { fade } from "svelte/transition";
	import { buttonHeight, buttonMargin, buttonWidth } from "./config";

    export let isKey: boolean;
    export let x: number;
    export let y: number;
    export let onclick: () => void;
    export let selected: boolean;

</script>

<button on:click={onclick} transition:fade={{ duration: 500 }} class='fade absolute btn variant-filled-primary ring-opacity-50' class:variant-ghost-primary = {!isKey} style="left: {x}vw; top: {y}vh; width: {buttonWidth - buttonMargin}vw; height: {buttonHeight - buttonMargin}vh" class:ring-8={selected} class:ring-green-500={selected}>
    <p><slot/></p>
</button>
