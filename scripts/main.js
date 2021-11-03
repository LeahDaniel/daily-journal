import { DailyJournal } from "./DailyJournal.js"
import { retrieveData } from "./database.js"

const container = document.querySelector("#container")


/* Moves final HTML string into the container id (the main) */
const render = () => {
    retrieveData().then(
        () => {
            container.innerHTML = DailyJournal()
        }
    )
}

render()

container.addEventListener("stateChanged", event => {
    console.log("State of data has changed. Regenerating HTML...")
    render()
})
