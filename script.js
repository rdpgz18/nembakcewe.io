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
    { 
        sender: "bot", 
        text: "Fakta tentang aku:\n- RAM: Cukup buat menyimpan semua moment sama kamu\n- Storage: Penuh dengan foto kamu\n- Algorithm: Selalu mengarah ke kamu\n\nMau bukti?",
        delay: 1500,
        action: () => {
            // Tampilkan gallery setelah pesan ini
            setTimeout(showMemoryGallery, 500);
        }
    },
    // ... pesan selanjutnya
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
                // Jalankan aksi jika ada
                if (msg.action) msg.action();
                
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
    }else{
        // Tampilkan tombol aksi setelah chat selesai
        inputBox.classList.add("hidden");
        actionButtons.classList.remove("hidden");
    }
}

// ================ TOMBOL AKSI ================
document.getElementById("real-yes-btn").addEventListener("click", function() {
    // Sembunyikan gallery dan tombol
    document.getElementById("memory-gallery").classList.add("hidden");
    this.classList.add("hidden");
    
    // Tampilkan pesan "Yeay!"
    simulateTyping("Yeay! Sekarang aku bisa upgrade dari 'teman' ke 'pacar'. Love you 😊", () => {
        confetti({
            particleCount: 150,
            spread: 70
        });
    });
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


// =============== GALERY ================= 
// Daftar foto kenangan (ganti dengan path foto kalian)
const memories = [
    { img: "assets/images/memory1.jpg", caption: "Foto pertama kita bersama ❤️" },
    { img: "assets/images/memory2.jpg", caption: "Liburan pantai 🏖️" },
    { img: "assets/images/memory3.jpg", caption: "Ulang tahunmu yang ke-21 🎂" },
    { img: "assets/images/memory4.jpg", caption: "Ulang tahunku yang ke-21 🎂" },
    // Tambahkan lebih banyak foto
];
// Fungsi untuk menampilkan gallery
functions showMemoryGallery()
function showMemoryGallery() {
    const gallery = document.getElementById("memory-gallery");
    gallery.classList.remove("hidden");
    
    // Tampilkan tombol "Mau" setelah 3 detik
    setTimeout(() => {
        document.getElementById("confession-section").classList.remove("hidden");
    }, 3000);
}

// Fungsi untuk menampilkan foto besar
function showFullMemory(memory) {
    const mainImg = document.getElementById("main-memory");
    mainImg.src = memory.img;
    mainImg.alt = memory.caption;
    mainImg.classList.remove("hidden");
    
    // Scroll ke foto
    mainImg.scrollIntoView({ behavior: "smooth" });
}



