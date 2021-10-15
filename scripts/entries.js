/*
    Which function allows this component to get a copy
    of the data? Import it on the following line of code
    and then invoke it on the third line of code.
*/
import { getJournalEntries } from "./database.js"

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
           <p>My mood today: ${entry.mood}</p>
        `
    }

    return allEntriesAsHTML
}
