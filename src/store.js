import { writable } from "svelte/store";

export const activePane = writable({});
export const snackbar = createSnackbarSystem();

function createSnackbarSystem() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    addMessage: (newMessage, timeout = 5000) => {
      update((messages) => [...messages, newMessage]);
      setTimeout(() =>
        update((messages) =>
          // eslint-disable-next-line comma-dangle
          messages.filter((message) => message !== newMessage)
        // eslint-disable-next-line comma-dangle
        ), timeout
      );
    },
  };
}

export const cryptoList = writable(JSON.parse(localStorage.getItem("list")) || []);

cryptoList.subscribe((value) => {
  localStorage.setItem("list", JSON.stringify(value));
});
