<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang='ts'>
	let clicks = 0;

	const handleClick = () => {
		clicks++;
	}

</script>

<div class="h-screen w-screen flex items-center justify-center">
	<button class='btn variant-filled mr-2'>Share</button>
	<button class='btn variant-filled-primary' on:click={handleClick}>clicks: {clicks}</button>
	<button class='btn variant-filled-secondary ml-2'>SET</button>
</div>
