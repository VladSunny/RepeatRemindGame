<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	export let gameStoped: boolean;

	let elapsed: number = 0;

	let timer: ReturnType<typeof setInterval>;

	// Старт таймера
	function startTimer(): void {
		timer = setInterval(() => {
			elapsed++;
		}, 1000);
	}

	function stopTimer(): void {
		clearInterval(timer);
	}

	$: if (gameStoped) {
		stopTimer();
	}
	else {
		elapsed = 0;
		startTimer();
	}

	onMount( () => {
		return stopTimer;
	})
</script>

<h1>Прошло {elapsed}</h1>
