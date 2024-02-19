<script lang="ts">
	import { buttonHeight, buttonMargin, buttonWidth } from "./config";

    export let isKey: boolean;
    export let x: number;
    export let y: number;
    export let onclick: () => void;
    export let id: string;

</script>

<button on:click={onclick} id={id} class='absolute btn variant-filled-primary focus:ring-8 focus:ring-green-500 focus:ring-opacity-50' class:variant-ghost-primary = {!isKey} style="left: {x}vw; top: {y}vh; width: {buttonWidth - buttonMargin}vw; height: {buttonHeight - buttonMargin}vh">
    <p><slot/></p>
</button>
