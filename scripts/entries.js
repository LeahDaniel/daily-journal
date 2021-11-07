import { deleteEntry, getEntryTags, getJournalEntries, getTags } from "./dataAccess.js"

document.addEventListener("click", click => {
    if (click.target.id.startsWith("delete--")) {
        const [, entryId] = click.target.id.split("--")
        deleteEntry(parseInt(entryId))
    }
})

/* Iterates through each object in the entries array (from the getJournalEntries function) 
and returns an HTML string. Also filters through the entryTags to find
the appropriate ones for the current entry of the loops, then finds the tag for each tagId
to render tag names. */

export const Entries = () => {
    const entries = getJournalEntries()
    const entryTags = getEntryTags()
    const tags = getTags()

    let allEntriesAsHTML = ""

    for (const entry of entries) {
        const filteredEntryTagsArray = entryTags.filter(entryTag => entryTag.entryId === entry.id)
        
        const foundTagArray = []

        for (const filteredEntryTag of filteredEntryTagsArray){
            const foundTag = tags.find(tag => filteredEntryTag.tagId === tag.id)
            foundTagArray.push(foundTag)
        }
        
        allEntriesAsHTML += `
            <div class="entry">
                <h2>${entry.concept}</h2>
                <h4>${entry.date}</h4>
                <p>${entry.entry}</p>
                <p>My mood today: ${entry.mood.label}</p>
                <div class="tags">
                    ${foundTagArray.map(foundTag => `<div class="tag">${foundTag.subject}</div>`).join("")}
                </div>
                <button id="delete--${entry.id}">Delete</button>
            </div>
                `
    }

    return allEntriesAsHTML
}