
const accessLogs = [
    {
        id: 1,
        name: "Rahul Das",
        roll: "101",
        room: "101",
        date: "2026-10-30 09:15 AM",
        method: "RFID",
        result: "Granted"
    },
    {
        id: 2,
        name: "Priya Roy",
        roll: "102",
        room: "102",
        date: "2026-10-30 10:20 AM",
        method: "Fingerprint",
        result: "Granted"
    },
    {
        id: 3,
        name: "Unknown User",
        roll: "N/A",
        room: "103",
        date: "2026-10-30 11:05 AM",
        method: "RFID",
        result: "Denied"
    },
    {
        id: 4,
        name: "Sneha Dey",
        roll: "104",
        room: "101",
        date: "2026-10-30 12:30 PM",
        method: "Face Recognition",
        result: "Granted"
    },
    {
        id: 5,
        name: "Unknown User",
        roll: "N/A",
        room: "201",
        date: "2026-10-30 01:15 PM",
        method: "Fingerprint",
        result: "Denied"
    }
];

const logsTableBody = document.getElementById("logsTableBody");

function updateLogStatistics() {
    const total = accessLogs.length;

    const granted = accessLogs.filter(log =>
        log.result === "Granted"
    ).length;

    const denied = accessLogs.filter(log =>
        log.result === "Denied"
    ).length;

    document.getElementById("totalAttempts").textContent = total;
    document.getElementById("grantedAttempts").textContent = granted;
    document.getElementById("deniedAttempts").textContent = denied;
}

function displayLogs(list = accessLogs) {
    logsTableBody.replaceChildren();

    document.getElementById("logsEmptyMessage").style.display =
        list.length === 0 ? "block" : "none";

    list.forEach(log => {
        const row = document.createElement("tr");

        const values = [
            log.name,
            log.roll,
            log.room,
            log.date,
            log.method
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const resultCell = document.createElement("td");
        const badge = document.createElement("span");

        badge.className = "access-result " +
            log.result.toLowerCase();

        badge.textContent = log.result;

        resultCell.appendChild(badge);
        row.appendChild(resultCell);

        logsTableBody.appendChild(row);
    });

    updateLogStatistics();
}

function filterLogs() {
    const query = document.getElementById("searchLogs")
        .value.toLowerCase();

    const status = document.getElementById("statusFilter").value;

    const filteredLogs = accessLogs.filter(log => {
        const matchesSearch =
            log.name.toLowerCase().includes(query) ||
            log.roll.toLowerCase().includes(query) ||
            log.room.toLowerCase().includes(query) ||
            log.method.toLowerCase().includes(query);

        const matchesStatus =
            status === "All" || log.result === status;

        return matchesSearch && matchesStatus;
    });

    displayLogs(filteredLogs);
}

document.getElementById("searchLogs")
    .addEventListener("input", filterLogs);

document.getElementById("statusFilter")
    .addEventListener("change", filterLogs);

displayLogs();
