<script lang="ts">
    export let visible: boolean;
    
    $: if (visible == true) {
        setTimeout(() => {visible = false}, 200);
    }
</script>

<div class="w-full h-full bg-red-600 fixed opacity-0 inset-0 transition-opacity" class:opacity-50={visible}/>