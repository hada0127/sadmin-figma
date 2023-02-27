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
  let selectMarkerCheck = false;
  let markerText;
  let descriptionText;
  let markerColor;

  $: getCodeRes = nowTab === 2 ? '' : '';
  window.onmessage = async (event) => {
    const msg = event.data.pluginMessage;
    if (msg.flag === 'success') {
      if (msg.action === 'getCode') {
        getCodeRes = msg.data;
      } else if (msg.action === 'getMarker') {
        selectMarkerCheck = msg.data.selectMarkerCheck;
        markerText = msg.data.markerText;
        descriptionText = msg.data.descriptionText;
        markerColor = msg.data.markerColor;
      } else if (msg.action === 'getTable') {
        selectTableCheck = msg.data.selectTableCheck;
        tableCols = msg.data.tableCols;
        tableRows = msg.data.tableRows;
        tableColGroup = msg.data.tableColGroup;
        detectTable = true;
      }
    } else {
      parent.postMessage({ pluginMessage: { type: 'error', message: msg.message } }, '*');
      //alert(msg.message);
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
      <Description bind:selectMarkerCheck bind:markerText bind:descriptionText bind:markerColor />
    </div>
    <!-- Export -->
    <div>
      <Export bind:code={getCodeRes} />
    </div>
  </Tabs>
</div>
