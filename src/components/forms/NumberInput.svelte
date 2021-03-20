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
  padding: 1em;
  display: block;
  box-sizing: border-box;
  height: 1.4em;
  font-size: 1.2em;
  margin: .5em auto;
}
</style>