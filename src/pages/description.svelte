<script>
  let nowAccordion = 0;
  const send = (message, data = null) => {
    parent.postMessage({ pluginMessage: { type: message, data } }, '*');
  };
  export let selectMarkerCheck = false;
  export let markerText;
  export let markerColor = 'red';
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
        Marker Text : <input type="text" bind:value={markerText} maxlength="2" />
        <button
          class="marker-color red"
          class:active={markerColor === 'red'}
          on:click={() => {
            markerColor = 'red';
          }}>Red</button
        >
        <button
          class="marker-color yellow"
          class:active={markerColor === 'yellow'}
          on:click={() => {
            markerColor = 'yellow';
          }}>Yellow</button
        >
        <button
          class="marker-color green"
          class:active={markerColor === 'green'}
          on:click={() => {
            markerColor = 'green';
          }}>Green</button
        >
        <button
          class="marker-color blue"
          class:active={markerColor === 'blue'}
          on:click={() => {
            markerColor = 'blue';
          }}>Blue</button
        >
      </div>
      <div>
        <textarea placeholder="Description Text" bind:value={descriptionText} />
      </div>
      <div>
        {#if selectMarkerCheck}
          <button on:click={() => send('addMarker', { markerText, descriptionText, markerColor })}
            >Set Marker</button
          >
          <button on:click={() => send('removeMarker')} class="danger">Remove Marker</button>
        {:else}
          <button on:click={() => send('addMarker', { markerText, descriptionText, markerColor })}
            >Add Marker</button
          >
        {/if}
      </div>
    </dd>
    <!-- <dh>
      <button
        on:click={() => {
          nowAccordion = 1;
        }}>Flow</button
      >
    </dh> -->
    <!-- <dd class:is-visible={nowAccordion === 1} class="flow">flow</dd> -->
  </dl>
</div>

<style>
  .accordionsgroup > dl > dd.description input {
    width: 50px;
    padding: 5px 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }
  .accordionsgroup > dl > dd.description textarea {
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
  .accordionsgroup > dl > dd.description button.danger {
    background: #ff3860;
  }

  .accordionsgroup > dl > dd.description button.marker-color {
    padding: 0;
    width: 26px;
    height: 26px;
    text-indent: -9999px;
    border-radius: 13px;
    border: 3px solid #fff;
  }
  .accordionsgroup > dl > dd.description button.marker-color.active {
    border: 3px solid #000;
  }
  .accordionsgroup > dl > dd.description button.marker-color.red {
    background-color: #f00;
  }
  .accordionsgroup > dl > dd.description button.marker-color.yellow {
    background-color: rgb(252, 185, 0);
  }
  .accordionsgroup > dl > dd.description button.marker-color.green {
    background-color: rgb(75, 200, 110);
  }
  .accordionsgroup > dl > dd.description button.marker-color.blue {
    background-color: rgb(52, 128, 209);
  }
</style>
