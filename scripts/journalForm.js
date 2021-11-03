import { postEntries, getMoods } from "./database.js"


document.addEventListener("click", click => {
    if (click.target.id === "recordButton"){
        const date = document.querySelector("input[name='entryDate']").value
        const formattedDate= new Date(date).toLocaleDateString('en-US', {timeZone: 'UTC'})
        const concept = document.querySelector("input[name='conceptsCovered']").value
        const entry = document.querySelector("textarea[name='journalEntry']").value
        const mood = document.querySelector("select[name='moodSelector']").value

        const newJournalEntry = {
            date: formattedDate,
            concept: concept,
            entry: entry,
            moodId: parseInt(mood)
        }

        postEntries(newJournalEntry)
    }
})

export const journalForm = () => {
    const allMoods = getMoods()
    let journalString = `

    <fieldset class="entryForm__field">
        <label for="entryDate">Date of Entry</label>
        <input type="date" name="entryDate" class="entryForm__field_date">
    </fieldset>

    <fieldset class="entryForm__field">
        <label for="conceptsCovered">Concepts Covered</label>
        <input type="text" name="conceptsCovered" class="entryForm__field_text">
    </fieldset>

    <fieldset class="entryForm__field">
        <label for="journalEntry">Journal Entry</label>
        <textarea name="journalEntry" class="entryForm__field_textArea" cols="30" rows="4"></textarea>
    </fieldset>

    <fieldset class="entryForm__field">
        <label for="moodSelector">Mood for the Day</label>
        <select name="moodSelector" class="entryForm__field_select">
        ${
            allMoods.map(
                (mood) => {
                    return `<option value="${ mood.id }">${ mood.label }</option>`
                }
            ).join("")
        }        
        </select>
    </fieldset>
    
    <button id="recordButton">Record Journal Entry</button>`

    return journalString

}