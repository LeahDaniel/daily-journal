import { postEntries, getMoods, getInstructors } from "./dataAccess.js"

//when "Record Journal Entry" is clicked, capture value of all entered form fields (except for checkboxes)
// and post a new journal entry object
document.addEventListener("click", click => {
    if (click.target.id === "recordButton") {
        click.preventDefault()
        const date = document.querySelector("input[name='entryDate']").value
        const formattedDate = new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC' })
        const concept = document.querySelector("input[name='conceptsCovered']").value
        const entry = document.querySelector("textarea[name='journalEntry']").value
        const mood = document.querySelector("select[name='moodSelector']").value
        const instructor = document.querySelector("select[name='instructorSelector']").value

        const newJournalEntry = {
            date: formattedDate,
            concept: concept,
            entry: entry,
            moodId: parseInt(mood),
            instructorId: parseInt(instructor)
        }

        postEntries(newJournalEntry)
    }
})

//create array of entered tag strings for use in other modules
export const enteredTagArray = () => {
    const tagString = document.querySelector("input[name='tags']")
    if (tagString && tagString !== "") {
        return tagString.value.split(",")
    }
}

//HTML for form
export const journalForm = () => {
    const allMoods = getMoods()
    const allInstructors = getInstructors()
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
        <label for="tags">Tags</label>
        <input name="tags" class="entryForm__field_text" >
    </fieldset>


    <fieldset class="entryForm__field">
    <label for="instructorSelector">Helped by:</label>
    <select name="instructorSelector" class="entryForm__field_select">
        <option value="0">Choose an Instructor</option>
    ${allInstructors.map(
        (instructor) => {
            return `<option value="${instructor.id}">${instructor.name} </option>`
        }
        ).join("")
    }        
    </select>
    </fieldset>

    <fieldset class="entryForm__field">
        <label for="moodSelector">Mood for the Day</label>
        <select name="moodSelector" class="entryForm__field_select">
            <option value="0">Choose a Mood</option>
        ${allMoods.map(
            (mood) => {
                return `<option value="${mood.id}">${mood.label}</option>`
            }
        ).join("")
        }        
        </select>
    </fieldset>
    
    <button id="recordButton">Record Journal Entry</button>`

    return journalString

}    
