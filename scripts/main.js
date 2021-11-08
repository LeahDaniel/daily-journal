import { DailyJournal } from "./DailyJournal.js"
import { retrieveEntries, retrieveEntryTags, retrieveInstructors, retrieveMoods, retrieveTags } from "./dataAccess.js"

const container = document.querySelector("#container")


/* Moves final HTML string into the container id (the main) */
//!Why did this only work with the tags and entry tags inside of retrieve moods and retrieve entries?
const render = () => {
    retrieveMoods()
    .then(() => retrieveInstructors())
    .then(() => retrieveEntries())
    .then(() => retrieveTags())
    .then(() => retrieveEntryTags())
    .then(() => container.innerHTML = DailyJournal())
}

render()

container.addEventListener("stateChanged", event => {
    console.log("State of data has changed. Regenerating HTML...")
    render()
})
