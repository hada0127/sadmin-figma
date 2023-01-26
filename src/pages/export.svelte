<script>
  export let code = ``;
  const getCode = () => {
    parent.postMessage({ pluginMessage: { type: 'getCode' } }, '*');
  };
</script>

<pre class="code" spellcheck="false">{code}</pre>
<button on:click={getCode}>Get Code</button>

<style>
  /* export */
  pre.code {
    width: 100%;
    height: calc(100vh - 110px);
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
