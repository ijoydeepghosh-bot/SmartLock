from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def dashboard():
    return render_template("admin_login.html")

@app.route("/dashboard")
def admin_dashboard():
    return render_template("dashboard.html")


@app.route("/change-password")
def change_password():
    return render_template("change_password.html")


@app.route("/admin-history")
def admin_history():
    return render_template("admin_history.html")

@app.route("/students")
def students():
    return render_template("students.html")

@app.route("/rooms")
def rooms():
    return render_template("rooms.html")

@app.route("/allocations")
def allocations():
    return render_template("allocations.html")

@app.route("/access-logs")
def access_logs():
    return render_template("access_logs.html")

@app.route("/admin-login")
def admin_login():
    return render_template("admin_login.html")

if __name__ == "__main__":
    app.run(debug=True)