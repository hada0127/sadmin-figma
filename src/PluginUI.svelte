<script>
  import Tabs from './lib/components/Tabs.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import styles from './styles.scss';
  /*
  import SvgName from './image.svg';
  {@html SvgName}
  */
  /*
  WireFrame
  */

  /*
  Description
  */

  /*
  Export
  */
  let code = ``;
  const getCode = () => {
    parent.postMessage({ pluginMessage: { type: 'getCode' } }, '*');
  };

  /*
  Recieve Message
  */
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
  <Tabs tabs={[{ name: 'WireFrame' }, { name: 'Description' }, { name: 'Export' }]}>
    <!-- WireFrame-->
    <div>
      <dl>
        <dh>Page</dh>
        <dd>123</dd>
        <dh>Grid</dh>
        <dd>345</dd>
        <dh>Components</dh>
        <dd>345</dd>
      </dl>
    </div>
    <!-- Description -->
    <div>Description</div>
    <!-- Export -->
    <div>
      <pre class="code" spellcheck="false">{code}</pre>
      <button on:click={getCode}>Get Code</button>
    </div>
  </Tabs>
</div>
