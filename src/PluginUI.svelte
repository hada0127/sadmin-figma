<script>
  import Tabs from './lib/components/Tabs.svelte';
  import Wireframe from './pages/wireframe.svelte';
  import Description from './pages/description.svelte';
  import Export from './pages/export.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import styles from './styles.scss';
  let nowTab = 0;
  let getCodeRes;
  $: getCodeRes = nowTab === 2 ? '' : '';
  window.onmessage = async (event) => {
    const msg = event.data.pluginMessage;
    if (msg.flag === 'success') {
      if (msg.action === 'getCode') {
        getCodeRes = msg.data;
      }
    } else {
      alert(msg.message);
    }
  };
</script>

<div class="wrap">
  <Tabs bind:nowTab tabs={[{ name: 'WireFrame' }, { name: 'Description' }, { name: 'Export' }]}>
    <!-- WireFrame-->
    <div>
      <Wireframe />
    </div>
    <!-- Description -->
    <div>
      <Description />
    </div>
    <!-- Export -->
    <div>
      <Export bind:code={getCodeRes} />
    </div>
  </Tabs>
</div>
