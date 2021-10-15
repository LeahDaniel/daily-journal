import { DailyJournal } from "./DailyJournal.js"
const Journalhtml = DailyJournal()
const container = document.querySelector("#container")


/* Moves final HTML string into the container id (the main) */
const render = () => {
    container.innerHTML = Journalhtml
}

render()


