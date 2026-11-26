/* ==========================================
   COURSE PASSWORD
========================================== */

let selectedCourseModalId = null;

const passwordModalElement = document.getElementById("passwordModal");
const passwordModal = new bootstrap.Modal(passwordModalElement);

const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const passwordSubmit = document.getElementById("passwordSubmit");

/* Open password modal when a course is selected */
document.addEventListener("click", function (event) {
    const courseButton = event.target.closest(".course-card.course-select");

    if (!courseButton) return;

    selectedCourseModalId = courseButton.dataset.courseModal;
    passwordModalElement.dataset.correctPassword = courseButton.dataset.password;

    passwordInput.value = "";
    passwordError.classList.add("d-none");
    passwordModal.show();

    passwordModalElement.addEventListener(
        "shown.bs.modal",
        () => passwordInput.focus(),
        { once: true }
    );
});

/* Check password */
function checkPassword() {
    const correctPassword = passwordModalElement.dataset.correctPassword;

    if (passwordInput.value !== correctPassword) {
        passwordError.classList.remove("d-none");
        passwordInput.focus();
        passwordInput.select();
        return;
    }

    passwordError.classList.add("d-none");
    passwordModal.hide();
}

/* Open the selected course after the password modal has closed */
passwordModalElement.addEventListener("hidden.bs.modal", function () {
    passwordInput.value = "";
    passwordError.classList.add("d-none");
    delete passwordModalElement.dataset.correctPassword;

    if (selectedCourseModalId) {
        const courseModalElement = document.getElementById(selectedCourseModalId);
        selectedCourseModalId = null;

        if (courseModalElement) {
            bootstrap.Modal.getOrCreateInstance(courseModalElement).show();
        }
    }
});

passwordSubmit.addEventListener("click", checkPassword);

passwordInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});


/* Allow keyboard selection of course cards */
document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    const courseCard = event.target.closest(".course-card.course-select");
    if (!courseCard) return;
    event.preventDefault();
    courseCard.click();
});
