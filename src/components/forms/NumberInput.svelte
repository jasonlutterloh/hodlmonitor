<script>
  import InputContainer from "./InputContainer.svelte";
  import Label from "./Label.svelte";

  export let name;
  export let value = "";
</script>

<InputContainer>
  <Label name={name}><slot></slot></Label>
  <input required name={name} type="number" min=0 step=.000000001 placeholder="1.12345" value={value}/>
</InputContainer>


<style>
input{
  border: 0;
  border-bottom: 4px solid var(--primary-color);
  background: none;
  color: var(--main-text-color);
  outline: 0;
  padding: 1em;
  box-sizing: border-box;
  height: 1.4em;
  font-size: 1.2em;
  margin: .5em;
}
/*https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/*/
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active
{
  border: 0;
  border-bottom: 4px solid var(--primary-color);
  -webkit-text-fill-color: var(--main-text-color) !important;
 -webkit-box-shadow: 0 0 0 30px var(--body-color) inset !important;
}
</style>