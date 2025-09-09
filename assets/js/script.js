// Example starter JavaScript for disabling form submissions if there are invalid fields
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
// Github stuff below

const repos_list = [
    'ulauncher stream anime', 'terraform tutorial',
    'spring microservice', 'node-mysql-html-docker',
    'FENCE INSTALLATION DEVICE'
]

const getGithubData = () => {
    fetch('./github.json')
        .then(res => res.json())
        .then(data => showGithubData(data));
}

const getGithubRepoLang = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const showGithubData = (repos) => {
    const repoList = document.getElementById('repo-list');


    repos_list.forEach(r => {


        let repo = repos.find(f => f.name.toLowerCase() === r.toLowerCase())

        const col = document.createElement('div');
        col.className = 'col-md-4 mt-4';

        // console.log(repo)
        col.innerHTML = `
          <div class="card h-100 shadow-sm clickable-card" onclick="window.open('${repo.html_url}', '_blank')">
            <div class="card-body">
              <h5 class="card-title">
                ${repo.name}
              </h5>
              <p class="card-text">${repo.description || 'No description provided.'}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
            <small class="text-muted"> ${repo.stargazers_count !== null ? "⭐ " + repo.stargazers_count : ""}</small>
            <small class="text-muted"><b>${repo.language || 'Unknown'}</b> | ${repo.type}</small>
            </div>
          </div>

        `;
        repoList.appendChild(col);

    })


}

const tranposeData = () => {
    aaa.map(a => { return { name: a.name, html_url: a.html_url, description: a.description, language: a.language, stargazers_count: a.stargazers_count } })
}

// Onload function
window.onload = function () {



    validateForm();
    getGithubData();

};



document.getElementById("year").textContent = new Date().getFullYear();

const sections = Array.from(document.getElementsByClassName("scroll-section"));
const navLinks = Array.from(document.querySelectorAll("#main-navbar .nav-link"));
const bottomNavLinks = Array.from(document.querySelectorAll("#bottom-nav .nav-link"));




window.addEventListener("scroll", () => {



    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 1300; // adjust speed

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };


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
        // console.log(link.getAttribute("href"), `#${current}`)
    });

    bottomNavLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });


    if (current === "about" && !countersAnimated) {

        countersAnimated = true;
        animateCounters();
    }






});


