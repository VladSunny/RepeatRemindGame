<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang='ts'>
	import { page } from "$app/stores";
	import type { UpdateScoreArgs } from "./update-score/types";

	let clicks = 0;

	const handleClick = () => {
		clicks++;
	}

	const handleShareClick = () => {
        window.TelegramGameProxy?.shareScore();
	}

	const handleSetClick = () => {
		const args: UpdateScoreArgs = {
			userId: $page.url.searchParams.get("user_id") || "",
			chatId: $page.url.searchParams.get("chat_id") || "",
			gameMessageId: $page.url.searchParams.get("game_id") || "",
			inlineMessageId: $page.url.searchParams.get("inline_message_id") || "",
			score: clicks,
		};

		console.log(args);
		fetch("/update-score", {
			method: "POST",
			body: JSON.stringify(args),
		})
	}

</script>

<div class="h-screen w-screen flex items-center justify-center">
	<!-- <button onclick="TelegramGameProxy.shareScore()">Share score</button> -->
	<button class='btn variant-filled mr-2 focus:outline-none' on:click={handleShareClick}>Share</button>
	<button class='btn variant-filled-primary' on:click={handleClick}>clicks: {clicks}</button>
	<button class='btn variant-filled-secondary ml-2 bg-transparent outline-none border-none' on:click={handleSetClick}>SET</button>
</div>
