// --- KHỞI TẠO TRẠNG THÁI VÀ DỮ LIỆU --- 
let isLoggedIn = false; 
let favorites = JSON.parse(localStorage.getItem("favorites")) || []; 
let historyList = JSON.parse(localStorage.getItem("historyList")) || [];
let currentWinner = null; 
let isSpinning = false;

const backupFoodImg = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"; 
const backupDrinkImg = "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500"; 
 
const systemDefaults = { 
    food: [ 
        {  
            name: "Bánh Mì",  
            img: "https://banhmihuynhhoa.vn/wp-content/uploads/2024/10/dscf0643-min.jpg",  
            recipe: `NGUYÊN LIỆU\n1. 1 ổ bánh mì, 100g thịt heo/gà, pate, mayonnaise.\n2. Dưa leo, đồ chua, rau ngò.\n3. Gia vị: nước mắm, đường, tiêu, tỏi.\n\nCÁCH LÀM\n1. Trộn thịt với gia vị, ướp 30 phút.\n2. Áp chảo thịt chín vàng.\n3. Phết pate/mayonnaise vào bánh mì, cho thịt và rau vào.\n4. Dùng nóng.`  
        }, 
        {  
            name: "Lẩu Thái",  
            img: "https://cdn.tgdd.vn/2020/09/CookProduct/3-cach-nau-lau-ga-chua-cay-thom-ngon-hit-ha-ngay-mua-lanh-1-1200x676.jpg",  
            recipe: `NGUYÊN LIỆU\n1. 1 lít nước dùng, sả, riềng, lá chanh.\n2. Tương lẩu Thái, tôm/thịt bò, nấm, rau, bún.\n\nCÁCH LÀM\n1. Nấu nước dùng với sả, riềng, lá chanh trong 15 phút.\n2. Cho tương lẩu Thái và nêm gia vị.\n3. Khi ăn nhúng thịt, hải sản và rau vào nồi.`  
        }, 
        {  
            name: "Nướng BBQ",  
            img: "https://cdn.tgdd.vn/2021/03/CookProduct/Bbq-la-gi-nguon-goc-va-cac-cach-tu-lam-bbq-tai-nha-vo-cung-don-gian-0-1200x676.jpg",  
            recipe: `NGUYÊN LIỆU\n1. 250g thịt ba chỉ, nước tương, dầu hào, mật ong, tỏi, tiêu.\n\nCÁCH LÀM\n1. Ướp thịt với hỗn hợp gia vị trong 60 phút.\n2. Nướng thịt ở 200°C khoảng 15 phút.\n3. Làm nước chấm từ nước tương, đường, tỏi ớt.`  
        }, 
        {  
            name: "Pizza",  
            img: "https://www.tillamook.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fj8tkpy1gjhi5%2F5OvVmigx6VIUsyoKz1EHUs%2Fb8173b7dcfbd6da341ce11bcebfa86ea%2FSalami-pizza-hero.jpg&w=1024&q=75",  
            recipe: `NGUYÊN LIỆU\n1. Bột mì, men nở, nước ấm, muối, dầu ăn.\n2. Sốt cà chua, phô mai, topping.\n\nCÁCH LÀM\n1. Nhào bột, ủ 1 giờ.\n2. Cán mỏng, phết sốt, rải phô mai và nhân.\n3. Nướng 220°C trong 15 phút.`  
        }, 
        {  
            name: "Bún Bò",  
            img: "https://bizweb.dktcdn.net/100/603/550/articles/bun-bo-hue-anh-bia.jpg?v=1759828241660",  
            recipe: `NGUYÊN LIỆU\n1. Bún, thịt bò, xương ống, sả, mắm ruốc, rau sống.\n\nCÁCH LÀM\n1. Hầm xương với sả, nêm mắm ruốc và gia vị.\n2. Chần thịt bò, chan nước dùng vào bún.\n3. Ăn kèm rau sống.`  
        }, 
        {  
            name: "Cơm Tấm",  
            img: "https://upload.wikimedia.org/wikipedia/commons/b/b0/C%C6%A1m_T%E1%BA%A5m%2C_Da_Nang%2C_Vietnam.jpg",  
            recipe: `NGUYÊN LIỆU\n1. Cơm tấm, sườn cốt lết, trứng, nước mắm, đường, mật ong, tỏi.\n\nCÁCH LÀM\n1. Ướp sườn 1 giờ rồi nướng vàng.\n2. Chiên trứng ốp la.\n3. Ăn kèm cơm, sườn và nước mắm chua ngọt.`  
        }, 
        {  
            name: "Gà Rán",  
            img: "https://file.hstatic.net/200000700229/article/ga-ran-gion-1_83c75dcbff794589a4be4ae74e71c8e6.jpg",  
            recipe: `NGUYÊN LIỆU\n1. Gà, bột mì, bột bắp, trứng, gia vị.\n\nCÁCH LÀM\n1. Ướp gà, nhúng qua trứng rồi lăn bột.\n2. Chiên ngập dầu đến khi vàng giòn.`  
        } 
    ], 
    drink: [ 
        {  
            name: "Trà Sữa",  
            img: "https://mochacoffee.vn/bi-mat-ve-tra-sua-thuc-uong-van-nguoi-me-hien-nay-post5",  
            recipe: `NGUYÊN LIỆU\n1. Trà túi lọc, sữa tươi, sữa đặc, trân châu.\n\nCÁCH LÀM\n1. Hãm trà, thêm sữa tươi và sữa đặc.\n2. Thêm trân châu đã luộc và đá viên.`  
        }, 
        {  
            name: "Cà Phê Muối",  
            img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500",  
            recipe: `NGUYÊN LIỆU\n1. Cà phê phin, kem béo, muối biển.\n\nCÁCH LÀM\n1. Pha cà phê phin.\n2. Đánh bông kem béo với muối.\n3. Rót lớp kem lên trên mặt cà phê.`  
        }, 
        {  
            name: "Nước Cam",  
            img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500",  
            recipe: `NGUYÊN LIỆU\n1. Cam tươi, đường/mật ong, một chút muối.\n\nCÁCH LÀM\n1. Vắt cam, thêm đường và xíu muối cho đậm vị.\n2. Khuấy đều với đá.`  
        }, 
        {  
            name: "Sinh Tố Bơ",  
            img: "https://s3.remagan.com/pro.remagan.uploads/product/2023/11/coconut-avocado-smoothie-sinh-to-bo-dua-20231116163937_6555e359ebafa.webp",  
            recipe: `NGUYÊN LIỆU\n1. Bơ chín, sữa đặc, sữa tươi, đá bào.\n\nCÁCH LÀM\n1. Xay nhuyễn bơ với các loại sữa và đá.`  
        }, 
        {  
            name: "Trà Đào",  
            img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=500",
            recipe: `NGUYÊN LIỆU\n1. Trà, đào ngâm, nước đường.\n\nCÁCH LÀM\n1. Pha trà, thêm nước đào và đào miếng vào.\n2. Thêm đá và khuấy đều.`  
        }, 
        {  
            name: "Soda Mint",  
            img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500",  
            recipe: `NGUYÊN LIỆU\n1. Soda, siro bạc hà, lá bạc hà.\n\nCÁCH LÀM\n1. Cho siro vào ly, thêm đá, rót soda vào.\n2. Trang trí lá bạc hà.`  
        } 
    ]
}; 
let database = { 
    food: systemDefaults.food.map(item => ({ ...item })), 
    drink: systemDefaults.drink.map(item => ({ ...item })) 
}; 
 
