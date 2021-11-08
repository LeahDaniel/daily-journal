
import { createTagandEntryTag}   from "./TagProvider.js"

const container = document.querySelector("#container")

const database = {
    entries: [],
    moods: [],
    tags: [],
    entryTags: [],
    instructors: [],
    chosenMoodId: 0
}

//State copies
export const getJournalEntries = () => {
    if (database.chosenMoodId === 0) {
        return database.entries.map(entry => ({ ...entry }))
    } else {
        return database.entries.filter(entry => entry.moodId === database.chosenMoodId)
    }

    //return only entries matching mood chosen
}
export const getMoods = () => {
    return database.moods.map(mood => ({ ...mood }))
}
export const getTags = () => {
    return database.tags.map(tag => ({ ...tag }))
}
export const getEntryTags = () => {
    return database.entryTags.map(entryTag => ({ ...entryTag }))
}
export const getInstructors = () => {
    return database.instructors.map(instructor => ({ ...instructor }))
}
export const getTransient = () => {
    return {...database.chosenMoodId}
}

//Fetch
export const retrieveEntries = () => {
    return fetch("http://localhost:8088/entries?_expand=mood") // Fetch from the API
        .then(response => response.json())
        .then(fetchedEntries => {
            database.entries = fetchedEntries
        })
    }
export const retrieveTags = () => {
    return fetch("http://localhost:8088/tags") // Fetch from the API
        .then(response => response.json())
        .then(fetchedTags => {
            database.tags = fetchedTags
        })
}
export const retrieveEntryTags = () => {
    return fetch("http://localhost:8088/entryTags") // Fetch from the API
        .then(response => response.json())
        .then(fetchedEntryTags => {
            database.entryTags = fetchedEntryTags
        })
}
export const retrieveMoods = () => {
    return fetch("http://localhost:8088/moods") // Fetch from the API
        .then(response => response.json())
        .then(fetchedMoods => {
            database.moods = fetchedMoods
        })
}
export const retrieveInstructors = () => {
    return fetch("http://localhost:8088/instructors") // Fetch from the API
        .then(response => response.json())
        .then(fetchedInstructors => {
            database.instructors = fetchedInstructors
        })
}

//set Transient state
export const setChosenMood = (moodId) => {
    database.chosenMoodId = moodId
    container.dispatchEvent(new CustomEvent("stateChanged"))
}

//POST object
export const postEntries = (newJournalEntry) => {
    // Use `fetch` with the POST method to add your entry to your API
    return fetch("http://localhost:8088/entries?_expand=mood", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJournalEntry)
    })
        .then(response => response.json())
        .then(
            //use returned posted entry to call the createTagandEntryTag function, so that the function 
            //has access to the current entry Id.
            (newEntryObject) => {
                createTagandEntryTag(newEntryObject)
                document.dispatchEvent(new CustomEvent("stateChanged"))
            }

        )
}
export const postEntryTag = (newEntryId, newTagId) => {
    // Use `fetch` with the POST method to add your entry to your API
    return fetch("http://localhost:8088/entryTags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            entryId: newEntryId,
            tagId: newTagId
        })
    })
        .then(response => response.json())
        .then(
            () => {
                //  Broadcast the state change event
                container.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
export const postTag = (newTagString) => {
    // Use `fetch` with the POST method to add your entry to your API
    return fetch("http://localhost:8088/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ subject: newTagString })
    })
        .then(response => response.json())
}

//DELETE object
export const deleteEntry = (id) => {
    console.log(`Deleting entry ${id}`)
    return fetch(`http://localhost:8088/entries/${id}`, { method: "DELETE" })
        .then(
            () => {
                container.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}