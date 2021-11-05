import { deleteEntry, getJournalEntries } from "./dataAccess.js"
import { enteredTagArray } from "./journalForm.js"

document.addEventListener("click", click => {
    if (click.target.id.startsWith("delete--")) {
        const [, entryId] = click.target.id.split("--")
        deleteEntry(parseInt(entryId))
    }
})

/* Iterates through each object in the entries array (from the getJournalEntries function) 
and adds a string literal to a returned string.*/

export const Entries = () => {
    const entries = getJournalEntries()

    let allEntriesAsHTML = ""

    for (const entry of entries) {
        allEntriesAsHTML += `
                <h2>${entry.concept}</h2>
                <h4>${entry.date}</h4>
                <p>${entry.entry}</p>
                <p>My mood today: ${entry.mood.label}</p>
                <button id="delete--${entry.id}">Delete</button>
                `
    }

    return allEntriesAsHTML
}