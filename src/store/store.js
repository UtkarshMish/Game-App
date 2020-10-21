import { writable } from "svelte/store";

export const name = writable(localStorage.getItem("name") || "");
export const age = writable(parseInt(localStorage.getItem("age")) || "");
export const scores = writable([]);
export const game_type = writable(localStorage.getItem("game_type") || "single-player");
export const sound_on = writable(Boolean(localStorage.getItem("sound_on")) || true);