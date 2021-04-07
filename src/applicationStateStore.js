import {writable} from "svelte/store";

export const isAddMode = writable(false);
export const isEditMode = writable(false);
export const isExpanded = writable(false);
export const selectedHolding = writable({});

