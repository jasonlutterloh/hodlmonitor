<script>
  import {fly} from "svelte/transition";
  import HeaderButton from "./buttons/HeaderButton.svelte";

  export let title;
  export let onClose;

</script>


<div class="overlay" in:fly="{{y: 200}}" out:fly="{{y: 200}}">
  <div class="header">
    <div>
      <h2>{title}</h2>
    </div>
    <div>
      <HeaderButton on:click={onClose}>
        <span class="material-icons">
        close
        </span>
      </HeaderButton>
    </div>
  </div>
  <slot></slot>
</div>


<style>
.overlay {
  background: var(--primary-color);
  color: var(--alt-text-color);
  position: fixed;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  z-index: 99999999;
}
.header{
  display: flex;
  padding: 8px;
}
.header div{
  flex: 0 1 auto;
}
.header div:first-of-type{
  flex: 1 1 auto;
}
h2{
  color: var(--alt-text-color);
  display: block;
  margin: 0;
  padding: 8px;
  font-size: 16px;
  text-transform: uppercase;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 24px;
  text-align: left;
}
@media(prefers-color-scheme: dark){
  .overlay {
    background: var(--secondary-body-color);
    color: var(--text-color);
  }
  h2 {
    color: var(--text-color);
  }
}
</style>