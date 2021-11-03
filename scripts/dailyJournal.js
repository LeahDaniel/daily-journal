import { Entries } from "./Entries.js"
import { journalForm } from "./journalForm.js";

/* Takes the HTML string given by the Entries function and adds opening and closing tags to it.*/

export const DailyJournal = () => {
    return `
        <form class="entryForm">
        ${journalForm()}
        </form>
        <article id="entries">
            <section class="entryList">
                ${Entries()}
            </section>
        </article>
    `
}
