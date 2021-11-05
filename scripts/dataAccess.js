import { enteredTagArray } from "./journalForm.js"
import { findTag } from "./TagProvider.js"

/*
 *   Data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */
const container = document.querySelector("#container")

const database = {
    entries: [],
    moods: [],
    tags: [],
    entryTags: [],
    transient: {}
}

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
export const getJournalEntries = () => {
    if (!database.transient.chosenMood) {
        return database.entries.map(entry => ({ ...entry }))
    } else {
        return database.entries.filter(entry => entry.moodId === database.transient.chosenMood)
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
export const getTransient = () => {
    return { ...database.transient }
}

export const retrieveData = () => {
    fetch("http://localhost:8088/entries?_expand=mood") // Fetch from the API
        .then(response => response.json())
        .then(fetchedEntries => {
            database.entries = fetchedEntries
        })
    fetch("http://localhost:8088/tags") // Fetch from the API
        .then(response => response.json())
        .then(fetchedTags => {
            database.tags = fetchedTags
        })
    fetch("http://localhost:8088/entryTags") // Fetch from the API
        .then(response => response.json())
        .then(fetchedEntryTags => {
            database.entryTags = fetchedEntryTags
        })

    return fetch("http://localhost:8088/moods") // Fetch from the API
        .then(response => response.json())
        .then(fetchedMoods => {
            database.moods = fetchedMoods
        })
}

export const setChosenMood = (moodId) => {
    database.transient.chosenMood = moodId
    container.dispatchEvent(new CustomEvent("stateChanged"))
}

const createTagandEntryTag = (entry) => {
    const promiseArray = []
    enteredTagArray().forEach(tag => {
        findTag(tag)  // tag variable will have a string value
            .then(matches => {  // `matches` variable value will be array of matching objects
                let matchingTag = null
                debugger

                if (matches.length > 0) {
                    matchingTag = matches[0].id
                }

                if (matchingTag === null) {
                    // Tag doesn't exist. Create it then assign it to entry.
                    promiseArray.push(
                        postTag(tag)
                            .then(new_tag => {
                                postEntryTag(entry.id, new_tag.id)
                            })
                    )
                }
                else {
                    // Tag does exist. Assign it to entry.
                    promiseArray.push(
                        postEntryTag(entry.id, matchingTag)
                    )
                }
            })
    })
    // This is where all the fetches (Promises) all run and resolve
    Promise.all(promiseArray)
        .then(
            () => {
                console.log("All fetches complete")
            }
        )

}

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
        .then(
            () => {
                //  Broadcast the state change event
                container.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const deleteEntry = (id) => {
    console.log(`Deleting entry ${id}`)
    return fetch(`http://localhost:8088/entries/${id}`, { method: "DELETE" })
        .then(
            () => {
                container.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}