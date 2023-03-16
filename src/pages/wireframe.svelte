<script>
  import btnPc from '../lib/data/wireframe/pc.svg';
  import btnMo from '../lib/data/wireframe/mo.svg';
  import btn1 from '../lib/data/wireframe/btn1.svg';
  import btn1_1 from '../lib/data/wireframe/btn1_1.svg';
  import btn1_1_1 from '../lib/data/wireframe/btn1_1_1.svg';
  import btn2_1 from '../lib/data/wireframe/btn2_1.svg';
  import btn1_2 from '../lib/data/wireframe/btn1_2.svg';
  import btn1_1_1_1 from '../lib/data/wireframe/btn1_1_1_1.svg';
  import btn3_1 from '../lib/data/wireframe/btn3_1.svg';
  import btn1_3 from '../lib/data/wireframe/btn1_3.svg';
  import btnBorderBox from '../lib/data/wireframe/btnBorderBox.svg';
  import btnRemove from '../lib/data/wireframe/btnRemove.svg';
  import btnDrag from '../lib/data/wireframe/btnDrag.svg';

  let nowAccordion = 0;
  const send = (message, data = null) => {
    parent.postMessage({ pluginMessage: { type: message, data } }, '*');
  };
  export let selectTableCheck = false;
  export let tableCols = 2;
  export let tableRows = 2;
  export let tableColGroup = [
    { value: 'fill', selected: 'fill' },
    { value: 'fill', selected: 'fill' }
  ];
  let oldTableColGroup = tableColGroup;
  let tableInfo;
  $: {
    tableInfo = { col: tableCols, row: tableRows, colgroup: tableColGroup };
  }

  const setTableCols = () => {
    oldTableColGroup = tableColGroup;
    tableColGroup = [];
    for (let i = 0; i < tableCols; i++) {
      let value = i < oldTableColGroup.length ? oldTableColGroup[i].value : 'fill';
      let selected = value !== 'fill' ? 'fixed' : 'fill';
      tableColGroup[i] = { value, selected: selected };
    }
  };

  // 테이블 드래그 순서 변경
  let hovering = null;
  let dragFlag = false;
  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move';
    const start = parseInt(event.dataTransfer.getData('text/plain'));
    const newTracklist = tableColGroup;

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    const sendData = {
      start,
      target
    };
    send('changeTableOrder', sendData);
    tableColGroup = newTracklist;
    hovering = null;
    dragFlag = false;
  };

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    const start = i;
    event.dataTransfer.setData('text/plain', start);
  };
</script>

