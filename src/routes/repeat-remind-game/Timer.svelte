<script lang="ts">
	import { onDestroy } from 'svelte';

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

	startTimer();

	onDestroy(stopTimer);
</script>

<h1>Прошло {elapsed}</h1>
