const form = document.getElementById("registerForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Inputs
    let fullname = document.getElementById("fullname").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Errors
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let phoneError = document.getElementById("phoneError");
    let passwordError = document.getElementById("passwordError");
    let confirmPasswordError = document.getElementById("confirmPasswordError");

    // Clear errors
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    phoneError.innerHTML = "";
    passwordError.innerHTML = "";
    confirmPasswordError.innerHTML = "";

    let isValid = true;

    // Name Validation
    if (fullname === "") {
        nameError.innerHTML = "Full name is required";
        isValid = false;
    }

    // Email Validation
    if (email === "") {
        emailError.innerHTML = "Email is required";
        isValid = false;
    }

    // Phone Validation
    if (phone.length !== 10) {
        phoneError.innerHTML = "Phone number must be 10 digits";
        isValid = false;
    }

    // Password Validation
    if (password.length < 6) {
        passwordError.innerHTML = "Password must be at least 6 characters";
        isValid = false;
    }

    // Confirm Password
    if (password !== confirmPassword) {
        confirmPasswordError.innerHTML = "Passwords do not match";
        isValid = false;
    }

    // Success
    if (isValid) {
        alert("Registration Successful!");
        form.reset();
    }

});