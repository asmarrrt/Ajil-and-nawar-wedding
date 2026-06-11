// ========================================
// WEDDING INVITATION SCRIPT
// ========================================

// ------------------------
// ELEMENT
// ------------------------

const cover = document.getElementById("cover");
const openBtn = document.getElementById("openInvitation");
const music = document.getElementById("music");

// ------------------------
// CEK COVER
// ------------------------

window.addEventListener("load", () => {

    const opened =
    localStorage.getItem("invitationOpened");

    if (opened === "true" & cover) {

        cover.style.display = "none";

    }

});

// ------------------------
// NAMA TAMU DARI URL
// ------------------------

const guestName =
document.getElementById("guest-name");

const params =
new URLSearchParams(window.location.search);

const guest =
params.get("to");

if (guest && guestName) {

    guestName.textContent =
    decodeURIComponent(guest);

}

// ------------------------
// BUKA UNDANGAN
// ------------------------

function openInvitation() {

    if (!cover) return;

    cover.classList.add("cover-hide");

    localStorage.setItem(
        "invitationOpened",
        "true"
    );

    if (music) {

        music.play().catch(() => {});

    }

    setTimeout(() => {

        cover.style.display = "none";

    }, 1200);

}

if (openBtn) {

    openBtn.addEventListener(
        "click",
        openInvitation
    );

}

// ------------------------
// COUNTDOWN
// ------------------------

const weddingDate =
new Date(
"June 28, 2026 09:00:00"
).getTime();

function updateCountdown() {

    const now =
    new Date().getTime();

    const distance =
    weddingDate - now;

    if (distance < 0) return;

    const days =
    Math.floor(
    distance /
    (1000 * 60 * 60 * 24)
    );

    const hours =
    Math.floor(
    (distance %
    (1000 * 60 * 60 * 24))
    /
    (1000 * 60 * 60)
    );

    const minutes =
    Math.floor(
    (distance %
    (1000 * 60 * 60))
    /
    (1000 * 60)
    );

    const seconds =
    Math.floor(
    (distance %
    (1000 * 60))
    / 1000
    );

    const d =
    document.getElementById("days");

    const h =
    document.getElementById("hours");

    const m =
    document.getElementById("minutes");

    const s =
    document.getElementById("seconds");

    if (d) d.innerText = days;
    if (h) h.innerText = hours;
    if (m) m.innerText = minutes;
    if (s) s.innerText = seconds;

}

updateCountdown();

setInterval(
updateCountdown,
1000
);

// ------------------------
// REVEAL ANIMATION
// ------------------------

const revealItems =
document.querySelectorAll(
".timeline-item, .person, .event-card, .gift-card, .ucapan-card"
);

revealItems.forEach(item => {

    item.style.opacity = "0";
    item.style.transform =
    "translateY(40px)";
    item.style.transition =
    ".8s ease";

});

function revealOnScroll() {

    revealItems.forEach(item => {

        const top =
        item.getBoundingClientRect().top;

        if (
            top <
            window.innerHeight - 100
        ) {

            item.style.opacity = "1";
            item.style.transform =
            "translateY(0)";

        }

    });

}

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();

// ------------------------
// SAKURA
// ------------------------

function createPetal() {

    const petal =
    document.createElement("div");

    petal.innerHTML = "🌸";

    petal.style.position =
    "fixed";

    petal.style.left =
    Math.random() * 100 + "vw";

    petal.style.top =
    "-30px";

    petal.style.fontSize =
    Math.random() * 10 + 15 + "px";

    petal.style.pointerEvents =
    "none";

    petal.style.zIndex =
    "999";

    document.body.appendChild(
    petal
    );

    const duration =
    Math.random() * 4000 + 6000;

    petal.animate([
        {
            transform:
            "translateY(0) rotate(0deg)"
        },
        {
            transform:
            "translateY(120vh) rotate(720deg)"
        }
    ], {
        duration: duration,
        easing: "linear"
    });

    setTimeout(() => {

        petal.remove();

    }, duration);

}

setInterval(
createPetal,
700
);

// ------------------------
// COPY REKENING
// ------------------------

const copyButtons =
document.querySelectorAll(
".gift-card button"
);

copyButtons.forEach(btn => {

    btn.addEventListener(
    "click",
    () => {

        const rekening =
        "1100683438";

        navigator.clipboard.writeText(
        rekening
        );

        btn.innerText =
        "Berhasil Disalin";

        setTimeout(() => {

            btn.innerText =
            "Salin Nomor Rekening";

        }, 2000);

    });

});

// ------------------------
// ACTIVE MENU
// ------------------------

const sections =
document.querySelectorAll(
"section"
);

const navLinks =
document.querySelectorAll(
"#bottom-nav a"
);

window.addEventListener(
"scroll",
() => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop - 150;

        if (
            window.scrollY >=
            sectionTop
        ) {

            current =
            section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove(
        "active"
        );

        if (
            link.getAttribute("href")
            === "#" + current
        ) {

            link.classList.add(
            "active"
            );

        }

    });

}
);

// ------------------------
// PARALLAX HERO
// ------------------------

const hero =
document.getElementById(
"hero"
);

window.addEventListener(
"scroll",
() => {

    if (!hero) return;

    hero.style.backgroundPositionY =
    window.pageYOffset *
    0.4 + "px";

}
);

// ------------------------
// FLOATING MUSIC BUTTON
// ------------------------

const musicBtn =
document.createElement(
"button"
);

musicBtn.id =
"musicButton";

musicBtn.innerHTML =
"🎵";

document.body.appendChild(
musicBtn
);

musicBtn.addEventListener(
"click",
() => {

    if (!music) return;

    if (music.paused) {

        music.play();

    } else {

        music.pause();

    }

}
);
