const quizContainer = document.getElementById('quiz-container');
const heartsContainer = document.getElementById('hearts-container');

// GANTI SELURUH OBJEK quizData LAMA DENGAN YANG BARU INI

const quizData = {
    'start': {
        question: 'Untuk Diyyah, Bidadari 7 Tahunku.',
        prose: 'Aku tahu kata-kata saja tidak akan pernah cukup. Tapi izinkan aku mengajakmu dalam sebuah perjalanan singkat, untuk melihat semua dari sudut pandangku yang sekarang. Aku yang sudah benar-benar sadar.',
        answers: [
            { text: 'Mulai perjalanan...', next: 'q1' }
        ]
    },
    'q1': {
        question: 'Langkah pertama adalah pengakuan. Dari semua kebodohanku, mana yang meninggalkan luka paling dalam untukmu?',
        answers: [
            { text: 'Saat aku tidak jujur dan menyembunyikan sesuatu.', next: 'q2_bohong' },
            { text: 'Saat aku melukai kepercayaanmu dengan perempuan lain.', next: 'q2_selingkuh' },
            { text: 'Sikap dinginku dan caraku yang sering tidak menghargaimu.', next: 'q2_sikap' }
        ]
    },
    'q2_bohong': {
        question: 'Aku sadar setiap kebohongan adalah racun. Itu membuatmu merasa tidak dihargai dan diremehkan. Apa yang paling sering kamu pikirkan saat tahu aku tidak jujur?',
        answers: [
            { text: '"Apa aku sebodoh itu sampai tidak bisa melihatnya?"', next: 'q3_perasaanmu' },
            { text: '"Apa kurangku sampai dia harus berbohong?"', next: 'q3_perasaanmu' },
            { text: '"Aku tidak bisa percaya apapun lagi yang dia katakan."', next: 'q3_perasaanmu' }
        ]
    },
    'q2_selingkuh': {
        question: 'Tindakanku itu pasti menumbuhkan insecure yang sangat besar di hatimu. Aku minta maaf. Perasaan apa yang paling menyiksamu saat itu?',
        answers: [
            { text: 'Perasaan tidak akan pernah cukup baik untukmu.', next: 'q3_perasaanmu' },
            { text: 'Rasa cemburu dan curiga yang tidak pernah hilang.', next: 'q3_perasaanmu' },
            { text: 'Marah, karena kesetiaanku terasa sia-sia.', next: 'q3_perasaanmu' }
        ]
    },
    'q2_sikap': {
        question: 'Aku sering egois dan lupa bahwa ada hatimu yang harus kujaga. Sikapku yang mana yang paling membuatmu merasa sendirian dalam hubungan ini?',
        answers: [
            { text: 'Saat aku lebih mementingkan teman/hobiku.', next: 'q3_perasaanmu' },
            { text: 'Saat kamu butuh didengarkan, tapi aku malah sibuk dengan duniaku.', next: 'q3_perasaanmu' },
            { text: 'Saat aku meremehkan perasaan atau masalahmu.', next: 'q3_perasaanmu' }
        ]
    },
    'q3_perasaanmu': {
        question: 'Semua itu mengerucut pada satu perasaan. Aku tahu aku telah menyebabkan badai di hatimu. Jika harus memilih satu kata, perasaan apa yang paling menggambarkan kondisimu saat itu?',
        answers: [
            { text: 'Kecewa.', next: 'q4_validasi' },
            { text: 'Lelah.', next: 'q4_validasi' },
            { text: 'Hancur.', next: 'q4_validasi' }
        ]
    },
    'q4_validasi': {
        question: 'Aku mengerti. Kamu berhak merasakan itu semua. Aku yang seharusnya jadi alasanmu bahagia, malah menjadi sumber luka terbesarmu. Aku minta maaf, dari lubuk hatiku yang terdalam.',
        prose: 'Tapi di tengah semua puing-puing itu, ada alasan kita bisa bertahan 7 tahun. Ada fondasi yang pernah kita bangun. Izinkan aku mengingatnya sejenak.',
        answers: [
            { text: 'Lanjutkan...', next: 'q5_kenangan' }
        ]
    },
    'q5_kenangan': {
        question: 'Di antara ribuan hari yang kita lewati, ada momen-momen emas yang tersimpan. Kenangan mana yang paling sering melintas di benakmu, yang bisa membuatmu tersenyum kecil?',
        answers: [
            { text: 'Saat kita nekat ke Bukit Pelangi.', next: 'q6_detail' },
            { text: 'Momen kecil seperti jajan seblak di condet.', next: 'q6_detail' },
            { text: 'Saat kita saling mendukung di masa sulit.', next: 'q6_detail' }
        ]
    },
    'q6_detail': {
        question: 'Aku juga paling suka momen itu. Apa detail paling kecil dari kenangan itu yang paling kamu ingat?',
        answers: [
            { text: 'Caramu tertawa saat itu.', next: 'q7_janji' },
            { text: 'Obrolan kita sepanjang perjalanan.', next: 'q7_janji' },
            { text: 'Perasaan lega dan bahagia saat itu.', next: 'q7_janji' }
        ]
    },
    'q7_janji': {
        question: 'Tawa dan perasaan itulah yang ingin aku perjuangkan kembali. Aku tidak menawarkan masa lalu, tapi masa depan yang berbeda. Ini adalah janjiku yang pertama dan utama:',
        prose: 'Aku akan membangun kembali kepercayaanmu, dengan kejujuran mutlak, tidak peduli sepahit apapun kebenarannya.',
        answers: [
            { text: 'Aku dengar...', next: 'q8_visi' }
        ]
    },
    'q8_visi': {
        question: 'Janjiku yang kedua adalah tentang kita. Aku ingin kita bukan hanya sekadar "bersama", tapi menjadi sebuah "kita". Visi "kita" seperti apa yang paling kamu harapkan?',
        answers: [
            { text: 'Kita yang saling mendukung mimpi masing-masing.', next: 'q9_serius' },
            { text: 'Kita yang bisa berkomunikasi dewasa tanpa drama.', next: 'q9_serius' },
            { text: 'Kita yang menjadikan satu sama lain rumah untuk pulang.', next: 'q9_serius' }
        ]
    },
    'q9_serius': {
        question: 'Itu juga visiku. Dan aku mau ini menjadi nyata, bukan hanya angan-angan. Aku ingin menunjukkan bahwa aku serius, lebih serius dari sebelumnya.',
        prose: 'Semua kata-kata ini tidak ada artinya tanpa bukti. Aku sudah menyiapkan sebuah pesan terakhir, sebuah bukti dari keseriusanku.',
        answers: [
            { text: 'Tunjukkan padaku', next: 'end_yes' }
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
        prose: 'Aku mencintaimu, sekarang dan selamanya.'
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
