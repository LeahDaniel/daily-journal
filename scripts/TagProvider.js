import { postEntryTag, postTag } from "./dataAccess.js"
import { enteredTagArray } from "./journalForm.js"

//returns an array of tag objects that match a string argument
const findTag = (subject) => {
    return fetch(`http://localhost:8088/tags?subject=${subject}`)
        .then(response => response.json())
}

//use the enteredTagArray to either match each tag string with an existing tag, or create a new tag. 
//then creates an EntryTag with the tagId and entryId.
export const createTagandEntryTag = (entry) => {
    const promiseArray = []
    enteredTagArray().forEach(tag => {
        findTag(tag)  // tag variable will have a string value
            .then(matches => {  // `matches` variable value will be array of matching objects
                let matchingTag = null


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
                container.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )

}