let activeTab = 'food'; 
 
const canvas = document.getElementById("wheelCanvas"); 
const ctx = canvas.getContext("2d"); 
const imageOverlay = document.getElementById("wheelImageOverlay"); 
const spinActionBtn = document.getElementById("spinActionBtn"); 
const inputElement = document.getElementById("inputElement"); 
const listUiContainer = document.getElementById("listUiContainer"); 
const bodyBgBlur = document.getElementById("bodyBgBlur"); 
 
const UIColors = ["#2c3e50", "#d35400", "#2980b9", "#8e44ad", "#27ae60", "#e67e22", "#f39c12", "#c0392b"]; 
const size = 350; const center = size / 2; let currentDeg = 0; let audioContext = null; 
 
// --- QUẢN LÝ ĐIỀU HƯỚNG TABS SINGLE PAGE ---
function handleRouting() {
    const hash = window.location.hash || '#trangchu';
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.remove("active");
    });
    const activeSection = document.querySelector(hash);
    if(activeSection) {
        activeSection.classList.add("active");
    }
}
window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', () => {
    handleRouting();
    renderWheel();
    renderListUI();
});

// --- AUDIO LOGIC ---
function startAudio() { if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)(); } 
function playTick() { startAudio(); if (!audioContext) return; let osc = audioContext.createOscillator(); let gain = audioContext.createGain(); osc.type = 'triangle'; osc.frequency.setValueAtTime(600, audioContext.currentTime); osc.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.04); gain.gain.setValueAtTime(0.15, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.04); osc.connect(gain); gain.connect(audioContext.destination); osc.start(); osc.stop(audioContext.currentTime + 0.04); } 
 
