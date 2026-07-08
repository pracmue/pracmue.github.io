/* ==========================================
   APP.JS
   ========================================== */

const courseContainer = document.getElementById("courseContainer");
const modalContainer = document.getElementById("modalContainer");

/* ==========================================
   CREATE COURSE CARDS
   ========================================== */

courses.forEach(course => {

    // สร้าง id ที่ใช้กับ Bootstrap Modal
    const modalId = `modal-${course.code.replace(/\s+/g, "-")}`;

    courseContainer.insertAdjacentHTML("beforeend", `

        <div class="col-lg-4 col-md-6 course-item">

            <div class="card course-card">

                <img
                    src="${course.image}"
                    class="card-img-top"
                    alt="${course.code}">

                <div class="card-body">

                    <h5 class="card-title">
                        ${course.code}
                    </h5>

                    <p class="card-text">
                        ${course.title}
                    </p>

                    <button
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#${modalId}">

                        Open Course

                    </button>

                </div>

            </div>

        </div>

    `);

});


/* ==========================================
   CREATE COURSE MODALS
   ========================================== */

courses.forEach(course => {

    const modalId = `modal-${course.code.replace(/\s+/g, "-")}`;

    let materialHTML = "";

    course.materials.forEach(item => {

        materialHTML += `

            <div class="material-item">

                <a
                    href="${item.url}"
                    class="protected-link"
                    data-password="${course.password}"
                    target="${item.target}">

                    <i class="${item.icon}"></i>

                    ${item.title}

                </a>

            </div>

        `;

    });

    modalContainer.insertAdjacentHTML("beforeend", `

<div
class="modal fade"
id="${modalId}"
tabindex="-1">

<div class="modal-dialog">

<div class="modal-content">

<div class="modal-header">

<h5 class="modal-title">

${course.code}

<br>

<small>

${course.title}

</small>

</h5>

<button
class="btn-close"
data-bs-dismiss="modal">

</button>

</div>

<div class="modal-body">

<img
src="${course.image}"
class="img-fluid rounded mb-4">

<p>

${course.description}

</p>

${materialHTML}

</div>

</div>

</div>

</div>

`);

});


/* ==========================================
   SEARCH COURSE
   ========================================== */

document
.getElementById("searchBox")
.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    document
    .querySelectorAll(".course-item")
    .forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(keyword)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});