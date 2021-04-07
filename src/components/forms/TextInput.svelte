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
::placeholder {
  color: var(--alt-text-color);
  opacity: .6;
}
input{    
  border: 0;
  border-bottom: 4px solid var(--alt-text-color);
  color: var(--alt-text-color);
  background: none;
  outline: 0;
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
  border-bottom: 4px solid var(--alt-text-color);
  -webkit-text-fill-color: var(--alt-text-color) !important;
 -webkit-box-shadow: 0 0 0 30px var(--primary-color) inset !important;
}

@media(prefers-color-scheme: dark){
  ::placeholder {
    color: var(--primary-color);
    opacity: .6;
  }
  input{    
    border-bottom: 4px solid var(--primary-color);
    color: var(--primary-color);
  }
  /*https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/*/
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active
  {
    border-bottom: 4px solid var(--primary-color);
    -webkit-text-fill-color: var(--primary-color) !important;
  -webkit-box-shadow: 0 0 0 30px var(--secondary-body-color) inset !important;
  }
}

</style>