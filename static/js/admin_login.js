const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const errorMessage = document.getElementById("errorMessage");
    const loginButton = document.getElementById("loginButton");

    errorMessage.textContent = "";
    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";

    try {

        const response = await fetch("/api/admin/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {

            // Server must establish an authenticated session.
            window.location.href = "/dashboard";

        } else {

            errorMessage.textContent =
                result.message || "Invalid username or password.";

        }

    } catch (error) {

        errorMessage.textContent =
            "Unable to connect to the server. Please try again.";

    }

    loginButton.disabled = false;
    loginButton.textContent = "Login";

});