const url1 = 'http://localhost:8080/'
let getUserInfo = document.getElementById("getUser")
getUser()

fetch(url1 + 'auth')
    .then(response => response.json())
    .then(user => {
        document.getElementById("adminEmail").innerHTML = user.email;
        document.getElementById("usernameAndRole").innerHTML = 'with roles: ' + user.roles.map(roleUser => roleUser.role);
    });

function getUser() {
    getUserInfo.innerHTML = ""
    fetch(url1 + 'auth')
        .then(response => response.json())
        .then(user => {
            let rows = getUserInfo.insertRow()
            rows.setAttribute("id", user.id)
            let cell0 = rows.insertCell();
            cell0.innerHTML = user.id;
            let cell1 = rows.insertCell();
            cell1.innerHTML = user.firstName;
            let cell11 = rows.insertCell();
            cell11.innerHTML = user.lastName;
            let cell2 = rows.insertCell();
            cell2.innerHTML = user.age;
            let cell3 = rows.insertCell();
            cell3.innerHTML = user.email;
            let cell5 = rows.insertCell();
            cell5.innerHTML = user.roles.map(roleUser => roleUser.role);
        })
}