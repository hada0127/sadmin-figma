<script>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import styles from './styles.scss';
  /*

import SvgName from './image.svg';

//use in your markup
{@html SvgName}

*/
  let code = ``;
  const getCode = () => {
    parent.postMessage({ pluginMessage: { type: 'getCode' } }, '*');
  };
  window.onmessage = async (event) => {
    const msg = event.data.pluginMessage;
    if (msg.action === 'getCode') {
      if (msg.flag === 'success') {
        code = msg.data;
      } else {
        alert('Please select Object');
      }
    }
  };
</script>

<div class="wrap">
  <pre class="code" spellcheck="false">{code}</pre>
  <button on:click={getCode}>Get Code</button>
</div>
