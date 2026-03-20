const today = new Date();

const date = dateFormat(new Date(),'YYYY-MM-DD');
const field = document.getElementById("deadline");
field.value = date;
field.setAttribute("min", date);

/*日程の初期値を今日にする*/
function dateFormat(today, format){
    format = format.replace("YYYY", today.getFullYear());
    format = format.replace("MM", ("0"+(today.getMonth() + 1)).slice(-2));
    format = format.replace("DD", ("0"+ today.getDate()).slice(-2));
    return format;
}



const nameInput = document.getElementById("attendeeName");
const nameResisterBtn = document.getElementById("nameResister");
const nameDeleteBtn = document.getElementById("nameDelete");
const nameListBox = document.getElementById("attendeesList");

nameResisterBtn.addEventListener("click", () => {

    const name = nameInput.value;

    fetch("addresslist.json")
        .then(res => res.json())
        .then(data => {

            const user = data.find(u => u.name === name);

            if (!user) {
                alert("名前が見つかりません");
                return;
            }

            const users = data.filter(u => u.name.includes(name));

            users.forEach(user => {
                const option = document.createElement("option");
                option.value = user.email;
                option.textContent = `${user.name}さん ${user.email}`;
                nameListBox.appendChild(option);
            });
        });
});

nameDeleteBtn.addEventListener("click", () => {
    const index = nameListBox.selectedIndex;
    nameListBox.remove(index);
});



const dateInput = document.getElementById("inputDate");
const dateResisterBtn = document.getElementById("dateResister");
const dateDeleteBtn = document.getElementById("dateDelete");
const dateListBox = document.getElementById("dateList");

dateResisterBtn.addEventListener("click", () => {
    const dateValue = dateInput.value;

    if (!dateValue) return;

    for (let option of dateListBox.options) {
        if (option.value === dateValue) {
            return;
        }
    }

    const date = new Date(dateValue);

    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const weekday = weekdays[date.getDay()];

    const option = document.createElement("option");
    option.value = dateValue;
    option.dataset.date = dateValue;

    const formatted = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} (${weekday})`;
    option.textContent = formatted;

    dateListBox.appendChild(option);
    sortDates();

});

dateDeleteBtn.addEventListener("click", () => {
    const index = dateListBox.selectedIndex;
    dateListBox.remove(index);
});

function sortDates() {

    const select = document.getElementById("dateList");
    const options = Array.from(select.options);

    options.sort((a, b) => {
        return new Date(a.dataset.date) - new Date(b.dataset.date);
    });

    select.innerHTML = "";

    options.forEach(opt => select.appendChild(opt));
}
