const contentArea = document.getElementById("contentArea");

/* ===========================
   เปลี่ยนเมนูที่ Active
=========================== */

function activate(id){

    document
        .querySelectorAll(".subject")
        .forEach(item=>item.classList.remove("active"));

    document
        .getElementById(id)
        .classList.add("active");

}

/* ===========================
   ตรวจสอบการปลดล็อก
=========================== */

function isUnlocked(course){

    return sessionStorage.getItem(course)==="true";

}

/* ===========================
   บันทึกการปลดล็อก
=========================== */

function unlockCourse(course){

    sessionStorage.setItem(course,"true");

}

/* ===========================
   แสดงรายวิชา
=========================== */

function showCourse(course,id){

         sessionStorage.setItem("course", course);

    activate(id);

    const data = pages[course];

    if(!data){

        contentArea.innerHTML=`

        <div class="content-card">

            <h2 class="content-title">
                ไม่พบรายวิชา
            </h2>

        </div>

        `;

        return;

    }

    if(isUnlocked(course)){

        contentArea.innerHTML=data.content;

        if(window.MathJax){
            MathJax.typesetPromise();
        }

        return;

    }

    contentArea.innerHTML=`

    <div class="content-card">

        <h2 class="content-title">

            ${data.title}

        </h2>

        <div class="sub-card">

            <h3 class="content-subtitle ">

                🔒  รหัสผ่านเข้าสู่รายวิชา

            </h3>


            <input

                id="passwordInput"

                type="password"

                class="password-input"

                placeholder="Password"

            >

            <br><br>

            <button

                id="unlockBtn"

                class="btn"

            >

                เข้าสู่รายวิชา

            </button>

            <p

                id="errorText"

                style="color:red;margin-top:15px;"

            ></p>

        </div>

    </div>

    `;

    document
        .getElementById("unlockBtn")
        .addEventListener("click",()=>{

            const password=
                document
                .getElementById("passwordInput")
                .value;

            if(password===data.password){

                unlockCourse(course);

                showCourse(course,id);

            }

            else{

                document
                    .getElementById("errorText")
                    .textContent="รหัสผ่านไม่ถูกต้อง";

            }

        });

}

/* ===========================
   Event
=========================== */
document
.getElementById("macro2Btn")
.addEventListener("click",()=>showCourse("macro2","macro2Btn"));

document
.getElementById("statisticsBtn")
.addEventListener("click",()=>showCourse("statistics","statisticsBtn"));

document
.getElementById("futuresBtn")
.addEventListener("click",()=>showCourse("futures","futuresBtn"));

document
.getElementById("financeBtn")
.addEventListener("click",()=>showCourse("finance","financeBtn"));

document
.getElementById("econometricsBtn")
.addEventListener("click",()=>showCourse("econometrics","econometricsBtn"));

document
.getElementById("accountingBtn")
.addEventListener("click",()=>showCourse("accounting","accountingBtn"));

/* ===========================
   หน้าแรก
=========================== */

showCourse(
    sessionStorage.getItem("course") || "statistics",
    (sessionStorage.getItem("course") || "statistics") + "Btn"
);


