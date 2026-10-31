const historyTable = document.getElementById("historyTable");
const searchInput = document.getElementById("searchInput");
const historyMessage = document.getElementById("historyMessage");

let activities = [];

async function loadHistory() {

    historyMessage.textContent = "";
    historyTable.innerHTML =
        '<tr><td colspan="4">Loading activity records...</td></tr>';

    try {

        const response = await fetch("/api/admin/activity-logs");

        if (!response.ok) {
            throw new Error("Unable to load activity records.");
        }

        const result = await response.json();

        activities = result.activities || [];

        displayHistory(activities);

        document.getElementById("totalActivities").textContent =
            activities.length;

        document.getElementById("latestActivity").textContent =
            activities.length
                ? activities[0].action
                : "No activity";

    } catch (error) {

        historyTable.innerHTML = "";
        historyMessage.textContent =
            "Unable to load history. Please check the server.";

    }
}

function displayHistory(records) {

    historyTable.innerHTML = "";

    if (records.length === 0) {
        historyTable.innerHTML =
            '<tr><td colspan="4">No activity records found.</td></tr>';
        return;
    }

    records.forEach(activity => {

        const row = document.createElement("tr");

        const date = document.createElement("td");
        date.textContent = activity.timestamp || "--";

        const admin = document.createElement("td");
        admin.textContent = activity.admin || "--";

        const action = document.createElement("td");
        action.textContent = activity.action || "--";

        const description = document.createElement("td");
        description.textContent = activity.description || "--";

        row.append(date, admin, action, description);
        historyTable.appendChild(row);

    });
}

searchInput.addEventListener("input", function() {

    const searchValue = this.value.toLowerCase();

    const filteredRecords = activities.filter(activity => {

        return [
            activity.admin,
            activity.action,
            activity.description,
            activity.timestamp
        ].some(value =>
            String(value || "").toLowerCase().includes(searchValue)
        );

    });

    displayHistory(filteredRecords);

});

document.getElementById("refreshButton")
    .addEventListener("click", loadHistory);

loadHistory();