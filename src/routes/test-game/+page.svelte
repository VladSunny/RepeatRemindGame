<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang='ts'>
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import type { UpdateScoreArgs } from "../update-score/types";
	import ItemButton from "./ItemButton.svelte";
	import { buttonHeight, buttonWidth } from "./config";
	export let data: PageData;

	let lastClickValue = "";
	let lastClickKey = "";

	type Point = {
		x: number;
		y: number;
	}

	let lPointsMatrix: Point[][] = [];
	let rPointsMatrix: Point[][] = [];

	let spaceX = 0;
	let spaceY = 0

	generateMatrix();

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

		const lPoint_i = Math.round(Math.random() * (lPointsMatrix.length - 1));
		const lPoint_j = Math.round(Math.random() * (lPointsMatrix[lPoint_i].length - 1));

		const rPoint_i = Math.round(Math.random() * (rPointsMatrix.length - 1));
		const rPoint_j = Math.round(Math.random() * (rPointsMatrix[rPoint_i].length - 1));
		
		console.log(`
			lPoint_i = ${lPoint_i}
			lPoint_j = ${lPoint_j}

			rPoint_i = ${rPoint_i}
			rPoint_j = ${rPoint_j}
		`);

		const lPoint = lPointsMatrix[lPoint_i][lPoint_j]
		const rPoint = rPointsMatrix[rPoint_i][rPoint_j]

		lPointsMatrix[lPoint_i].splice(lPoint_j, 1);
		rPointsMatrix[rPoint_i].splice(rPoint_j, 1);

		if (!lPointsMatrix[lPoint_i].length)
			lPointsMatrix.splice(lPoint_i, 1);
		if (!rPointsMatrix[rPoint_i].length)
			rPointsMatrix.splice(rPoint_i, 1);

		const xl = lPoint.x;
		const yl = lPoint.y;

		const xr = rPoint.x;
		const yr = rPoint.y;

		return {key, xl, yl, value, xr, yr};
	})

	function totalLengthFrom2DArray<T>(arr: T[][]): number {
		let size = 0;
		
		for (const item of arr) {
			size += item.length;
		}

		return size;
	}

	function generateMatrix(): void {

		lPointsMatrix = [];
		rPointsMatrix = [];

		if (100 % buttonWidth == 0) spaceX = buttonWidth / 2;
		else spaceX = (100 % buttonWidth) / 2;

		if (100 % buttonHeight == 0) spaceY = buttonHeight / 2;
		else spaceY = (100 % buttonHeight) / 2;

		for (let y = spaceY; y + buttonHeight <= 100; y += buttonHeight) {
			lPointsMatrix.push([])
			for (let x = spaceX; x + buttonWidth <= 50; x += buttonWidth) {
				lPointsMatrix[lPointsMatrix.length - 1].push({x: x, y: y});
			}
		}

		for (let y = spaceY; y + buttonHeight <= 100; y += buttonHeight) {
			rPointsMatrix.push([])
			for (let x = 50; x + buttonWidth <= 100; x += buttonWidth) {
				rPointsMatrix[rPointsMatrix.length - 1].push({x: x, y: y});
			}
		}
	}
</script>

<div class="h-screen w-screen relative">
	{#each items as item}
		<ItemButton isKey x={item.xl} y={item.yl} onclick={handleKeyClick(item.key)}> {item.key} </ItemButton>
		<ItemButton isKey={false} x={item.xr} y={item.yr} onclick={handleValueClick(item.value)}> {item.value} </ItemButton>
	{/each}
</div>
