const url = 'http://localhost:8080/admin/'
let userRoles =[]
let getUsers = document.getElementById("getUsers")
let getUserInfo = document.getElementById("getUser")
getUserRoles()
getAllUsers()
getUser()

fetch(url + 'auth')
    .then(response => response.json())
    .then(user => {
        document.getElementById("adminEmail").innerHTML = user.email;
        document.getElementById("usernameAndRole").innerHTML = 'with roles: ' + user.roles.map(roleUser => roleUser.role);
    });

function getAllUsers() {
    getUsers.innerHTML = ""
    fetch(url + 'allUsers')
        .then(response => response.json())
        .then(users => {
            users.forEach(function (user) {
                let row = getUsers.insertRow()
                row.setAttribute("id", user.id)
                let cell0 = row.insertCell();
                cell0.innerHTML = user.id;
                let cell1 = row.insertCell();
                cell1.innerHTML = user.firstName;
                let cell11 = row.insertCell();
                cell11.innerHTML = user.lastName;
                let cell2 = row.insertCell();
                cell2.innerHTML = user.age;
                let cell3 = row.insertCell();
                cell3.innerHTML = user.email;
                let cell5 = row.insertCell();
                cell5.innerHTML = user.roles.map(roleUser => roleUser.role);
                let cell6 = row.insertCell();
                cell6.innerHTML =
                    '<button type="button" onclick="getEdit(' + user.id + ')" '
                    + 'class="btn btn-info" data-toggle="modal" data-target="#editUser">Edit</button>';
                let cell7 = row.insertCell();
                cell7.innerHTML =
                    '<button type="button" onclick="getDelete(' + user.id + ')" '
                    + 'class="btn btn-danger" data-toggle="modal" data-target="#deleteUser">Delete</button>';
            })
        })
}

// function addUser() {
//     let selected = []
//     for (let option of document.getElementById('addRole').options)
//     {
//         if (option.selected) {
//             selected.push(option.value);
//         }
//     }
//     fetch(url + 'add', {
//         method: 'POST',
//         headers: {
//             "Content-Type" : "application/json; charset=UTF-8"
//         },
//         body: JSON.stringify({
//             firstName: document.getElementById('addFirstName').value,
//             lastName: document.getElementById('addLastName').value,
//             age: document.getElementById('addAge').value,
//             email: document.getElementById('addEmail').value,
//             password: document.getElementById('addPassword').value,
//             roles: addRoleForUser(selected)
//         })
//     })
//         //.then(response => response.json())
//         .then(() => {
//             document.getElementById('addFirstName').value = ''
//             document.getElementById('addLastName').value = ''
//             document.getElementById('addAge').value = ''
//             document.getElementById('addEmail').value = ''
//             document.getElementById('addPassword').value = ''
//             document.getElementById('addRole').value = ''
//             getAllUsers()
//         })
// }

function getUserRoles() {
    fetch(url + 'allRoles')
        .then(response => response.json())
        .then(data => {
            userRoles = data
        })
}

function addRoleForUser(role = []) {
    let userRol = []
    if (role[0] === "1" && role[1] === "2") {
        userRol.push(userRoles[0])
        userRol.push(userRoles[1])
        return userRol
    } else if (role[0] === "1") {
        userRol.push(userRoles[0])
        return userRol
    } else {
        userRol.push(userRoles[1])
        return userRol
    }
}

function getDelete(id) {
    fetch(url + 'user/' + id)
        .then(response => response.json())
        .then(user => {
            $('#delId').val(user.id)
            $('#delFirstName').val(user.firstName)
            $('#delLastName').val(user.lastName)
            $('#delAge').val(user.age)
            $('#delEmail').val(user.email)
            $('#delRole').val(user.roles.map(roleUser => roleUser.role))
        })
}

function deleteUser() {
    let id = document.getElementById('delId').value
    fetch(url + 'delete/' + id, {
        method: 'DELETE'
    })
        .then(() => {
            getAllUsers();
            $('#deleteUser').modal('hide');
        })
}

function getEdit(id) {
    fetch(url + 'user/' + id)
        .then(response => response.json())
        .then(user => {
            $('#editId').val(user.id)
            $('#editFirstName').val(user.firstName)
            $('#editLastName').val(user.lastName)
            $('#editAge').val(user.age)
            $('#editEmail').val(user.email)
        })
}

function editUser() {
    let selected = []
    for (let option of document.getElementById('addRole').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    fetch(url + 'edit/', {
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            id: document.getElementById('editId').value,
            firstName: document.getElementById('editFirstName').value,
            lastName: document.getElementById('editLastName').value,
            age: document.getElementById('editAge').value,
            email: document.getElementById('editEmail').value,
            password: document.getElementById('editPassword').value,
            roles: addRoleForUser(selected)
        })
    })
        .then(() => {
            document.getElementById('editPassword').value = ''
            document.getElementById('editRole').value = ''
            getAllUsers();
            $('#editUser').modal('hide');
        })
}

function getUser() {
    getUserInfo.innerHTML = ""
    fetch(url + 'auth')
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

function addUser() {
    let selected = []
    $(document).ready(function () {
        $("#addUserForm").validate({
            messages: {

                firstName: {
                    required: "Please enter your first name"
                },
                lastName: {
                    required: "Please enter your last name"
                },
                age: {
                    required: "Please enter your age"
                },
                email: {
                    required: "Please enter your email address"
                },
                password: {
                    required: "Please enter your password"
                },
                roles: {
                    required: "Please choose at least one role"
                }
            },
            rules: {
                firstName: "required",
                lastName: "required",
                age: "required",

                email: {
                    required: true,
                    email: true,
                },
                password: "required",
                roles: "required",
            },

        });
        if ($("#addUserForm").valid()) {
            for (let option of document.getElementById('addRole').options) {
                if (option.selected) {
                    selected.push(option.value);
                }
            }
            fetch(url + 'add', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    firstName: document.getElementById('addFirstName').value,
                    lastName: document.getElementById('addLastName').value,
                    age: document.getElementById('addAge').value,
                    email: document.getElementById('addEmail').value,
                    password: document.getElementById('addPassword').value,
                    roles: addRoleForUser(selected)
                })
            })
                .then(() => {
                    document.getElementById('addFirstName').value = ''
                    document.getElementById('addLastName').value = ''
                    document.getElementById('addAge').value = ''
                    document.getElementById('addEmail').value = ''
                    document.getElementById('addPassword').value = ''
                    document.getElementById('addRole').value = ''
                    getAllUsers()
                })

        } else {
            console.log("something's wrong")
        }
    })

}


