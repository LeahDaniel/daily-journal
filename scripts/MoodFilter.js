import { getMoods, getTransient, setChosenMood } from "./dataAccess.js"


const container = document.querySelector("#container")

container.addEventListener("change", event => {
    if (event.target.name === "moodFilter") {
        const moodId = event.target.value
        setChosenMood(parseInt(moodId))
    }
}
)

export const MoodFilter = () => {
    const moods = getMoods()
    const transient = getTransient()

    return `<fieldset>
    <legend>Filter Journal Entries by Mood</legend>
    <div>
        ${moods.map(mood => {
        if (mood.id === transient.chosenMood) {
            return `<input type="radio" name="moodFilter" value="${mood.id}" checked/>
            <label for="moodFilter--${mood.label}">${mood.label}</label>
            `
        } else {
            return `<input type="radio" name="moodFilter" value="${mood.id}"/>
            <label for="moodFilter--${mood.label}">${mood.label}</label>`
        }
    }).join("")}
    </div>
    </fieldset>
`
}