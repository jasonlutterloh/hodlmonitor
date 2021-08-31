<script>
  import HeroSection from "../components/HeroSection.svelte";
	import AddItem from "./actions/AddItem.svelte";
	import EditItem from "./actions/EditItem.svelte";
	import PortfolioList from "./PortfolioList.svelte";
  import PortfolioItemOptions from "./PortfolioItemOptions.svelte";
	import {fly} from "svelte/transition";

	import {totalValue} from "../portfolio/store.js";
  import {getDollarDisplayValue} from "../utils.js";
</script>

<div in:fly="{{x:-2000, delay: 500}}" out:fly="{{x:-2000, duration: 500}}">
	<HeroSection title="Total Value" value={getDollarDisplayValue($totalValue)} />
	<PortfolioList />
	<AddItem />
	<EditItem />
	<PortfolioItemOptions />
</div>