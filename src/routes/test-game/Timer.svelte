<script lang="ts">
  import { onDestroy } from 'svelte';

  export let maxSeconds: number;
  let remainingSeconds: number = maxSeconds;

  let timer: ReturnType<typeof setInterval>;

  export let timeIsUp: () => void;
  
  // Старт таймера
  function startTimer(): void {
    timer = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds -= 1;
      } else {
        stopTimer();
        timeIsUp();
      }
    }, 1000);
  }
  
  function stopTimer(): void {
    clearInterval(timer);
  }
  
  startTimer();

  onDestroy(stopTimer);
</script>

<h1>Оставшееся время: {remainingSeconds}/{maxSeconds} секунд</h1>
