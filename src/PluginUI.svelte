<script>
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
    if (msg.flag === 'getCode') {
      code = msg.data;
    }
  };
</script>

<div class="wrap">
  <textarea class="code">{code}</textarea>
  <button on:click={getCode}>Get Code</button>
</div>
