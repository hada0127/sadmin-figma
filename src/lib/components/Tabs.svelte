<script>
  import { onMount } from 'svelte';
  export let tabs = [];
  export let nowTab = 0;
  const send = (message, data = null) => {
    parent.postMessage({ pluginMessage: { type: message, data } }, '*');
  };
  const setTabs = (selectTab) => {
    send('getInfo');
    send('getTable');
    send('getMarker');

    nowTab = selectTab;
    document.querySelectorAll(`#tab > div:not(.tabs)`).forEach((el, i) => {
      if (i === selectTab) {
        el.classList.add('is-visible');
      } else {
        el.classList.remove('is-visible');
      }
    });
  };
  onMount(() => {
    setTabs(0);
    tabs.forEach(function (tab, i) {
      if (tab.checked === true) {
        nowTab = i;
        setTabs(nowTab);
      }
    });
  });
</script>

<div id="tab" class="tabsgroup">
  <div class="tabs is-small">
    <ul>
      {#each tabs as tab, i}
        <li class={i === nowTab ? 'is-active' : ''}>
          <!-- svelte-ignore a11y-missing-attribute -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a
            href={tab.link ? tab.link : undefined}
            on:click={() => {
              setTabs(i);
            }}>{tab.name}</a
          >
        </li>
      {/each}
    </ul>
  </div>
  <slot />
</div>
