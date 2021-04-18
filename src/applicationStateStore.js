import {writable} from "svelte/store";

export const isAddMode = writable(false);
export const isEditMode = writable(false);
export const isExpanded = writable(false);
export const selectedHolding = writable({});
export const infoMessages = createInfoMessageSystem();

function createInfoMessageSystem() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    addMessage: (newMessage) => {
      update(messages => [...messages, newMessage]);
      setTimeout(()=>update(messages => messages.filter(message => message !== newMessage)), 8000);
    },
  };
}