<div id="accordion" class="accordionsgroup">
  <dl>
    <dh>
      <button
        on:click={() => {
          nowAccordion = 0;
        }}>Page</button
      >
    </dh>
    <dd class:is-visible={nowAccordion === 0}>
      <button on:click={() => send('addPage', 'pc')}>{@html btnPc}<br />PC</button>
      <button on:click={() => send('addPage', 'mo')}>{@html btnMo}<br />MO</button>
    </dd>
    <dh>
      <button
        on:click={() => {
          nowAccordion = 1;
        }}>Grid & Border Box</button
      >
    </dh>
    <dd class:is-visible={nowAccordion === 1}>
      <button class="grid" on:click={() => send('drawGrid', [12])}>{@html btn1}<br />1</button>
      <button class="grid" on:click={() => send('drawGrid', [6, 6])}>{@html btn1_1}<br />1:1</button
      >
      <button class="grid" on:click={() => send('drawGrid', [4, 4, 4])}
        >{@html btn1_1_1}<br />1:1:1</button
      >
      <button class="grid" on:click={() => send('drawGrid', [8, 4])}>{@html btn2_1}<br />2:1</button
      >
      <button class="grid" on:click={() => send('drawGrid', [4, 8])}>{@html btn1_2}<br />1:2</button
      >
      <button class="grid" on:click={() => send('drawGrid', [3, 3, 3, 3])}
        >{@html btn1_1_1_1}<br />1:1:1:1</button
      >
      <button class="grid" on:click={() => send('drawGrid', [9, 3])}>{@html btn3_1}<br />3:1</button
      >
      <button class="grid" on:click={() => send('drawGrid', [3, 9])}>{@html btn1_3}<br />1:3</button
      >
      <button class="grid" on:click={() => send('drawBorderBox')}
        >{@html btnBorderBox}<br />Border Box</button
      >
    </dd>
    <dh>
      <button
        on:click={() => {
          nowAccordion = 2;
        }}>Components</button
      >
    </dh>
    <dd class:is-visible={nowAccordion === 2}>
      <button class="component" on:click={() => send('addComponents', 'Field')}>Field</button>
      <button class="component" on:click={() => send('addComponents', 'Input')}>Input</button>
      <button class="component" on:click={() => send('addComponents', 'Checkbox')}>Checkbox</button>
      <button class="component" on:click={() => send('addComponents', 'Radio')}>Radio</button>
      <button class="component" on:click={() => send('addComponents', 'Toggle')}>Toggle</button>
      <button class="component" on:click={() => send('addComponents', 'Select')}>Select</button>
      <button class="component" on:click={() => send('addComponents', 'Date')}>Date</button>
      <button class="component" on:click={() => send('addComponents', 'Textarea')}>Textarea</button>
      <button class="component" on:click={() => send('addComponents', 'Editor')}>Editor</button>
      <button class="component" on:click={() => send('addComponents', 'File')}>File</button>
      <button class="component" on:click={() => send('addComponents', 'Button')}>Button</button>
      <button class="component" on:click={() => send('addComponents', 'Button')}>Button</button>
      <button class="component" on:click={() => send('addComponents', 'Pagination')}
        >Pagination</button
      >
      <button class="component" on:click={() => send('addComponents', 'Tabs')}>Tabs</button>
      <button class="component" on:click={() => send('addComponents', 'img')}>Image</button>
      <button class="component" on:click={() => send('addComponents', 'video')}>Video</button>
      <button class="component" on:click={() => send('addComponents', 'Chart')}>Chart</button>
    </dd>
    <dh>
      <button
        on:click={() => {
          nowAccordion = 3;
        }}>Table</button
      >
    </dh>
    <dd class="table" class:is-visible={nowAccordion === 3}>
      <div>
        {#if selectTableCheck}
          <button
            on:click={() => {
              tableCols = tableCols + 1;
              setTableCols();
              tableInfo = { col: tableCols, row: tableRows, colgroup: tableColGroup };
              send('setTable', tableInfo);
            }}>Add Column</button
          >
          <button
            on:click={() => {
              tableRows = tableRows + 1;
              setTableCols();
              tableInfo = { col: tableCols, row: tableRows, colgroup: tableColGroup };
              send('setTable', tableInfo);
            }}>Add Row</button
          >
        {:else}
          Cols <input
            type="number"
            bind:value={tableCols}
            on:keyup={() => {
              setTableCols();
            }}
            on:change={() => {
              setTableCols();
            }}
          />
          X Rows <input type="number" bind:value={tableRows} />
          <button
            on:click={() => {
              if (tableCols < 2) {
                alert('Cols must be bigger than 1.');
              } else if (tableRows < 2) {
                alert('Rows must be bigger than 1.');
              } else {
                send('addTable', tableInfo);
              }
            }}>Add Table</button
          >
        {/if}
      </div>
      <ul>
        {#each tableColGroup as item, i}
          <li
            draggable={dragFlag}
            on:dragstart={(event) => dragstart(event, i)}
            on:drop|preventDefault={(event) => drop(event, i)}
            ondragover="return false"
            on:dragenter={() => (hovering = i)}
            class="list-item"
            class:is-active={hovering === i}
          >
            {#if selectTableCheck}
              <button
                on:mousedown={() => {
                  dragFlag = true;
                }}
                class="drag"
              >
                {@html btnDrag}
                <span>Column {i + 1}</span>
              </button>
            {:else}
              <span>Column {i + 1}</span>
            {/if}
            <select
              bind:value={item.selected}
              on:change={() => {
                item.value = item.selected === 'fill' ? 'fill' : '';
                if (item.value === 'fill') {
                  send('setTable', tableInfo);
                }
              }}
            >
              <option value="fill">Fill</option>
              <option value="fixed">Fixed</option>
            </select>
            {#if item.selected !== 'fill'}
              <input
                type="number"
                bind:value={item.value}
                on:blur={() => {
                  send('setTable', tableInfo);
                }}
                on:change={() => {
                  send('setTable', tableInfo);
                }}
              />
            {/if}
            {#if selectTableCheck}
              <button
                on:click={() => {
                  send('removeTableColumn', i);
                }}
                class="remove"
              >
                {@html btnRemove}
              </button>
            {/if}
          </li>
        {/each}
      </ul>
    </dd>
  </dl>

  <!-- <button on:click={() => send('getInfo')}>[Info]</button> -->
</div>

<style>
  .accordionsgroup > dl > dd.is-visible > button.grid {
    width: 135px;
  }
  .accordionsgroup > dl > dd.is-visible > button.grid:not(:last-child) {
    margin-right: 3px;
  }
  .accordionsgroup > dl > dd.is-visible > button.component {
    width: 65px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    text-align: center;
  }
  .accordionsgroup > dl > dd.table input {
    width: 55px;
    padding: 5px 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .accordionsgroup > dl > dd.table button {
    padding: 5px 8px;
    border-radius: 5px;
    background: #00d1b2;
    color: #fff;
  }
  .accordionsgroup > dl > dd.table ul {
    margin: 10px 0;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .accordionsgroup > dl > dd.table ul > li {
    position: relative;
    padding: 5px 0;
    display: block;
  }
  .accordionsgroup > dl > dd.table ul > li.is-active {
    background-color: #3273dc;
  }
  .accordionsgroup > dl > dd.table ul > li > button.drag {
    padding: 3px 8px;
    background: #fff;
    color: #333;
    border: 1px solid #ccc;
  }
  .accordionsgroup > dl > dd.table ul > li > button.drag:hover {
    cursor: grab;
  }
  .accordionsgroup > dl > dd.table ul > li > button.drag:active {
    cursor: grabbing;
  }
  .accordionsgroup > dl > dd.table ul > li > button.drag > :global(svg) {
    display: inline-block;
    vertical-align: middle;
    width: auto;
    height: 10px;
  }

  .accordionsgroup > dl > dd.table ul > li > button.remove {
    position: absolute;
    right: 0;
    padding: 4px 8px;
    background: #fff;
    border: 1px solid #ff3860;
  }
  .accordionsgroup > dl > dd.table ul > li > button.remove > :global(svg) {
    width: 14px;
    height: auto;
  }
  .accordionsgroup > dl > dd.table ul > li > span {
    display: inline-block;
    width: 100px;
  }
  .accordionsgroup > dl > dd.table ul > li > select {
    width: 60px;
    height: 26px;
    padding: 3px 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .accordionsgroup > dl > dd.table ul > li > input {
    height: 26px;
    padding: 3px 5px;
  }
</style>
