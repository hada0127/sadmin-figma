<script>
  import { onMount } from 'svelte';
  export let pageMove = false;
  export let accordions = [];
  export let inheritsClass = $$props.class ? $$props.class : '';

  let nowAccordion = 0;

  const setAccordions = (selectAccordion) => {
    nowAccordion = selectAccordion;
    document.querySelectorAll(`#accordion div:not(.accordions)`).forEach((el, i) => {
      if (i === selectAccordion) {
        el.classList.add('is-visible');
      } else {
        el.classList.remove('is-visible');
      }
    });
  };
  onMount(() => {
    setAccordions(0);
    accordions.forEach(function (accordion, i) {
      if (accordion.checked === true) {
        nowAccordion = i;
        setAccordions(nowAccordion);
      }
    });
  });
</script>

<div id="accordion" class="accordionsgroup">
  <div class="accordions is-small {inheritsClass}">
    <ul>
      {#each accordions as accordion, i}
        <li class={i === nowAccordion ? 'is-active' : ''}>
          <!-- svelte-ignore a11y-missing-attribute -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a
            href={accordion.link ? accordion.link : undefined}
            on:click={() => {
              setAccordions(i);
            }}>{accordion.name}</a
          >
        </li>
      {/each}
    </ul>
  </div>
  {#if pageMove === false}
    <slot />
  {/if}
</div>
