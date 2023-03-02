import { writable } from "svelte/store";

export const isValidInput = writable(false);
export const langUser = writable("");
export const langUserCode = writable("");