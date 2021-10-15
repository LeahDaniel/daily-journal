import { Entries } from "./Entries.js"
import { journalForm } from "./journalForm.js";
const entryString = Entries()
const formString = journalForm()
/* Takes the HTML string given by the Entries function and adds opening and closing tags to it.*/

export const DailyJournal = () => {
    return `
        <form class="entryForm">
        ${formString}
        </form>
        <article id="entries">
            <section class="entryList">
                ${entryString}
            </section>
        </article>
    `
}
