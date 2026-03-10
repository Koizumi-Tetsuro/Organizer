const resisterInput = document.getElementById("resisterName");
const resisterButton = document.getElementById("resister");
const deleteButton = document.getElementById("delete");
const selectBox = document.getElementById("attendeesList");

resisterButton.addEventListener("click", () => {

    const name = resisterInput.value;

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
                selectBox.appendChild(option);
            });
        });
});

deleteButton.addEventListener("click", () => {
    const index = selectBox.selectedIndex;
    selectBox.remove(index);
});