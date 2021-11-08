import { deleteEntry, getEntryTags, getInstructors, getJournalEntries, getTags } from "./dataAccess.js"

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

const buildEntry = (entry) => {
    const entryTags = getEntryTags()
    const instructors = getInstructors()
    const tags = getTags()

    const filteredEntryTagsArray = entryTags.filter(entryTag => entryTag.entryId === entry.id)
    const foundInstructor = instructors.find(instructor => instructor.id === entry.instructorId)

    const foundTagArray = []

    for (const filteredEntryTag of filteredEntryTagsArray) {
        const foundTag = tags.find(tag => filteredEntryTag.tagId === tag.id)
        foundTagArray.push(foundTag)
    }

    return `
        <div class="entry">
            <h2>${entry.concept}</h2>
            <h4>${entry.date}</h4>
            <p>${entry.entry}</p>
            <p>My mood today: ${entry.mood.label}</p>
            <p> ${foundInstructor ? foundInstructor.name : "Nobody"} helped me today. </p>
            <div class="tags">
                ${foundTagArray.length > 0 
                    ? foundTagArray.map(foundTag => `<div class="tag">${foundTag.subject}</div>`).join("") 
                    : ""
                }
            </div>
            <button id="delete--${entry.id}">Delete</button>
        </div>
            `
}


export const Entries = () => {
    const entries = getJournalEntries()

    return `
    ${entries.map(buildEntry).join("")}
    `
}