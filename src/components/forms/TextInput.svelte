<script>
  import InputContainer from "./InputContainer.svelte";
  import Label from "./Label.svelte";
  export let name;
  export let placeholder = "";
</script>

<InputContainer>
  <Label name={name}><slot></slot></Label>
  <input required placeholder={placeholder} type="text" name={name}/>
</InputContainer>

<style>
input{
  box-sizing: border-box;
  height: 1.4em;
  font-size: 1.2em;
  margin: .5em;
}
</style>