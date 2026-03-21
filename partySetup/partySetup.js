// =========================
// 初期設定（日付）
// =========================
const today = new Date();

function dateFormat(date, format) {
    format = format.replace("YYYY", date.getFullYear());
    format = format.replace("MM", ("0" + (date.getMonth() + 1)).slice(-2));
    format = format.replace("DD", ("0" + date.getDate()).slice(-2));
    return format;
}

const todayStr = dateFormat(today, 'YYYY-MM-DD');

const deadlineInput = document.getElementById("deadline");
deadlineInput.value = todayStr;
deadlineInput.setAttribute("min", todayStr);

// =========================
// DOM取得
// =========================
const nameInput = document.getElementById("attendeeName");
const nameRegisterBtn = document.getElementById("nameRegister");
const nameDeleteBtn = document.getElementById("nameDelete");
const nameListBox = document.getElementById("attendeesList");

const dateInput = document.getElementById("inputDate");
const dateRegisterBtn = document.getElementById("dateRegister");
const dateDeleteBtn = document.getElementById("dateDelete");
const dateListBox = document.getElementById("dateList");

// =========================
// 参加者データ（1回だけ取得）
// =========================
let addressData = [];

fetch("addresslist.json")
    .then(res => res.json())
    .then(data => {
        addressData = data;
    })
    .catch(() => {
        alert("住所録の読み込みに失敗しました");
    });

// =========================
// 参加者登録
// =========================
nameRegisterBtn.addEventListener("click", () => {

    const name = nameInput.value.trim();

    if (!name) {
        alert("名前を入力してください");
        return;
    }

    const users = addressData.filter(u => u.name.includes(name));

    if (users.length === 0) {
        alert("名前が見つかりません");
        return;
    }

    users.forEach(user => {

        // 重複チェック
        const exists = Array.from(nameListBox.options)
            .some(opt => opt.value === user.email);

        if (exists) return;

        const option = document.createElement("option");
        option.value = user.email;
        option.textContent = `${user.name}さん (${user.email})`;

        nameListBox.appendChild(option);
    });

    nameInput.value = "";
});

// =========================
// 参加者削除
// =========================
nameDeleteBtn.addEventListener("click", () => {

    const index = nameListBox.selectedIndex;

    if (index === -1) {
        alert("削除する対象を選択してください");
        return;
    }

    nameListBox.remove(index);
});

// =========================
// 日付登録
// =========================
dateRegisterBtn.addEventListener("click", () => {

    const dateValue = dateInput.value;

    if (!dateValue) {
        alert("日付を選択してください");
        return;
    }

    // 重複チェック
    const exists = Array.from(dateListBox.options)
        .some(opt => opt.value === dateValue);

    if (exists) return;

    const date = new Date(dateValue);

    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const weekday = weekdays[date.getDay()];

    const option = document.createElement("option");
    option.value = dateValue;
    option.dataset.date = dateValue;

    option.textContent =
        `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} (${weekday})`;

    dateListBox.appendChild(option);

    sortDates();
});

// =========================
// 日付削除
// =========================
dateDeleteBtn.addEventListener("click", () => {

    const index = dateListBox.selectedIndex;

    if (index === -1) {
        alert("削除する日付を選択してください");
        return;
    }

    dateListBox.remove(index);
});

// =========================
// 日付ソート
// =========================
function sortDates() {

    const options = Array.from(dateListBox.options);

    options.sort((a, b) => {
        return new Date(a.dataset.date) - new Date(b.dataset.date);
    });

    dateListBox.innerHTML = "";

    options.forEach(opt => dateListBox.appendChild(opt));
}