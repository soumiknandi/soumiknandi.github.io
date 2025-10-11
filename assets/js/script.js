// Contact Form Validation
const validateForm = () => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
}

window.addEventListener("load", () => validateForm());


// Counter
const options = {
    root: null, // Observe against the viewport
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the div is visible
};

const observerCb = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const increment = target / 1300; // adjust speed

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target + " +";
                    }
                };
                updateCount();
            });
            observer.unobserve(entry.target)
        }
    });
}

const observer = new IntersectionObserver(observerCb, options);
observer.observe(document.getElementById('counter'));



// Top & bottom navbar 
const sections = Array.from(document.getElementsByClassName("scroll-section"));
const navLinks = Array.from(document.querySelectorAll("#main-navbar .nav-link"));
const bottomNavLinks = Array.from(document.querySelectorAll("#bottom-nav .nav-link"));

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 400; // adjust offset
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });

    bottomNavLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });

});



// Left Right scroll button for skills
document.querySelectorAll(".skills-scroll-wrapper").forEach(wrapper => {
    const scrollContainer = wrapper.querySelector(".skills-scroll");
    const leftBtn = wrapper.querySelector(".scroll-btn.left");
    const rightBtn = wrapper.querySelector(".scroll-btn.right");

    function updateButtons() {
        const scrollLeft = Math.round(scrollContainer.scrollLeft);
        const maxScroll = Math.round(scrollContainer.scrollWidth - scrollContainer.clientWidth);


        if (scrollContainer.scrollWidth <= scrollContainer.clientWidth) {
            // No overflow → hide both
            leftBtn.classList.add("hidden");
            rightBtn.classList.add("hidden");
        } else {
            // Overflow exists → check positions
            if (scrollLeft <= 0) {
                leftBtn.classList.add("inactive");
            } else {
                leftBtn.classList.remove("hidden");
                leftBtn.classList.remove("inactive");
            }

            if (scrollLeft >= maxScroll) {
                rightBtn.classList.add("inactive");
            } else {
                rightBtn.classList.remove("hidden");
                rightBtn.classList.remove("inactive");
            }
        }
    }

    function smoothScrollBy(amount) {
        scrollContainer.scrollBy({ left: amount, behavior: "smooth" });
        setTimeout(updateButtons, 400);
    }

    leftBtn.addEventListener("click", () => smoothScrollBy(-250));
    rightBtn.addEventListener("click", () => smoothScrollBy(250));
    scrollContainer.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    window.addEventListener("load", () => setTimeout(updateButtons, 500));
});



// Footer
document.getElementById("year").textContent = new Date().getFullYear();
