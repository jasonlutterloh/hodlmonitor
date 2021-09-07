<script>
  import Bar from "../components/Bar.svelte";
  import DeleteItem from "./actions/DeleteItem.svelte";
  import { selectedId } from "./store";
</script>
<Bar closeCallback={() => (selectedId.set(null))}>
  <DeleteItem />
</Bar>