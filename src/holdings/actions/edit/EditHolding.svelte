<script>
  import {fly} from "svelte/transition";
  import {writable} from "svelte/store";
  import {wallet} from "../../../store";
  import Overlay from "../../../components/forms/Overlay.svelte";
  import EditButton from "../../../components/buttons/EditButton.svelte";
  import EditForm from "./EditForm.svelte";

  export let holding;
  let y;

  const formActive = writable(false);
  const hasError = writable(false);
  const openForm = () => {
    formActive.set(true);
    y = 0;
  };
  const submit = (event) => {
    const newAmount = event.target.amount.value;
    const modifiedWallet = $wallet;
    modifiedWallet.forEach((walletHolding) => {
      if (walletHolding.id === holding.id) {
        walletHolding.amountHeld = newAmount;
      }
    });
    wallet.set(modifiedWallet);
    reset();
  };
  const cancel = () => {
    reset();
  };
  const reset = () => {
    formActive.set(false);
    hasError.set(false);
  };

</script>

<svelte:window bind:scrollY={y}/>

<EditButton onClick={openForm} />

<Overlay trigger={formActive} title="Edit Holding">
  <div in:fly="{{x: 200, duration: 500}}" out:fly="{{x: -200, duration: 500}}">
    <EditForm onSubmit={submit} onCancel={cancel} holding={holding}/>
  </div>
</Overlay>