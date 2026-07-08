/* ==========================================
   PASSWORD.JS
   ========================================== */

let selectedLink = null;
let correctPassword = "";

/* Bootstrap Modal */

const passwordModal = new bootstrap.Modal(
    document.getElementById("passwordModal")
);

const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const passwordSubmit = document.getElementById("passwordSubmit");


/* ==========================================
   OPEN PASSWORD MODAL
   ========================================== */

document.addEventListener("click", function (e) {

    const link = e.target.closest(".protected-link");

    if (!link) return;

    e.preventDefault();

    selectedLink = link;
    correctPassword = link.dataset.password;

    passwordInput.value = "";
    passwordError.classList.add("d-none");

    passwordModal.show();

    setTimeout(() => passwordInput.focus(), 200);

});


/* ==========================================
   CHECK PASSWORD
   ========================================== */

function checkPassword() {

    if (passwordInput.value !== correctPassword) {

        passwordError.classList.remove("d-none");
        passwordInput.focus();
        passwordInput.select();

        return;

    }

    passwordModal.hide();

    if (selectedLink.target === "_blank") {

        window.open(selectedLink.href, "_blank");

    } else {

        window.location.href = selectedLink.href;

    }

}


/* ==========================================
   BUTTON
   ========================================== */

passwordSubmit.addEventListener("click", checkPassword);


/* ==========================================
   PRESS ENTER
   ========================================== */

passwordInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        checkPassword();

    }

});


/* ==========================================
   CLEAR WHEN MODAL CLOSES
   ========================================== */

document
.getElementById("passwordModal")
.addEventListener("hidden.bs.modal", function () {

    passwordInput.value = "";
    passwordError.classList.add("d-none");

    selectedLink = null;
    correctPassword = "";

});