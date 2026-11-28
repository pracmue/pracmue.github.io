const contentArea = document.getElementById("contentArea");
const courseGrid = document.getElementById("courseGrid");

const courseCards = {
    macro2: { id: "macro2Btn" },
    statistics: { id: "statisticsBtn" },
    futures: { id: "futuresBtn" },
    finance: { id: "financeBtn" },
    econometrics: { id: "econometricsBtn" },
    accounting: { id: "accountingBtn" }
};

function activate(id) {
    document.querySelectorAll(".course-card").forEach(card => card.classList.remove("active"));
    const selected = document.getElementById(id);
    if (selected) selected.classList.add("active");
}

function isUnlocked(course) { return sessionStorage.getItem(course) === "true"; }
function unlockCourse(course) { sessionStorage.setItem(course, "true"); }

function showCourse(course, id) {
    sessionStorage.setItem("course", course);
    activate(id);
    const data = pages[course];

    if (!data) {
        contentArea.innerHTML = `<div class="content-card"><h2 class="content-title">ไม่พบรายวิชา</h2></div>`;
        return;
    }

    if (isUnlocked(course)) {
        contentArea.innerHTML = data.content;
        if (window.MathJax) MathJax.typesetPromise();
        contentArea.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }

    openPasswordPopup(course, id, data);
}

function openPasswordPopup(course, id, data) {
    closePasswordPopup();

    const popup = document.createElement("div");
    popup.className = "password-popup-overlay";
    popup.id = "passwordPopup";
    popup.innerHTML = `
        <div class="password-popup" role="dialog" aria-modal="true" aria-labelledby="passwordPopupTitle">
            <button type="button" class="password-popup-close" aria-label="ปิด">&times;</button>
            <div class="password-popup-icon">🔒</div>
            <h2 id="passwordPopupTitle">เข้าสู่รายวิชา</h2>
            <p class="password-popup-course">${data.title}</p>
            <input id="passwordInput" type="password" class="password-input" placeholder="กรุณากรอกรหัสผ่าน" autocomplete="current-password">
            <p id="errorText" class="password-popup-error" role="alert"></p>
            <button id="unlockBtn" class="btn password-popup-submit">เข้าสู่รายวิชา</button>
        </div>`;

    document.body.appendChild(popup);
    const input = popup.querySelector("#passwordInput");
    const error = popup.querySelector("#errorText");
    const closeButton = popup.querySelector(".password-popup-close");

    function submitPassword() {
        if (input.value === data.password) {
            unlockCourse(course);
            closePasswordPopup();
            showCourse(course, id);
        } else {
            error.textContent = "รหัสผ่านไม่ถูกต้อง";
            input.value = "";
            input.focus();
        }
    }

    popup.querySelector("#unlockBtn").addEventListener("click", submitPassword);
    input.addEventListener("keydown", event => {
        if (event.key === "Enter") submitPassword();
    });
    closeButton.addEventListener("click", closePasswordPopup);
    popup.addEventListener("click", event => {
        if (event.target === popup) closePasswordPopup();
    });
    document.addEventListener("keydown", handlePopupEscape);
    input.focus();
}

function handlePopupEscape(event) {
    if (event.key === "Escape") closePasswordPopup();
}

function closePasswordPopup() {
    const popup = document.getElementById("passwordPopup");
    if (popup) popup.remove();
    document.removeEventListener("keydown", handlePopupEscape);
}

Object.entries(courseCards).forEach(([course, card]) => {
    document.getElementById(card.id).addEventListener("click", () => showCourse(course, card.id));
});
