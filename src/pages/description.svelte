<script>
  let nowAccordion = 0;
  const send = (message, data = null) => {
    parent.postMessage({ pluginMessage: { type: message, data } }, '*');
  };
  export let descriptionText;
</script>

<div id="accordion" class="accordionsgroup">
  <dl>
    <dh>
      <button
        on:click={() => {
          nowAccordion = 0;
        }}>Description</button
      >
    </dh>
    <dd class:is-visible={nowAccordion === 0} class="description">
      <div>
        <input type="text" placeholder="Description Text" bind:value={descriptionText} />
      </div>
      <div>
        <button on:click={() => send('addMarker', descriptionText)}>Add Marker</button>
      </div>
    </dd>
    <dh>
      <button
        on:click={() => {
          nowAccordion = 1;
        }}>Flow</button
      >
    </dh>
    <dd class:is-visible={nowAccordion === 1} class="flow">flow</dd>

    <button on:click={() => send('getInfo')}>[Info]</button>
  </dl>
</div>

<style>
  .accordionsgroup > dl > dd.description input {
    width: 100%;
    padding: 5px 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }
  .accordionsgroup > dl > dd.description button {
    margin-bottom: 10px;
    padding: 5px 8px;
    border-radius: 5px;
    background: #00d1b2;
    color: #fff;
  }
</style>
