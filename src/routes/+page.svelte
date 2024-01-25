<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang='ts'>
	let clicks = 0;

	const handleClick = () => {
		clicks++;
	}

</script>

<style>
	button {
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		-webkit-tap-highlight-color: transparent;
	}
</style>

<div class="h-screen w-screen flex items-center justify-center">
	<button class='btn variant-filled mr-2 focus:outline-none'>Share</button>
	<button class='btn variant-filled-primary' on:click={handleClick}>clicks: {clicks}</button>
	<button class='btn variant-filled-secondary ml-2 bg-transparent outline-none border-none'>SET</button>
	
	  
</div>
