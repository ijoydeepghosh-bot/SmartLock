
let rooms = [
    { id: 1, number: "101", building: "Block A", capacity: 4, occupied: 4 },
    { id: 2, number: "102", building: "Block A", capacity: 3, occupied: 2 },
    { id: 3, number: "103", building: "Block A", capacity: 4, occupied: 0 },
    { id: 4, number: "201", building: "Block B", capacity: 2, occupied: 2 },
    { id: 5, number: "202", building: "Block B", capacity: 3, occupied: 0 }
];

const roomTableBody = document.getElementById("roomTableBody");
const roomModal = document.getElementById("roomModal");
const roomForm = document.getElementById("roomForm");

let editingRoomId = null;

function getRoomStatus(room) {
    if (room.occupied === 0) return "Available";
    if (room.occupied === room.capacity) return "Full";
    return "Partially Occupied";
}

function displayRooms(list = rooms) {
    roomTableBody.replaceChildren();

    document.getElementById("roomEmptyMessage").style.display =
        list.length === 0 ? "block" : "none";

    list.forEach(room => {
        const row = document.createElement("tr");
        const status = getRoomStatus(room);

        const values = [
            room.number,
            room.building,
            room.capacity,
            room.occupied
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");

        statusBadge.className = "room-status " +
            (status === "Available" ? "available" :
             status === "Full" ? "full" : "partial");

        statusBadge.textContent = status;
        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "room-action-btn edit-room";
        editButton.addEventListener("click", () => editRoom(room.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "room-action-btn delete-room";
        deleteButton.addEventListener("click", () => deleteRoom(room.id));

        actionCell.append(editButton, deleteButton);
        row.appendChild(actionCell);

        roomTableBody.appendChild(row);
    });

    updateRoomStatistics();
}

function updateRoomStatistics() {
    const total = rooms.length;
    const occupied = rooms.filter(room =>
        room.occupied > 0
    ).length;

    const available = total - occupied;

    document.getElementById("totalRooms").textContent = total;
    document.getElementById("occupiedRooms").textContent = occupied;
    document.getElementById("availableRooms").textContent = available;
}

function openRoomModal() {
    roomModal.style.display = "flex";
}

function closeRoomModal() {
    roomModal.style.display = "none";
    roomForm.reset();
    editingRoomId = null;
    document.getElementById("roomModalTitle").textContent =
        "Add New Room";
}

document.getElementById("openRoomModal")
    .addEventListener("click", () => {
        closeRoomModal();
        openRoomModal();
    });

document.getElementById("closeRoomModal")
    .addEventListener("click", closeRoomModal);

function editRoom(id) {
    const room = rooms.find(item => item.id === id);

    if (!room) return;

    editingRoomId = id;

    document.getElementById("roomNumber").value = room.number;
    document.getElementById("buildingName").value = room.building;
    document.getElementById("roomCapacity").value = room.capacity;
    document.getElementById("occupiedCount").value = room.occupied;

    document.getElementById("roomModalTitle").textContent =
        "Edit Room";

    openRoomModal();
}

function deleteRoom(id) {
    if (!confirm("Are you sure you want to delete this room?")) {
        return;
    }

    rooms = rooms.filter(room => room.id !== id);
    displayRooms();
}

roomForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const number = document.getElementById("roomNumber").value.trim();
    const building = document.getElementById("buildingName").value.trim();
    const capacity = Number(document.getElementById("roomCapacity").value);
    const occupied = Number(document.getElementById("occupiedCount").value);

    if (!number || !building || !Number.isInteger(capacity) ||
        !Number.isInteger(occupied) || capacity < 1 ||
        occupied < 0 || occupied > capacity) {
        alert("Please enter valid room details. Occupied students cannot exceed capacity.");
        return;
    }

    const duplicate = rooms.some(room =>
        room.number.toLowerCase() === number.toLowerCase() &&
        room.building.toLowerCase() === building.toLowerCase() &&
        room.id !== editingRoomId
    );

    if (duplicate) {
        alert("This room already exists in this building.");
        return;
    }

    if (editingRoomId !== null) {
        const room = rooms.find(item => item.id === editingRoomId);

        room.number = number;
        room.building = building;
        room.capacity = capacity;
        room.occupied = occupied;
    } else {
        rooms.push({
            id: Date.now(),
            number,
            building,
            capacity,
            occupied
        });
    }

    closeRoomModal();
    displayRooms();
});

document.getElementById("searchRoom").addEventListener("input", function() {
    const query = this.value.toLowerCase();

    const filteredRooms = rooms.filter(room =>
        room.number.toLowerCase().includes(query) ||
        room.building.toLowerCase().includes(query)
    );

    displayRooms(filteredRooms);
});

displayRooms();
