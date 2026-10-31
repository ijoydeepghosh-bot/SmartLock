
// Sample student records
let students = [
    {
        id: 1,
        name: "Rahul Das",
        roll: "101",
        email: "rahul@example.com",
        status: "Active"
    },
    {
        id: 2,
        name: "Priya Roy",
        roll: "102",
        email: "priya@example.com",
        status: "Active"
    },
    {
        id: 3,
        name: "Amit Sen",
        roll: "103",
        email: "amit@example.com",
        status: "Inactive"
    },
    {
        id: 4,
        name: "Sneha Dey",
        roll: "104",
        email: "sneha@example.com",
        status: "Active"
    },
    {
        id: 5,
        name: "Arjun Das",
        roll: "105",
        email: "arjun@example.com",
        status: "Active"
    }
];


// Get HTML elements
const studentTableBody =
    document.getElementById("studentTableBody");

const studentForm =
    document.getElementById("studentForm");

const studentModal =
    document.getElementById("studentModal");

const searchStudent =
    document.getElementById("searchStudent");


// Display students in table
function displayStudents(studentList) {

    studentTableBody.replaceChildren();

    document.getElementById("emptyMessage").style.display =
        studentList.length === 0 ? "block" : "none";

    studentList.forEach(student => {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const rollCell = document.createElement("td");
        rollCell.textContent = student.roll;

        const emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        const statusCell = document.createElement("td");

        const statusBadge = document.createElement("span");
        statusBadge.className =
            `student-status ${student.status.toLowerCase()}`;

        statusBadge.textContent = student.status;

        statusCell.appendChild(statusBadge);

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.className = "action-btn edit-btn";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            editStudent(student.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "action-btn delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteStudent(student.id);
        });

        actionCell.append(editButton, deleteButton);

        row.append(
            nameCell,
            rollCell,
            emailCell,
            statusCell,
            actionCell
        );

        studentTableBody.appendChild(row);

    });

    updateStatistics();
}


// Update student statistics
function updateStatistics() {

    const active = students.filter(
        student => student.status === "Active"
    ).length;

    const inactive = students.length - active;

    document.getElementById("totalCount").textContent =
        students.length;

    document.getElementById("activeCount").textContent =
        active;

    document.getElementById("inactiveCount").textContent =
        inactive;
}


// Open modal
document.getElementById("openModal").addEventListener("click", () => {
    studentForm.reset();
    studentModal.style.display = "flex";
});


// Close modal
document.getElementById("closeModal").addEventListener("click", () => {
    studentModal.style.display = "none";
});


// Register new student
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("studentRoll").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const status = document.getElementById("studentStatus").value;

    if (!name || !roll || !email) {
        alert("Please fill in all fields.");
        return;
    }

    const duplicate = students.some(
        student => student.roll.toLowerCase() === roll.toLowerCase()
    );

    if (duplicate) {
        alert("This roll number already exists.");
        return;
    }

    const newStudent = {
        id: Date.now(),
        name,
        roll,
        email,
        status
    };

    students.push(newStudent);

    studentForm.reset();
    studentModal.style.display = "none";

    renderCurrentStudents();

});


// Search students
searchStudent.addEventListener("input", function() {

    renderCurrentStudents();

});


// Edit student
function editStudent(id) {

    const student = students.find(item => item.id === id);

    if (!student) return;

    const newName = prompt("Enter student name:", student.name);

    if (newName === null) return;

    const newRoll = prompt("Enter roll number:", student.roll);

    if (newRoll === null) return;

    const newEmail = prompt("Enter email:", student.email);

    if (newEmail === null) return;

    const newStatus = prompt(
        "Enter status: Active or Inactive",
        student.status
    );

    if (newStatus === null) return;

    if (!newName.trim() || !newRoll.trim() || !newEmail.trim()) {
        alert("Student details cannot be empty.");
        return;
    }

    const validStatus = ["Active", "Inactive"];

    if (!validStatus.includes(newStatus.trim())) {
        alert("Status must be Active or Inactive.");
        return;
    }

    const duplicate = students.some(
        item => item.id !== id &&
        item.roll.toLowerCase() === newRoll.trim().toLowerCase()
    );

    if (duplicate) {
        alert("This roll number already exists.");
        return;
    }

    student.name = newName.trim();
    student.roll = newRoll.trim();
    student.email = newEmail.trim();
    student.status = newStatus.trim();

    renderCurrentStudents();

}


// Delete student
function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    students = students.filter(
        student => student.id !== id
    );

    renderCurrentStudents();

}


// Render current search results
function renderCurrentStudents() {

    const query = searchStudent.value.toLowerCase().trim();

    const filteredStudents = students.filter(student => {

        return (
            student.name.toLowerCase().includes(query) ||
            student.roll.toLowerCase().includes(query)
        );

    });

    displayStudents(filteredStudents);

}


// Initial display
renderCurrentStudents();
