<script>
  let nowAccordion = 1;
  const send = (message, data = null) => {
    parent.postMessage({ pluginMessage: { type: message, data } }, '*');
  };
</script>

<div id="accordion" class="accordionsgroup">
  <dl>
    <dh>
      <button
        on:click={() => {
          nowAccordion = 0;
        }}>Page</button
      >
    </dh>
    <dd class:is-visible={nowAccordion === 0}>
      <button on:click={() => send('addPage')}>Add Page</button>
    </dd>
    <dh>
      <button
        on:click={() => {
          nowAccordion = 1;
        }}>Grid</button
      >
    </dh>
    <dd class:is-visible={nowAccordion === 1}>
      <button on:click={() => send('drawGrid', [12])}>[1]</button>
      <button on:click={() => send('drawGrid', [6, 6])}>[1:1]</button>
      <button on:click={() => send('drawGrid', [4, 4, 4])}>[1:1:1]</button>
      <button on:click={() => send('drawGrid', [8, 4])}>[2:1]</button>
      <button on:click={() => send('drawGrid', [4, 8])}>[1:2]</button>
      <button on:click={() => send('drawGrid', [3, 3, 3, 3])}>[1:1:1:1]</button>
      <button on:click={() => send('drawGrid', [9, 3])}>[3:1]</button>
      <button on:click={() => send('drawGrid', [3, 9])}>[1:3]</button>
      <button on:click={() => send('getInfo')}>[Info]</button>
    </dd>
    <dh>
      <button
        on:click={() => {
          nowAccordion = 2;
        }}>Components</button
      >
    </dh>
    <dd class:is-visible={nowAccordion === 2}>345</dd>
  </dl>
</div>

<style>
  .accordionsgroup > dl > dh {
    display: block;
    width: 100%;
  }
  .accordionsgroup > dl > dh:not(:first-child) {
    margin-top: 5px;
  }
  .accordionsgroup > dl > dh > button {
    padding: 5px 10px;
    width: 100%;
    background-color: #efefef;
    font-weight: 800;
    text-align: left;
  }
  .accordionsgroup > dl > dd {
    display: none;
  }
  .accordionsgroup > dl > dd.is-visible {
    padding: 5px 10px;
    display: block;
  }
</style>
