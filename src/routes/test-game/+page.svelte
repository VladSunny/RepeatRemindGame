<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang='ts'>
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import type { UpdateScoreArgs } from "../update-score/types";
	import ItemButton from "./ItemButton.svelte";
	import { buttonHeight, buttonWidth } from "./config";
	import Timer from "./Timer.svelte";
	export let data: PageData;

	let score = 0;
	let itemsRemain: number = Object.keys(data.module).length;
	let curPart = 0;
	const partSize = 5;

	let lastClickValue = "";
	let lastClickKey = "";

	type Point = {
		x: number;
		y: number;
	}

	let spaceX = 0;
	let spaceY = 0;

	let hidden: Array<string> = [];

	shuffleObject(data.module);

	const handleKeyClick = (key: string) => () => {
		lastClickKey = key;

		if (lastClickValue) {
			// const lastClickKeyButton = document.getElementById(buttonID);
			// lastClickKeyButton?.blur();

			if (data.module[lastClickKey] == lastClickValue) {
				console.log("correct");
				correctAnswer();
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
				correctAnswer();
			}
			else {
				console.log("incorrect")
			}

			lastClickKey = "";
			lastClickValue = "";
		}
	}

	$: getItems = () => {
		const {lPointsMatrix, rPointsMatrix} = generateMatrix();

		return Object.keys(data.module).slice(curPart * partSize, Math.min((curPart + 1) * partSize, Object.keys(data.module).length)).filter(key => !hidden.includes(key)).map(key => {
			const value = data.module[key];

			const lPoint_ind = Math.round(Math.random() * (lPointsMatrix.length - 1));
			const rPoint_ind = Math.round(Math.random() * (rPointsMatrix.length - 1));

			const lPoint = lPointsMatrix[lPoint_ind]
			const rPoint = rPointsMatrix[rPoint_ind]

			lPointsMatrix.splice(lPoint_ind, 1);
			rPointsMatrix.splice(rPoint_ind, 1);

			const xl = lPoint.x;
			const yl = lPoint.y;

			const xr = rPoint.x;
			const yr = rPoint.y;

			return {key, xl, yl, value, xr, yr};
		})
	}

	$: items = getItems();

	function correctAnswer(): void {
		hidden = [...hidden, lastClickKey];

		score++;
		itemsRemain--;

		if (Object.keys(data.module).length - itemsRemain == (curPart + 1) * partSize) {
			curPart++;
			items = getItems();
		}
	}

	function generateMatrix() {
		const lPointsMatrix: { x: number; y: number }[] = [];
    	const rPointsMatrix: { x: number; y: number }[] = [];

		if (100 % buttonWidth == 0) spaceX = buttonWidth / 2;
		else spaceX = (100 % buttonWidth) / 2;

		if (100 % buttonHeight == 0) spaceY = buttonHeight / 2;
		else spaceY = (100 % buttonHeight) / 2;

		for (let y = spaceY; y + buttonHeight <= 100; y += buttonHeight) {
			for (let x = spaceX; x + buttonWidth <= 50; x += buttonWidth) {
				lPointsMatrix.push({x: x, y: y});
			}
		}

		for (let y = spaceY; y + buttonHeight <= 100; y += buttonHeight) {
			for (let x = 50; x + buttonWidth <= 100; x += buttonWidth) {
				rPointsMatrix.push({x: x, y: y});
			}
		}
		return {lPointsMatrix, rPointsMatrix};
	}

	function shuffleObject<T>(obj: Record<string, T>): Record<string, T> {
		let entries = Object.entries(obj);
	
		for (let i = entries.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[entries[i], entries[j]] = [entries[j], entries[i]];
		}
	
		return Object.fromEntries(entries);
	}

	function chunkObject<T>(obj: Record<string, T>, chunkSize: number): Array<Record<string, T>> {
		const entries: [string, T][] = Object.entries(obj);

		const chunkArray = <T>(array: T[], size: number): T[][] => {
			return array.reduce((resultArray, item, index) => {
			const chunkIndex = Math.floor(index / size);

			if(!resultArray[chunkIndex]) {
				resultArray[chunkIndex] = [];
			}

			resultArray[chunkIndex].push(item);
			
			return resultArray;
			}, [] as T[][]);
		};

		const chunkedEntries = chunkArray(entries, chunkSize);

		return chunkedEntries.map(chunk => Object.fromEntries(chunk));
	}
	
</script>

<div class="absolute pl-2 text-4xl flex flex-row space-x-6 w-screen">
	<h1>Очки: {score}</h1>
	<Timer/>
	<h1>Осталось: {itemsRemain}</h1>
</div>


<div class="h-screen w-screen relative">
	{#each items as item (item.key)}
		<ItemButton isKey x={item.xl} y={item.yl} onclick={handleKeyClick(item.key)} selected={lastClickKey === item.key}> {item.key} </ItemButton>
		<ItemButton isKey={false} x={item.xr} y={item.yr} onclick={handleValueClick(item.value)} selected={lastClickValue === item.value}> {item.value} </ItemButton>
	{/each}
</div>
