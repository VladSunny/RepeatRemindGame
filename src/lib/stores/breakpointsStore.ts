// src/stores/breakpointStore.ts
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

interface BreakpointValues {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
}

function createBreakpointStore() {
	const { subscribe, set } = writable<BreakpointValues>({
		isMobile: false,
		isTablet: false,
		isDesktop: false
	});

	if (browser) {
		const mediaQueries = [
			window.matchMedia('(max-width: 599px)'), // Mobile
			window.matchMedia('(min-width: 600px) and (max-width: 1199px)'), // Tablet
			window.matchMedia('(min-width: 1200px)') // Desktop
		];

		const update = () => {
			set({
				isMobile: mediaQueries[0].matches,
				isTablet: mediaQueries[1].matches,
				isDesktop: mediaQueries[2].matches
			});
		};

		mediaQueries.forEach((mq) => mq.addListener(update));
		update(); // Initial update
	}

	return { subscribe };
}

export const breakpointStore = createBreakpointStore();
