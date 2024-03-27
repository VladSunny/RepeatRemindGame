<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import type { UpdateScoreArgs } from '../update-score/types';
	import ItemButton from './ItemButton.svelte';
	import {
		LGButtonHeight,
		LGButtonWidth,
		MDButtonHeight,
		MDButtonWidth,
		SMButtonHeight,
		SMButtonWidth
	} from './config';
	import Timer from './Timer.svelte';
	import { breakpointStore } from '$lib/stores/breakpointsStore';
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import Mistake from './Mistake.svelte';
	export let data: PageData;

	const modalStore = getModalStore();

	let score = 0;
	let itemsRemain: number = Object.keys(data.module).length;
	let curPart = 0;
	const partSize = 4;

	let gameStoped: boolean = false;

	let lastClickValue = '';
	let lastClickKey = '';

	type Point = {
		x: number;
		y: number;
	};

	let hidden: Array<string> = [];
	let shuffledModule = shuffleObject(data.module);

	const handleKeyClick = (key: string) => () => {
		lastClickKey = key;

		if (lastClickValue) {
			if (data.module[lastClickKey] == lastClickValue) {
				console.log('correct');
				correctAnswer();
			} else {
				console.log('incorrect');
				incorrectAnswer();
			}

			lastClickKey = '';
			lastClickValue = '';
		}
	};

	const handleValueClick = (value: string) => () => {
		lastClickValue = value;

		if (lastClickKey) {
			if (data.module[lastClickKey] == lastClickValue) {
				console.log('correct');
				correctAnswer();
			} else {
				console.log('incorrect');
				incorrectAnswer();
			}

			lastClickKey = '';
			lastClickValue = '';
		}
	};

	$: getItems = () => {
		const pointsMatrix = generateMatrix();
		const temp1 = buttonWidth;
		const temp2 = buttonHeight;

		return Object.keys(shuffledModule)
			.slice(
				curPart * partSize,
				Math.min((curPart + 1) * partSize, Object.keys(shuffledModule).length)
			)
			.filter((key) => !hidden.includes(key))
			.map((key) => {
				const value = shuffledModule[key];

				const lPoint_ind = Math.round(Math.random() * (pointsMatrix.length - 1));
				const lPoint = pointsMatrix[lPoint_ind];
				pointsMatrix.splice(lPoint_ind, 1);

				const rPoint_ind = Math.round(Math.random() * (pointsMatrix.length - 1));
				const rPoint = pointsMatrix[rPoint_ind];
				pointsMatrix.splice(rPoint_ind, 1);

				const xl = lPoint.x;
				const yl = lPoint.y;

				const xr = rPoint.x;
				const yr = rPoint.y;

				return { key, xl, yl, value, xr, yr };
			});
	};

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

	$: items = getItems();

	let timer: ReturnType<typeof setInterval>;

	function correctAnswer(): void {
		hidden = [...hidden, lastClickKey];

		score++;
		itemsRemain--;

		if (timer) clearInterval(timer);

		timer = setInterval(() => {
			decreaseScore();
		}, 3000);

		if (Object.keys(data.module).length - itemsRemain == (curPart + 1) * partSize) {
			curPart++;
			items = getItems();
		}

		if (!itemsRemain) finishModule();
	}

	function incorrectAnswer(): void {
		decreaseScore();
	}

	function finishModule(): void {
		const args: UpdateScoreArgs = {
			userId: $page.url.searchParams.get('user_id') || '',
			chatId: $page.url.searchParams.get('chat_id') || '',
			gameMessageId: $page.url.searchParams.get('game_id') || '',
			inlineMessageId: $page.url.searchParams.get('inline_message_id') || '',
			score: score
		};

		console.log(args);
		fetch('/update-score', {
			method: 'POST',
			body: JSON.stringify(args)
		});

		gameStoped = true;
		clearInterval(timer);

		const modal: ModalSettings = {
			type: 'alert',
			// Data
			title: 'Игра закончена',
			body: `Ваш результат: ${score}!`,
			// TRUE if confirm pressed, FALSE if cancel pressed
			buttonTextCancel: 'Попробовать ещё раз',
			response: (r: boolean) => {
				score = 0;
				curPart = 0;
				itemsRemain = Object.keys(data.module).length;
				gameStoped = false;
				items = getItems();

				hidden = [];
				shuffledModule = shuffleObject(data.module);
			},
		};

		modalStore.trigger(modal);
	}

	function generateMatrix() {
		const pointsMatrix: { x: number; y: number }[] = [];

		const spaceY = 10;

		for (let y = spaceY; y + buttonHeight <= 100; y += buttonHeight) {
			for (let x = 0; x + buttonWidth <= 100; x += buttonWidth) {
				pointsMatrix.push({ x: x, y: y });
			}
		}

		return pointsMatrix;
	}

	function shuffleObject<T>(obj: Record<string, T>): Record<string, T> {
		let entries = Object.entries(obj);

		for (let i = entries.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[entries[i], entries[j]] = [entries[j], entries[i]];
		}

		return Object.fromEntries(entries);
	}

	let mistakeVisible = false;

	function decreaseScore() {
		if (score) {
			score--;
			mistakeVisible = true;
		}
	}
</script>

<div class="absolute pl-2 sm:text-4xl flex flex-row space-x-6 w-screen text-xl">
	<h1>Очки: {score}</h1>
	<Timer {gameStoped}/>
	<h1>Осталось: {itemsRemain}</h1>
</div>

<Mistake bind:visible={mistakeVisible}/>

<div class="h-screen w-screen relative">
	{#each items as item (item.key)}
		<ItemButton
			isKey
			x={item.xl}
			y={item.yl}
			onclick={handleKeyClick(item.key)}
			selected={lastClickKey === item.key}
		>
			{item.key}
		</ItemButton>
		<ItemButton
			isKey={false}
			x={item.xr}
			y={item.yr}
			onclick={handleValueClick(item.value)}
			selected={lastClickValue === item.value}
		>
			{item.value}
		</ItemButton>
	{/each}
</div>
