<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		LGButtonHeight,
		LGButtonWidth,
		MDButtonHeight,
		MDButtonWidth,
		SMButtonHeight,
		SMButtonWidth,
		buttonPadding
	} from './config';
	import { breakpointStore } from '$lib/stores/breakpointsStore';

	export let isKey: boolean;
	export let x: number;
	export let y: number;
	export let onclick: () => void;
	export let selected: boolean;

	$: buttonWidth = getButtonWidth();
	$: buttonHeight = getButtonHeight();

	$: getButtonWidth = () => {
		if ($breakpointStore.isDesktop) return LGButtonWidth;
		else if ($breakpointStore.isTablet) return MDButtonWidth;
		return SMButtonWidth;
	};

	$: getButtonHeight = () => {
		if ($breakpointStore.isDesktop) return LGButtonHeight;
		else if ($breakpointStore.isTablet) return MDButtonHeight;
		return SMButtonHeight;
	};
</script>

<button
	on:click={onclick}
	transition:fade={{ duration: 500 }}
	class="fade absolute btn variant-filled-primary ring-opacity-50"
	class:variant-ghost-primary={!isKey}
	style="left: {x}vw; top: {y}vh; width: {buttonWidth - buttonPadding}vw; height: {buttonHeight -
		buttonPadding}vh"
	class:ring-8={selected}
	class:ring-green-500={selected}
>
	<p><slot /></p>
</button>
