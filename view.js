document.addEventListener('DOMContentLoaded', () => {
    loadRecords()
    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        addRecord();
    });

});

function loadRecords() {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
        if (xhr.status == 200) {
            displayRecords(JSON.parse(xhr.responseText));
        }
    }
    xhr.open("GET", "pi.php", true);
    xhr.send()
}
//function for adding a record 

function addRecord() {
    const name = document.getElementById('name').value;
    const disease = document.getElementById('disease').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    const request = new XMLHttpRequest();

    const data = `name=${name}&disease=${disease}&description=${description}&date=${date}`;
    request.open("POST", "pi.php", true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(data);

    request.onload = function () {
        if (request.status == 200) {
            console.log(request.responseText);
            // Fetch the data after adding the record
            loadRecords();
        } else {
            console.log("error")
        }
    }
}
//function for displaying 
function displayRecords(records) {
    var recordList = document.getElementById('recordList');
    recordList.innerHTML = '';
    records.forEach(function (record) {
        var recordDiv = document.createElement('div');
        recordDiv.setAttribute("class", "m-5 px-4")
        recordDiv.innerHTML = `
            <p>Latest drug updates <p>
            <p class="mt-5">ID: ${record.id}</p>
            <p class="mt-5">Name: ${record.name}</p>
            <p class="mt-5">Disease: ${record.disease}</p>
            <p class="mt-5">Description: ${record.description}</p>
            <p class="mt-5">Date: ${record.date}</p>
            <button  class="mt-5 bg-purple-500 h-10 w-32 rounded-lg" onclick="editRecord(${record.id})">Edit Record</button>
            <button  class="mt-5 bg-red-500 h-10 w-32 rounded-lg ml-24" onclick="deleteRecord(${record.id})">Delete Record</button>
            <hr>
        `;
        recordList.appendChild(recordDiv);
    });
};

//function for deleting

function deleteRecord(id) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                loadRecords();
            } else {
                console.error('Failed to delete record.');
            }
        }
    };
    xhr.open('DELETE', 'pi.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('id=' + id);
}

//Function for making it editable 
function editRecord(id) {
    const ajax = new XMLHttpRequest();

    ajax.onload = function () {
        if (ajax.status == 200) {
            const records = JSON.parse(ajax.responseText);

            records.forEach((record) => {
                if (record.id == id) {
                    document.getElementById("recordId").value = record.id;
                    document.getElementById("editName").value = record.name;
                    document.getElementById("editDisease").value = record.disease;
                    document.getElementById("editDescription").value = record.description;
                    document.getElementById("editDate").value = record.date;
                    document.getElementById("form").style.display = "none";
                    document.getElementById("editForm").style.display = "block";
                }
            })
        }
    }

    ajax.open("GET", "pi.php", true);
    ajax.send();
}
//
document.getElementById("editForm").addEventListener("submit", (e) => {
    e.preventDefault()
    updateRecord()
})

//updating the new record

function updateRecord() {
    const id = document.getElementById("recordId").value;
    const name = document.getElementById("editName").value
    const disease = document.getElementById("editDisease").value
    const description = document.getElementById("editDescription").value
    const date = document.getElementById("editDate").value

    const data = `id=${id}&name=${name}&disease=${disease}&description=${description}&date=${date}`;

    const ajax = new XMLHttpRequest()

    ajax.onload = function (){
        if (ajax.status == 200){
            loadRecords()
        }
    }

    ajax.open("PUT", "pi.php", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send(data);
}