const passwordForm = document.getElementById("passwordForm");

passwordForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const oldPassword =
        document.getElementById("oldPassword").value;

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message = document.getElementById("message");
    const button = document.getElementById("changeButton");

    message.textContent = "";
    message.style.color = "red";

    if (newPassword !== confirmPassword) {
        message.textContent = "New passwords do not match.";
        return;
    }

    if (newPassword.length < 8) {
        message.textContent = "Password must contain at least 8 characters.";
        return;
    }

    if (oldPassword === newPassword) {
        message.textContent = "Choose a different new password.";
        return;
    }

    button.disabled = true;
    button.textContent = "Updating...";

    try {

        const response = await fetch("/api/admin/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            message.style.color = "green";
            message.textContent = "Password updated successfully.";

            passwordForm.reset();
        } else {
            message.textContent =
                result.message || "Unable to update password.";
        }

    } catch (error) {
        message.textContent = "Unable to connect with server.";
    }

    button.disabled = false;
    button.textContent = "Update Password";

});