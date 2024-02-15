<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	    // This is the data we are receiving from +layout.ts
	export let data: LayoutData;

	// We are using a reactive declaraion to extract the values we need.
	// Using $: ensures that the values will always be up to date.
	$: ({ supabase, session } = data);

	onMount(() => {
		// Whenever the layout is first mounted in the browser, we begin listening
		// for changes to the session. If the session expires, we invalidate the
		// 'supabase:auth' token, which re-triggers the load function in +layout.ts
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		// The function returned from onMount is called when the component is unmounted,
		// so we can unsubscribe from all the listeners we created.
		return () => {
			data.subscription.unsubscribe();
		};
	});
</script>

<slot />
