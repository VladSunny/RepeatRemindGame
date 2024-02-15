<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang='ts'>
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import type { UpdateScoreArgs } from "../update-score/types";
	import ItemButton from "./ItemButton.svelte";
	export let data: PageData;

	let clicks = 0;
	let lastClickValue = "";
	let lastClickKey = "";

	const handleClick = async () => {
		clicks++;
		console.log(await data.supabase.from("modules").select("*"));
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

	const handleKeyClick = (key: string) => () => {
		lastClickKey = key;

		if (lastClickValue) {
			if (data.module[lastClickKey] == lastClickValue) {
				console.log("correct");
			}
			else {
				console.log("incorrect")
			}

			lastClickKey = "";
			lastClickValue = "";
		}
	}

	const handleValueClick = (value: string) => () => {
		lastClickValue = value;

		if (lastClickKey) {
			if (data.module[lastClickKey] == lastClickValue) {
				console.log("correct");
			}
			else {
				console.log("incorrect")
			}

			lastClickKey = "";
			lastClickValue = "";
		}
	}

	$: console.log(data.module);
	$: items = Object.keys(data.module).map(key => {
		const value = data.module[key];
		
		const xl = Math.random() * 20 + 5;
		const yl = Math.random() * 80 + 5;

		const xr = Math.random() * 20 + 55;
		const yr = Math.random() * 80 + 5;

		return {key, xl, yl, value, xr, yr};
	})

</script>

<div class="h-screen w-screen relative">
	{#each items as item}
		<ItemButton isKey x={item.xl} y={item.yl} onclick={handleKeyClick(item.key)}> {item.key} </ItemButton>
		<ItemButton isKey={false} x={item.xr} y={item.yr} onclick={handleValueClick(item.value)}> {item.value} </ItemButton>
	{/each}
</div>
