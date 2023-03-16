<script>
  export let code = ``;
  export let prefix = ``;
  const getCode = () => {
    parent.postMessage({ pluginMessage: { type: 'getCode', data: prefix } }, '*');
  };
</script>

<input type="text" bind:value={prefix} placeholder="CSS Prefix" />
<pre class="code" spellcheck="false">{code}</pre>
<button on:click={getCode}>Get Code</button>

<style>
  /* export */
  input {
    width: 100%;
    overflow: auto;
    background: #333;
    color: #fff;
    padding: 5px 10;
    border-radius: 4px;
    margin-bottom: 10px;
    resize: none;
  }
  pre.code {
    width: 100%;
    height: calc(100vh - 170px);
    overflow: auto;
    background: #333;
    color: #fff;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    resize: none;
  }
  button {
    width: 100%;
    overflow: auto;
    background: #00d1b2;
    color: #fff;
    padding: 10px;
    text-align: center;
    border-radius: 4px;
  }
</style>
