<script>
  import styles from './styles.scss';
  /*

import SvgName from './image.svg';

//use in your markup
{@html SvgName}


	function createShapes() {
		parent.postMessage({ pluginMessage: { 
			'type': 'create-shapes', 
			'count': count,
			'shape': selectedShape.value
		} }, '*');
	}

	function cancel() {
		parent.postMessage({ pluginMessage: { 'type': 'cancel' } }, '*')
	}
*/
  let code = `//code
<script lang="ts">
	let aaa = 123;
<\u002Fscript>
<div class="bg">
  <div class="wrap">
    <h1>System</h1>
    <Field label="User ID">
      <Input
        placeholder="Id"
        iconLeft="fas fa-id-card"
        match={idRegex}
        bind:value={userId}
        invalid="Alphabet, number, 4~20 characters"
        class="is-fullwidth"
      />
    </Field>
    <Field label="User Password">
      <Input
        type="password"
        placeholder="Password"
        iconLeft="fas fa-lock"
        match={passwordRegex}
        invalid="Please enter characters between 8 and 30 digits."
        class="is-fullwidth"
        bind:value={userPassword}
        bind:matchResult={passwordCheckResult}
      />
    </Field>
    <Button class="is-primary is-fullwidth">Sign In</Button>
  </div>
</div>
`;
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
