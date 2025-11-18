const intro = document.getElementById("intro-screen");
const mainContent = document.querySelector(".main-content");
const music = document.getElementById("bgMusic");

// 🌸 Mở cửa + hiện dần nội dung
intro.addEventListener("click", () => {
  intro.classList.add("open");
  mainContent.classList.add("visible"); // bắt đầu fade-in cùng lúc mở cửa

  setTimeout(() => {
    intro.style.display = "none"; // ẩn hai cánh cửa sau khi mở xong
    initMusic();
  }, 1600);
});

// 🎵 Phát nhạc
function initMusic() {
  if (!music) return;
  music.play().catch(() => {
    console.log("⚠️ Cần tương tác người dùng để phát nhạc.");
    // Nếu không phát được, hiển thị nút bật nhạc (không bắt buộc, nhưng hữu ích)
    if (!document.getElementById('playMusicBtn')) {
      const btn = document.createElement('button');
      btn.id = 'playMusicBtn';
      btn.style.position = 'fixed';
      btn.style.bottom = '18px';
      btn.style.right = '18px';
      btn.style.background = '#00b3b3';
      btn.style.color = 'white';
      btn.style.border = 'none';
      btn.style.padding = '10px 14px';
      btn.style.borderRadius = '12px';
      btn.style.cursor = 'pointer';
      btn.innerText = 'Bật nhạc';
      btn.onclick = () => {
        music.play().then(() => btn.remove()).catch(() => console.log('Không thể phát nhạc'));
      };
      document.body.appendChild(btn);
    }
  });
}

// 💍 Đếm ngược (bây giờ hỗ trợ cả giờ)
function updateCountdown() {
  const dateEl = document.querySelector('.date');
  if (!dateEl) return;
  const eventTimeAttr = dateEl.dataset.eventTime || "2025-11-30T10:00:00";
  const target = new Date(eventTimeAttr);
  const now = new Date();
  const diff = target - now;

  // Cập nhật hiển thị giờ trên ô ngày (đồng bộ)
  const timeDisplay = document.getElementById('eventTimeDisplay');
  if (timeDisplay) {
    const hh = String(target.getHours()).padStart(2, '0');
    const mm = String(target.getMinutes()).padStart(2, '0');
    timeDisplay.innerText = `${hh}:${mm}`;
  }

  // Cập nhật ngày + tháng + năm (nếu bạn muốn tự động hóa)
  const dayNumber = document.getElementById('dayNumber');
  const monthYear = document.getElementById('monthYear');
  const weekdayLabel = document.getElementById('weekdayLabel');
  if (dayNumber) dayNumber.innerText = String(target.getDate());
  if (monthYear) {
    const months = ['THÁNG 1','THÁNG 2','THÁNG 3','THÁNG 4','THÁNG 5','THÁNG 6','THÁNG 7','THÁNG 8','THÁNG 9','THÁNG 10','THÁNG 11','THÁNG 12'];
    monthYear.innerHTML = `${months[target.getMonth()]}<br>NĂM ${target.getFullYear()}`;
  }
  if (weekdayLabel) {
    const weekdays = ['CHỦ NHẬT','THỨ HAI','THỨ BA','THỨ TƯ','THỨ NĂM','THỨ SÁU','THỨ BẢY'];
    weekdayLabel.innerText = weekdays[target.getDay()];
  }

  if (diff <= 0) {
    document.getElementById("countdown").innerText =
      `💞 Hôm nay là ngày trọng đại của chúng ta (lúc ${timeDisplay ? timeDisplay.innerText : ''}) 💞`;
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  document.getElementById("countdown").innerText =
    `💍 Còn ${d} ngày ${h} giờ ${m} phút ${s} giây 💍`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 💌 Gửi lựa chọn
function submitChoice(choice) {
  const guest = document.getElementById("guestName").innerText;
  fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guest, choice }),
  });

  if (choice === "Tham gia") {
    window.open(
      "https://maps.app.goo.gl/E5BN6gBA4B9spQzv8",
      "_blank"
    );
  } else if (choice === "Bận - Mừng online") {
    showQrPopup();
  }
}

// 💌 Popup QR
function showQrPopup() {
  if (document.getElementById("qrPopup")) return;
  const overlay = document.createElement("div");
  overlay.id = "qrPopup";
  overlay.innerHTML = `
    <div>
      <h3 style="color:#006666;">💌 Mừng cưới online 💌</h3>
      <img src="qr.jpg" alt="QR Mừng cưới">
      <p>Quét mã để mừng cưới nhé 🎁</p>
      <button onclick="document.getElementById('qrPopup').remove()" style="background:#009999;color:white;border:none;padding:8px 16px;border-radius:8px;">Đóng</button>
    </div>`;
  document.body.appendChild(overlay);
}
// 🍂 Tạo hiệu ứng lá rơi
function createLeaf() {
  const leaf = document.createElement("img");
  leaf.src = "leaf.png"; // 👉 đặt file leaf.png vào cùng thư mục index.html
  leaf.classList.add("leaf");

  // vị trí rơi ngẫu nhiên
  leaf.style.left = Math.random() * 100 + "vw";

  // tốc độ rơi ngẫu nhiên
  const duration = 6 + Math.random() * 5;
  leaf.style.animationDuration = duration + "s";

  document.body.appendChild(leaf);

  // Xoá lá sau khi rơi xong
  setTimeout(() => leaf.remove(), duration * 1000);
}

// tạo lá liên tục mỗi 500ms
setInterval(createLeaf, 600);
