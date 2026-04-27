import { escape } from "@std/html/entities";
import { fragments } from "./errors.js";

export function itemsView({items, errors = { "new-item": {} } }) {
    const newItem = fragments(errors)["new-item"];
    const listItems = items.map(item => `<li>${escape(item.label)}</li>`).join("\n");

    return `
    <section aria-label="items section">
        <h2>Premier league standings predictior</h2>
        <form method="POST" class="new-item">
            <label for="new-item">Next Team:</label>
            <input id="new-item" name="new-item" required ${newItem.value}>
            ${newItem.message}
        </form>
        <ul>
        ${listItems}
        </ul>
    </section>
    `
}