// --- QUẢN LÝ TÀI KHOẢN & AUTH ---
function switchForm(formType) { 
    const loginForm = document.getElementById("loginFormContainer"); 
    const registerForm = document.getElementById("registerFormContainer"); 
    if (formType === 'register') { 
        loginForm.style.display = "none"; 
        registerForm.style.display = "block"; 
    } else { 
        loginForm.style.display = "block"; 
        registerForm.style.display = "none"; 
    } 
} 
 
function toggleModal(show) {  
    document.getElementById("loginModal").classList.toggle("open", show);   
    if(show) switchForm('login'); 
} 
 
function handleLoginSubmit(event) { 
    event.preventDefault(); 
    isLoggedIn = true; 
    toggleModal(false); 
    alert('Đăng nhập thành công!'); 
    updateAuthUI(); 
} 
 
function handleLogout() { 
    isLoggedIn = false; 
    alert('Đã đăng xuất tài khoản!'); 
    updateAuthUI(); 
} 
 
function updateAuthUI() { 
    const navLoginBtn = document.getElementById("navLoginBtn"); 
    const navLogoutBtn = document.getElementById("navLogoutBtn"); 
    const favoriteSubText = document.getElementById("favoriteSubText"); 
    const historySubText = document.getElementById("historySubText"); 
    const favoriteContainer = document.getElementById("favoriteContainer"); 
    const historyContainer = document.getElementById("historyContainer"); 
 
    if (isLoggedIn) { 
        navLoginBtn.style.display = "none"; 
        navLogoutBtn.style.display = "block"; 
        favoriteSubText.innerText = "Danh sách món ăn bạn yêu thích nhất:"; 
        historySubText.innerText = "Các món ăn bạn đã quay trúng gần đây:"; 
        renderFavorites(); 
        renderHistory();
    } else { 
        navLoginBtn.style.display = "block"; 
        navLogoutBtn.style.display = "none"; 
        favoriteSubText.innerText = "Đăng nhập để xem danh sách yêu thích."; 
        historySubText.innerText = "Đăng nhập để xem lịch sử."; 
        favoriteContainer.innerHTML = ""; 
        historyContainer.innerHTML = ""; 
    } 
} 

function renderFavorites() {
    const favoriteContainer = document.getElementById("favoriteContainer");
    if(!isLoggedIn) return;
    if(favorites.length === 0) {
        favoriteContainer.innerHTML = "<p style='color:#aaa;'>Chưa có món ăn yêu thích nào.</p>";
        return;
    }
    favoriteContainer.innerHTML = favorites.map(item => `
        <div class="mini-card">
            <img src="${item.img}">
            <span>${item.name}</span>
        </div>
    `).join('');
}

function renderHistory() {
    const historyContainer = document.getElementById("historyContainer");
    if(!isLoggedIn) return;
    if(historyList.length === 0) {
        historyContainer.innerHTML = "<p style='color:#aaa;'>Lịch sử quay trống.</p>";
        return;
    }
    historyContainer.innerHTML = historyList.map(item => `
        <div class="mini-card">
            <img src="${item.img}">
            <span>${item.name}</span>
        </div>
    `).join('');
}
 
// --- LOGIC VÒNG QUAY --- 
function changeCategory(type) { 
    if (isSpinning) return; 
    activeTab = type; 
    document.getElementById("tabFood").classList.toggle("active", type === 'food'); 
    document.getElementById("tabDrink").classList.toggle("active", type === 'drink'); 
    inputElement.value = ""; 
    renderWheel(); renderListUI(); 
} 
 
