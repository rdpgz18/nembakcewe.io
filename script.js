// ================ VARIABLES ================
const chatContainer = document.getElementById("chat-container");
const inputBox = document.getElementById("input-box");
const actionButtons = document.getElementById("action-buttons");
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const themeToggle = document.getElementById("theme-toggle");
const musicToggle = document.getElementById("music-toggle");
const bgMusic = document.getElementById("bg-music");

let isMusicPlaying = false;
let currentTheme = "light";

// ================ THEME TOGGLE ================
themeToggle.addEventListener("click", () => {
    if (currentTheme === "light") {
        document.documentElement.classList.add("dark");
        themeToggle.textContent = "☀️";
        currentTheme = "dark";
    } else {
        document.documentElement.classList.remove("dark");
        themeToggle.textContent = "🌙";
        currentTheme = "light";
    }
});

// ================ MUSIC TOGGLE ================
musicToggle.addEventListener("click", () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.textContent = "🔇";
    } else {
        bgMusic.play();
        musicToggle.textContent = "🔊";
    }
    isMusicPlaying = !isMusicPlaying;
});

// ================ CHAT FLOW ================
const messages = [
    { sender: "bot", text: "Hai! Aku bukan AI biasa. Aku punya pertanyaan spesial buat kamu..." },
    { sender: "user", text: "Apa?", delay: 1000 },
    { sender: "bot", text: "Fakta tentang aku:\n- RAM: Cukup buat menyimpan semua moment sama kamu.\n- Storage: Penuh dengan foto kamu.\n- Algorithm: Selalu mengarah ke kamu.\n\nMau bukti?", delay: 1500 },
];

let currentMessage = 0;

function addMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `p-3 rounded-lg max-w-xs md:max-w-md ${sender === "bot" ? "bg-gray-200 dark:bg-gray-700" : "bg-green-500 text-white ml-auto"}`;
    messageDiv.innerHTML = text.replace(/\n/g, "<br>");
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function simulateTyping(text, callback) {
    const typingDiv = document.createElement("div");
    typingDiv.className = "p-3 rounded-lg bg-gray-200 dark:bg-gray-700 max-w-xs md:max-w-md typing";
    chatContainer.appendChild(typingDiv);

    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < text.length) {
            typingDiv.innerHTML = text.substring(0, i + 1) + '<span class="typing"></span>';
            i++;
        } else {
            clearInterval(typingEffect);
            typingDiv.innerHTML = text.replace(/\n/g, "<br>");
            typingDiv.classList.remove("typing");
            if (callback) callback();
        }
    }, 30);
}

function processNextMessage() {
    if (currentMessage < messages.length) {
        const msg = messages[currentMessage];
        
        if (msg.sender === "bot") {
            simulateTyping(msg.text, () => {
                currentMessage++;
                if (currentMessage < messages.length && messages[currentMessage].sender === "user") {
                    setTimeout(() => {
                        addMessage("user", messages[currentMessage].text);
                        currentMessage++;
                        processNextMessage();
                    }, messages[currentMessage].delay || 500);
                } else {
                    processNextMessage();
                }
            });
        }
    } else {
        // Tampilkan tombol aksi setelah chat selesai
        inputBox.classList.add("hidden");
        actionButtons.classList.remove("hidden");
    }
}

// ================ TOMBOL AKSI ================
btnYes.addEventListener("click", () => {
    addMessage("user", "Mau!");
    simulateTyping("Yeay! Sekarang aku bisa upgrade dari 'teman' ke 'pacar'. Love you 💖", () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    });
    actionButtons.classList.add("hidden");
});

btnNo.addEventListener("mouseover", () => {
    btnNo.classList.add("running-away");
    setTimeout(() => {
        btnNo.textContent = "Mau 😏";
        btnNo.classList.remove("running-away");
        btnNo.style.opacity = "1";
        btnNo.style.transform = "translateX(0)";
    }, 500);
});

// ================ INIT ================
// Mulai chat otomatis
setTimeout(() => {
    processNextMessage();
}, 1000);

// Auto-focus input (jika diperlukan)
sendBtn.addEventListener("click", () => {
    if (userInput.value.trim()) {
        addMessage("user", userInput.value);
        userInput.value = "";
    }
});

// ================== Galery ===============

// Daftar foto kenangan (ganti dengan path foto kalian)
const memories = [
    "assets/images/memory1.jpg",
    "assets/images/memory2.jpg",
    "assets/images/memory3.jpg",
    "assets/images/memory4.jpg",
];

const memoryPhoto = document.getElementById("memory-photo");
let currentIndex = 0;

// Fungsi untuk mengganti foto
function showNextMemory() {
    // Fade-out foto saat ini
    memoryPhoto.classList.remove("active");
    
    setTimeout(() => {
        // Ganti sumber foto
        currentIndex = (currentIndex + 1) % memories.length;
        memoryPhoto.src = memories[currentIndex];
        
        // Fade-in foto baru
        memoryPhoto.classList.add("active");
    }, 1000); // Delay 1 detik untuk fade-out
}

// Mulai dengan foto pertama
memoryPhoto.src = memories[0];
memoryPhoto.onload = () => {
    memoryPhoto.classList.add("active");
};

// Otomatis ganti foto setiap 3 detik
setInterval(showNextMemory, 3000);
