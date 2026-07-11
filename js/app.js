/* ==========================================
   APP.JS
========================================== */

const courseContainer = document.getElementById("courseContainer");
const modalContainer = document.getElementById("modalContainer");


/* ==========================================
   CREATE COURSE CARDS
========================================== */

courses.forEach(course => {

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
    let extraCardHTML = "";


    /* ======================================
       TABLE
    ====================================== */

    if (course.weeks && course.weeks.length > 0) {

        materialHTML = `

        <div class="table-responsive">

            <table class="table table-bordered table-hover align-middle text-center">

                <thead class="table-light">

                    <tr>
                        <th width="35%">Lecture</th>
                        <th width="35%">Videos</th>
                        <th width="30%">Exercise</th>
                    </tr>

                </thead>

                <tbody>

        `;

        course.weeks.forEach(w => {

            materialHTML += `

                <tr>

                    <td>

                        ${w.lecture ? `

                        <a
                            href="${w.lecture.url}"
                            class="protected-link"
                            data-password="${course.password}"
                            target="_blank">

                            <i class="fa-solid fa-file-pdf text-danger"></i>

                            ${w.lecture.title}

                        </a>

                        ` : "-"}

                    </td>

                    <td>

                        ${w.video ? `

                        <a
                            href="${w.video.url}"
                            class="protected-link"
                            data-password="${course.password}"
                            target="_blank">

                            <i class="fa-solid fa-video text-primary"></i>

                            ${w.video.title}

                        </a>

                        ` : "-"}

                    </td>

                    <td>

                        ${w.exercise ? `

                        <a
                            href="${w.exercise.url}"
                            class="protected-link"
                            data-password="${course.password}"
                            target="_blank">

                            <i class="fa-solid fa-pen-to-square text-success"></i>

                            ${w.exercise.title}

                        </a>

                        ` : "-"}

                    </td>

                </tr>

            `;

        });

        materialHTML += `

                </tbody>

            </table>

        </div>

        `;

    }


    /* ======================================
       EXTRA CARD
    ====================================== */

    if (course.extraCard) {

        extraCardHTML = `

        <div class="card mt-4 shadow-sm border-primary">

            <div class="card-body">

                <h5 class="card-title">

                    <i class="${course.extraCard.icon}"></i>

                    ${course.extraCard.title}

                </h5>

                <p class="card-text">

                    ${course.extraCard.text}

                </p>

                <a
                    href="${course.extraCard.url}"
                    class="btn btn-primary protected-link"
                    data-password="${course.password}"
                    target="_blank">

                    ${course.extraCard.button}

                </a>

            </div>

        </div>

        `;

    }


    /* ======================================
       MODAL
    ====================================== */

    modalContainer.insertAdjacentHTML("beforeend", `

<div
class="modal fade"
id="${modalId}"
tabindex="-1">

<div class="modal-dialog modal-lg modal-dialog-scrollable">

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

${extraCardHTML}

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

            card.style.display = text.includes(keyword) ? "" : "none";

        });

});