function renderWheel() { 
    let dataset = database[activeTab]; 
    let total = dataset.length; 
    ctx.clearRect(0, 0, size, size); 
    imageOverlay.innerHTML = "";  
    if (total === 0) return; 
 
    let segAngle = 2 * Math.PI / total; 
 
    for (let i = 0; i < total; i++) { 
        let startAng = i * segAngle; 
        let endAng = (i + 1) * segAngle; 
         
        ctx.beginPath(); 
        ctx.moveTo(center, center); 
        ctx.arc(center, center, center - 10, startAng, endAng); 
        ctx.fillStyle = UIColors[i % UIColors.length]; 
        ctx.fill(); 
        ctx.strokeStyle = "#1e1510"; ctx.lineWidth = 2; ctx.stroke(); 
 
        // Vẽ Text
        ctx.save(); 
        ctx.translate(center, center); 
        ctx.rotate(startAng + segAngle / 2); 
        ctx.fillStyle = "#fff";
        ctx.font = "bold 13px Segoe UI";
        ctx.textAlign = "right";
        ctx.fillText(dataset[i].name, center - 35, 5);
        ctx.restore();

        // Tạo ảnh phủ góc cho segment
        let midDeg = (i * (360 / total)) + ((360 / total) / 2);
        let imgRadius = center - 80;
        let imgX = center + imgRadius * Math.cos(midDeg * Math.PI / 180);
        let imgY = center + imgRadius * Math.sin(midDeg * Math.PI / 180);

        let imgSeg = document.createElement("div");
        imgSeg.className = "wheel-img-segment";
        imgSeg.style.left = `${imgX}px`;
        imgSeg.style.top = `${imgY}px`;
        imgSeg.innerHTML = `<img src="${dataset[i].img}" onerror="this.src='${activeTab==='food'?backupFoodImg:backupDrinkImg}'">`;
        imageOverlay.appendChild(imgSeg);
    } 
} 

// --- LOGIC XOAY VÒNG QUAY KHI ẤN NÚT (ĐÃ SỬA LỖI LỆCH KẾT QUẢ) ---
function executeSpin() {     
    const list = database[activeTab];     
    if (list.length === 0 || isSpinning) return; 
 
    isSpinning = true;     
    spinActionBtn.disabled = true; 
 
    // Tính toán góc quay ngẫu nhiên (ít nhất 4 vòng = 1440 độ + góc dư)
    const extraDeg = Math.floor(Math.random() * 360) + 1440;      
    currentDeg += extraDeg; 
 
    // Thực hiện hiệu ứng xoay bằng cách đổi transform CSS
    canvas.style.transition = "transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)";     
    canvas.style.transform = `rotate(${-currentDeg}deg)`;     
    imageOverlay.style.transition = "transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)";     
    imageOverlay.style.transform = `rotate(${-currentDeg}deg)`; 
 
    // Chạy âm thanh click mechanical
    let currentTickAngle = 0;     
    const interval = setInterval(() => {         
        currentTickAngle += 15;         
        if (currentTickAngle < extraDeg) {             
            playTickSound();         
        } else {             
            clearInterval(interval);         
        }     
    }, 40); 
 
    // Xử lý khi vòng quay dừng lại sau 4 giây
    setTimeout(() => {         
        isSpinning = false;         
        spinActionBtn.disabled = false; 
 
        // --- SỬA THUẬT TOÁN TÍNH CHÍNH XÁC Ô TRÚNG THƯỞNG TẠI ĐÂY ---
        // Góc của mỗi một ô quạt (Ví dụ: 6 ô là 60 độ/ô)
        const arcDeg = 360 / list.length;         

        // Quy đổi tổng góc quay thực tế về khoảng từ 0 đến 359 độ
        const normalizedDeg = currentDeg % 360;  

        // Kim chỉ nằm ở đỉnh (góc 270 độ). Ta tính toán góc tương đối của kim trên vòng quay sau khi dừng.
        // Công thức chuẩn: (Góc kim chỉ + Góc xoay) % 360
        const pointerTargetDeg = (270 + normalizedDeg) % 360;

        // Lấy góc mục tiêu chia cho số độ của từng ô để tìm ra index chuẩn xác nhất
        const winnerIndex = Math.floor(pointerTargetDeg / arcDeg) % list.length; 
 
        // Gán vật phẩm trúng thưởng theo đúng index vừa tính
        currentWinner = list[winnerIndex]; 
 
        // Lưu vào lịch sử nếu đã đăng nhập
        if (isLoggedIn) {             
            if (!historyList.some(h => h.name === currentWinner.name)) {                 
                historyList.unshift(currentWinner);                 
                renderFavoritesAndHistory();             
            }         
        } 
 
        // Hiển thị bảng chúc mừng trúng món ăn/thức uống
        showResultModal(currentWinner);     
    }, 4000); 
}
function showResultModal(item) {
    document.getElementById("resultCategoryText").innerText = activeTab === 'food' ? "MÓN ĐÃ CHỌN" : "NƯỚC ĐÃ CHỌN";
    document.getElementById("resultName").innerText = item.name;
    document.getElementById("resultImage").src = item.img;
    
    const favBtn = document.getElementById("favoriteBtn");
    const isFav = favorites.some(f => f.name === item.name);
    favBtn.innerText = isFav ? "💔 Hủy thích" : "❤️ Yêu thích";
    
    document.getElementById("resultModal").classList.add("open");
}

