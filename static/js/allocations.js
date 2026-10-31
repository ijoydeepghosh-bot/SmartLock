
let allocations = [
    {
        id: 1,
        name: "Rahul Das",
        roll: "101",
        room: "101",
        building: "Block A",
        date: "2026-10-01",
        status: "Active"
    },
    {
        id: 2,
        name: "Priya Roy",
        roll: "102",
        room: "102",
        building: "Block A",
        date: "2026-10-02",
        status: "Active"
    },
    {
        id: 3,
        name: "Amit Sen",
        roll: "103",
        room: "201",
        building: "Block B",
        date: "2026-10-03",
        status: "Inactive"
    },
    {
        id: 4,
        name: "Sneha Dey",
        roll: "104",
        room: "101",
        building: "Block A",
        date: "2026-10-04",
        status: "Active"
    }
];

const allocationTableBody =
    document.getElementById("allocationTableBody");

const allocationModal =
    document.getElementById("allocationModal");

const allocationForm =
    document.getElementById("allocationForm");

function displayAllocations(list = allocations) {
    allocationTableBody.replaceChildren();

    document.getElementById("allocationEmptyMessage").style.display =
        list.length === 0 ? "block" : "none";

    list.forEach(item => {
        const row = document.createElement("tr");

        const values = [
            item.name,
            item.roll,
            item.room,
            item.building,
            item.date
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const statusCell = document.createElement("td");
        const badge = document.createElement("span");

        badge.className = "allocation-status " +
            item.status.toLowerCase();

        badge.textContent = item.status;
        statusCell.appendChild(badge);
        row.appendChild(statusCell);

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className =
            "allocation-action-btn delete-allocation";

        deleteButton.addEventListener("click", () => {
            deleteAllocation(item.id);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        allocationTableBody.appendChild(row);
    });

    updateAllocationStatistics();
}

function updateAllocationStatistics() {
    const active = allocations.filter(item =>
        item.status === "Active"
    ).length;

    document.getElementById("totalAllocations").textContent =
        allocations.length;

    document.getElementById("activeAllocations").textContent =
        active;

    // Demonstration value; actual room availability
    // will come from the backend/database.
    document.getElementById("availableAllocationRooms").textContent =
        "2";
}

function openAllocationModal() {
    allocationModal.style.display = "flex";
}

function closeAllocationModal() {
    allocationModal.style.display = "none";
    allocationForm.reset();
}

document.getElementById("openAllocationModal")
    .addEventListener("click", openAllocationModal);

document.getElementById("closeAllocationModal")
    .addEventListener("click", closeAllocationModal);

function deleteAllocation(id) {
    if (!confirm("Delete this allocation?")) return;

    allocations = allocations.filter(item => item.id !== id);
    displayAllocations();
}

allocationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("allocationStudent").value.trim();
    const roll = document.getElementById("allocationRoll").value.trim();
    const room = document.getElementById("allocationRoom").value.trim();
    const building = document.getElementById("allocationBuilding").value.trim();
    const date = document.getElementById("allocationDate").value;

    if (!name || !roll || !room || !building || !date) {
        alert("Please fill in all fields.");
        return;
    }

    const duplicate = allocations.some(item =>
        item.roll.toLowerCase() === roll.toLowerCase() &&
        item.status === "Active"
    );

    if (duplicate) {
        alert("This student already has an active allocation.");
        return;
    }

    allocations.push({
        id: Date.now(),
        name,
        roll,
        room,
        building,
        date,
        status: "Active"
    });

    closeAllocationModal();
    displayAllocations();
});

document.getElementById("searchAllocation")
    .addEventListener("input", function() {
        const query = this.value.toLowerCase();

        const filtered = allocations.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.roll.toLowerCase().includes(query) ||
            item.room.toLowerCase().includes(query) ||
            item.building.toLowerCase().includes(query)
        );

        displayAllocations(filtered);
    });

displayAllocations();
