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
    moods: []
}

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
export const getJournalEntries = () => {
    const copyOfData = database.entries.map(entry => ({ ...entry }))
    return copyOfData
}

export const getMoods = () => {
    return database.moods.map(mood => ({ ...mood }))
}

export const retrieveData = () => {
    fetch("http://localhost:8088/entries?_expand=mood") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(fetchedEntries => {
            // What should happen when we finally have the array?
            database.entries = fetchedEntries
        })

    return fetch("http://localhost:8088/moods") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(fetchedMoods => {
            // What should happen when we finally have the array?
            database.moods = fetchedMoods
        })
}


export const postEntries = (newJournalEntry) => {
    // Use `fetch` with the POST method to add your entry to your API
    fetch("http://localhost:8088/entries?_expand=mood", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJournalEntry)
    })
        .then(
            (response) => {
                //  Get all journal entries
                response.json()
            }
        )
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