function closeResultModal() {
    document.getElementById("resultModal").classList.remove("open");
}

function toggleFavoriteCurrentWinner() {
    if(!isLoggedIn) return alert("Vui lòng đăng nhập để sử dụng tính năng này!");
    if(!currentWinner) return;

    let index = favorites.findIndex(f => f.name === currentWinner.name);
    if(index > -1) {
        favorites.splice(index, 1);
        alert("Đã xóa khỏi danh sách yêu thích.");
    } else {
        favorites.push(currentWinner);
        alert("Đã thêm vào danh sách yêu thích!");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
    showResultModal(currentWinner);
} 
 
// --- QUẢN LÝ HÀNG ĐỢI DANH SÁCH MÓN --- 
function renderListUI() { 
    let dataset = database[activeTab]; 
    listUiContainer.innerHTML = dataset.map((item, index) => `
        <div class="list-item">
            <div class="list-item-info">
                <img class="list-item-img" src="${item.img}" onerror="this.src='${activeTab==='food'?backupFoodImg:backupDrinkImg}'">
                <strong>${item.name}</strong>
            </div>
            <button onclick="removeItem(${index})">❌</button>
        </div>
    `).join(''); 
} 
 
function addNewItem() { 
    let val = inputElement.value.trim(); 
    if (!val) return; 
    let newItem = {
        name: val,
        img: activeTab === 'food' ? backupFoodImg : backupDrinkImg,
        recipe: `Món tự thêm mới.\nChưa có thông tin cập nhật cho công thức làm ${val}.`
    };
    database[activeTab].push(newItem); 
    inputElement.value = ""; 
    renderWheel(); renderListUI(); 
} 
 
function checkEnterKey(e) { if (e.key === 'Enter') addNewItem(); } 
function removeItem(idx) { database[activeTab].splice(idx, 1); renderWheel(); renderListUI(); } 
function shuffleCurrentList() { database[activeTab].sort(() => Math.random() - 0.5); renderWheel(); renderListUI(); } 
function resetToSystemDefault() { database[activeTab] = systemDefaults[activeTab].map(item => ({ ...item })); renderWheel(); renderListUI(); } 
 
// --- TRA CỨU CÔNG THỨC ---
function findRecipe() {
    let query = document.getElementById("recipeSearchInput").value.trim().toLowerCase();
    let displayArea = document.getElementById("recipeDisplayArea");
    if(!query) {
        displayArea.style.display = "none";
        return;
    }

    let allItems = [...database.food, ...database.drink];
    let match = allItems.find(item => item.name.toLowerCase().includes(query));

    if(match) {
        document.getElementById("recipeTitle").innerText = match.name;
        document.getElementById("recipeImageTag").src = match.img;
        document.getElementById("recipeContent").innerText = match.recipe || "Công thức đang được cập nhật.";
        displayArea.style.display = "block";
    } else {
        displayArea.style.display = "none";
    }
}
