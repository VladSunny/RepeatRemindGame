<script lang="ts">
	import { buttonHeight, buttonWidth } from "./config";

    export let isKey: boolean;
    export let x: number;
    export let y: number;
    export let onclick: () => void;


</script>

<button on:click={onclick} class='absolute btn variant-filled-primary' class:variant-filled-secondary = {!isKey} style="left: {x}vw; top: {y}vh; width: {buttonWidth}vw; height: {buttonHeight}vh">
    <p><slot/></p>
</button>

<style>
    /* button {
        width: 20vw;
        height: 15vh;
    } */
</style>