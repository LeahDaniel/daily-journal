import { Entries } from "./Entries.js"
import { journalForm } from "./journalForm.js";
import { MoodFilter } from "./MoodFilter.js";

/* HTML for main container, interpolated with journalForm, moodfilter, and etnries functions*/

export const DailyJournal = () => {
    return `
        <form class="entryForm">
        ${journalForm()}
        </form>
        <article id="entries">
            <section class="filters">
                ${MoodFilter()}
            </section>
            <section class="entryList">
                ${Entries()}
            </section>
        </article>
    `
}
