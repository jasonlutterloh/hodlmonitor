<script>
  import EditHolding from "./edit/EditHolding.svelte";
  import DeleteButton from "../../components/buttons/DeleteButton.svelte";
  import {wallet} from "../../store";

  export let holding;
  export const removeCurrency = (currencyId) => {
    wallet.set($wallet.filter((holding) => holding.id !== currencyId));
};
</script>

<div>
  <h3>Actions</h3>
  <EditHolding holding={holding} />
  <DeleteButton onClick={() => removeCurrency(holding.id)} />
</div>

<style>
  div{
    flex: 1 0 100%;
	}
  h3{
    display: block;
    margin: 1em 1em 0 1em;
    color: var(--secondary-text-color);
    display: block;
    text-transform: uppercase;
    font-size: .6em;
font-weight: normal;
	}
  </style>