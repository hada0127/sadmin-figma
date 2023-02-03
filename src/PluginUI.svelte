<script>
  import Tabs from './lib/components/Tabs.svelte';
  import Wireframe from './pages/wireframe.svelte';
  import Description from './pages/description.svelte';
  import Export from './pages/export.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import styles from './styles.scss';
  let nowTab = 0;
  let detectTable;
  let getCodeRes;
  let selectTableCheck = false;
  let tableCols, tableRows, tableColGroup;
  $: getCodeRes = nowTab === 2 ? '' : '';
  window.onmessage = async (event) => {
    const msg = event.data.pluginMessage;
    if (msg.flag === 'success') {
      if (msg.action === 'getCode') {
        getCodeRes = msg.data;
      } else if (msg.action === 'getTable') {
        selectTableCheck = msg.data.selectTableCheck;
        tableCols = msg.data.tableCols;
        tableRows = msg.data.tableRows;
        // tableColGroup = msg.data.tableColGroup;
        detectTable = true;
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
      <Wireframe
        bind:selectTableCheck
        bind:tableCols
        bind:tableRows
        bind:tableColGroup
        bind:detectTable
      />
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
