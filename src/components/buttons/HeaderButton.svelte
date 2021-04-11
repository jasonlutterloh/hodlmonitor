<button type="text" on:click>
  <slot></slot>
</button>

<style>
  button{
    background: transparent;
    border: 0;
    color: var(--alt-text-color);
    cursor: pointer;
    font-size: 0;
    padding: 8px;
    line-height: 1;
    margin-right: 16px;
  }
  button:last-of-type{
    margin-right: 0;
  }
  @media(prefers-color-scheme: dark){
    button{
      color: var(--text-color);
    }
  }
</style>
