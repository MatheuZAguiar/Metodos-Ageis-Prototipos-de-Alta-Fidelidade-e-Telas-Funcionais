document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") {
        window.location.href = "../dashboard/dashboard.html";
        console.log("Login");
    } else {
        alert("Usuário ou senha incorretos. Por favor, tente utilizar o usuario admin e senha admin.");
    }
});