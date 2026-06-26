const modalHTML = `
<!-- Portfolio Modals-->
<div class="portfolio-modal modal fade"
     id="portfolioModal1"
     tabindex="-1"
     aria-labelledby="portfolioModal1"
     aria-hidden="true">

    <div class="modal-dialog modal-xl">
        <div class="modal-content">

            <!-- Close Button -->
            <div class="modal-header border-0">
                <button class="btn-close"
                        type="button"
                        data-bs-dismiss="modal"
                        aria-label="Close">
                </button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body pb-5">
                <div class="container">

                    <h3 class="text-secondary text-uppercase text-center mb-3">
                        IN542000
                    </h3>

                    <div class="divider-custom">
                        <div class="divider-custom-line"></div>
                        <div class="divider-custom-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="divider-custom-line"></div>
                    </div>

                    <div class="row align-items-center mt-4">

                        <div class="col-lg-6 text-center">
                            <img class="img-fluid rounded shadow"
                                 src="assets/img/portfolio/cabin.png"
                                 alt="IN542000"
                                 style="max-width:300px;">
                        </div>

                        <div class="col-lg-6">

                            <p class="mb-4 fs-5">
                                สามารถโหลดเนื้อหาการสอนและข้อมูลจากปุ่มด้านล่าง
                            </p>

                            <div class="list-group">

                                <a href="assets/file/lecture1.pdf"
                                   download
                                   class="list-group-item list-group-item-action">
                                    <i class="fas fa-file-pdf me-2"></i>
                                    Lecture 1
                                </a>

                                <a href="assets/file/lecture2.pdf"
                                   download
                                   class="list-group-item list-group-item-action">
                                    <i class="fas fa-file-pdf me-2"></i>
                                    Lecture 2
                                </a>

                                <a href="assets/file/lecture3.pdf"
                                   download
                                   class="list-group-item list-group-item-action">
                                    <i class="fas fa-file-pdf me-2"></i>
                                    Lecture 3
                                </a>

                            </div>

                            <a href="https://datarockie.com/blog/ml101-gradient-descent/"
                               target="_blank"
                               class="btn btn-success ms-2 mt-3">
                                <i class="fas fa-arrow-up-right-from-square me-2"></i>
                                Open Learning Material
                            </a>

                            <div class="mt-4">
                                <button class="btn btn-secondary btn-sm"
                                        data-bs-dismiss="modal">
                                    <i class="fas fa-xmark fa-fw"></i>
                                    Close Window
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    </div>

</div>
`;

document.body.insertAdjacentHTML("beforeend", modalHTML);