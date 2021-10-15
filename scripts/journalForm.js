export const journalForm = () => {
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
            <option value="Flustered">Flustered</option>
            <option value="Confident">Confident</option>
            <option value="Excited">Excited</option>
            <option value="Discouraged">Discouraged</option>
            <option value="Confused">Confused</option>
        </select>
    </fieldset>
    
    <button>Record Journal Entry</button>`

    return journalString

}