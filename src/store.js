import { writable } from "svelte/store";

export const activePane = writable({});
export const infoMessages = createInfoMessageSystem();

function createInfoMessageSystem() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    addMessage: (newMessage) => {
      update((messages) => [...messages, newMessage]);
      setTimeout(() =>
        update((messages) =>
          // eslint-disable-next-line comma-dangle
          messages.filter((message) => message !== newMessage)
        // eslint-disable-next-line comma-dangle
        ), 8000
      );
    },
  };
}

export const cryptoList = writable(JSON.parse(localStorage.getItem("list")) || []);

cryptoList.subscribe((value) => {
  localStorage.setItem("list", JSON.stringify(value));
});
