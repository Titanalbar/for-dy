const quizContainer = document.getElementById('quiz-container');
const heartsContainer = document.getElementById('hearts-container');

const quizData = {
    'start': {
        question: 'Untuk Diyyah, Bidadari 7 Tahunku.',
        prose: 'Aku tahu kata-kata saja tidak akan pernah cukup. Tapi izinkan aku mengajakmu mengingat sejenak perjalanan kita, dari sudut pandangku yang sekarang. Aku yang sudah sadar.',
        answers: [
            { text: 'Mulai...', next: 'q1' }
        ]
    },
    'q1': {
        question: 'Dari semua kebodohanku selama 7 tahun ini, mana yang paling menyakitimu?',
        answers: [
            { text: 'Saat kamu tahu aku berbohong.', next: 'q_bohong' },
            { text: 'Saat aku diam-diam kenalan & follow cewek lain.', next: 'q_selingkuh' },
            { text: 'Sikapku yang sering nggak baik dan nggak menghargaimu.', next: 'q_sikap' }
        ]
    },
    'q_bohong': {
        question: 'Aku tahu setiap kebohongan meruntuhkan kepercayaanmu. Apa yang paling kamu rasakan saat itu?',
        answers: [
            { text: 'Aku merasa seperti orang bodoh.', next: 'q_kenangan' },
            { text: 'Aku merasa tidak berharga.', next: 'q_kenangan' },
            { text: 'Aku kehilangan rasa aman.', next: 'q_kenangan' }
        ]
    },
    'q_selingkuh': {
        question: 'Aku sadar perbuatanku itu membuatmu terus membandingkan diri. Perasaan apa yang paling sering muncul?',
        answers: [
            { text: 'Aku jadi insecure.', next: 'q_kenangan' },
            { text: 'Aku merasa kamu nggak pernah cukup denganku.', next: 'q_kenangan' },
            { text: 'Aku marah karena tidak dihargai.', next: 'q_kenangan' }
        ]
    },
     'q_sikap': {
        question: 'Mengingat sikapku yang sering menyakitimu, momen mana yang paling membuatmu merasa sendirian?',
        answers: [
            { text: 'Saat aku membentakmu di depan teman-teman.', next: 'q_kenangan' },
            { text: 'Saat kamu butuh dukungan tapi aku malah sibuk sendiri.', next: 'q_kenangan' }
        ]
    },
    'q_kenangan': {
        question: 'Di tengah semua badai itu, adakah satu kenangan manis kita yang masih sering kamu ingat?',
         answers: [
            { text: 'Motor aku mogok pas ke bukit pelangi.', next: 'q_janji' },
            { text: 'Saat aku nyamperin kamu ke semarang.', next: 'q_janji' },
            { text: 'Momen-momen kecil saat jajan seblak.', next: 'q_janji' }
        ]
    },
    'q_janji': {
        question: 'Aku ingin menciptakan lebih banyak lagi kenangan seperti itu, tapi dengan versi diriku yang baru.',
        prose: 'Versi yang menjadikanmu satu-satunya, yang mendengarkanmu, dan yang pantas untukmu. Aku tidak akan mengulangi kebodohan yang sama. Ini janjiku.',
        answers: [
            { text: 'Lanjut...', next: 'q_final' }
        ]
    },
    'q_final': {
        question: 'Diyyah, maukah kamu memberiku satu kesempatan terakhir?',
        prose: 'Untuk membuktikan janjiku dan memulai kembali semuanya dari nol?',
        answers: [
            { text: 'Ya, aku mau coba lagi.', next: 'end_yes' },
            { text: 'Aku butuh waktu untuk berpikir.', next: 'end_think' }
        ]
    },
    'end_yes': {
        question: 'Terima kasih...',
        prose: 'Detak jantungku berhenti sejenak. Aku punya satu pesan video terakhir untukmu.',
        answers: [
            { text: 'Lihat video', next: 'final_video' } 
        ]
    },
    'final_video': {
        type: 'video',
        videoSrc: 'diyyah.mp4',
        prose: 'Aku sayang kamu, selamanya.'
    },
    'end_think': {
        question: 'Tidak apa-apa, aku mengerti.',
        prose: 'Ambil waktu sebanyak yang kamu butuhkan. Aku tidak akan memaksa. Aku akan hargai apapun keputusanmu. Sambil menunggu, aku akan terus fokus memperbaiki diri, bukan agar kamu kembali, tapi karena itu hal yang benar untuk dilakukan. Aku sayang kamu.'
    }
};

function showQuestion(questionId) {
    const data = quizData[questionId];
    
    // 1. Terapkan efek fade-out
    quizContainer.classList.add('fade-out');

    // 2. Tunggu transisi selesai, baru ganti konten
    setTimeout(() => {
        quizContainer.innerHTML = ''; 

        const music = document.getElementById('background-music');

        if (questionId === 'q1') {
            music.play().catch(error => {
                console.log("Gagal memulai musik secara otomatis:", error);
            });
        }
        
        if (data.type === 'video') {
            music.pause();
            const video = document.createElement('video');
            video.src = data.videoSrc;
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;

            video.play().catch(error => {
                console.log("Autoplay dengan suara gagal.");
            });

            const proseEl = document.createElement('p');
            proseEl.textContent = data.prose;
            proseEl.style.marginTop = '20px';

            quizContainer.appendChild(video);
            quizContainer.appendChild(proseEl);

            // PERBAIKAN: Gunakan 'timeupdate' yang lebih andal
            let videoHasEnded = false; 
            video.addEventListener('timeupdate', () => {
                if (!videoHasEnded && (video.duration - video.currentTime < 0.5)) {
                    videoHasEnded = true; 
                    clearInterval(heartInterval);
                    heartsContainer.innerHTML = '';
                    const overlay = document.getElementById('final-overlay');
                    overlay.style.display = 'flex';
                    setTimeout(() => {
                        overlay.style.opacity = '1';
                    }, 100);
                }
            });
        } 
        else { 
            const questionEl = document.createElement('h1');
            questionEl.textContent = data.question;
            quizContainer.appendChild(questionEl);
            
            if (data.prose) {
                const proseEl = document.createElement('p');
                proseEl.textContent = data.prose;
                quizContainer.appendChild(proseEl);
            }

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            
            if (data.answers) {
                data.answers.forEach(answer => {
                    const button = document.createElement('button');
                    button.textContent = answer.text;
                    button.onclick = () => showQuestion(answer.next);
                    buttonContainer.appendChild(button);
                });
            }
            quizContainer.appendChild(buttonContainer);
        }

        // 3. Tampilkan kembali container dengan konten baru (efek fade-in)
        quizContainer.classList.remove('fade-out');
    }, 500);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 5 + 5 + 's';
    heart.innerHTML = '❤️';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// PERBAIKAN: Simpan interval ke dalam variabel
let heartInterval = setInterval(createHeart, 300);

showQuestion('start');