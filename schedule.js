const resisterInput = document.getElementById("resisterDate");
const resisterButton = document.getElementById("resister");
const deleteButton = document.getElementById("delete");
const selectBox = document.getElementById("dateList");

resisterButton.addEventListener("click", () => {
    const dateValue = resisterInput.value;

    if (!dateValue) return;

    for (let option of selectBox.options) {
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

    selectBox.appendChild(option);
    sortDates();

});

deleteButton.addEventListener("click", () => {
    const index = selectBox.selectedIndex;
    selectBox.remove(index);
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