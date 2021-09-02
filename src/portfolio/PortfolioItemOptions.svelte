<script>
  import Bar from "../components/Bar.svelte";
  import EditItem from "./actions/EditItem.svelte";
  import DeleteItem from "./actions/DeleteItem.svelte";
  import { selectedItem } from "./store";
</script>

<Bar closeCallback={() => selectedItem.set({})}>
  <EditItem />
  <DeleteItem />
</Bar>
