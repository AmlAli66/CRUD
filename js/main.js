
var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var saveBtn = document.getElementById("saveBtn");
var listBody = document.getElementById("listBody")
var sitesList;

if (localStorage.getItem('list') != null) {
    sitesList = JSON.parse(localStorage.getItem('list'));
    display()

}
else {
    sitesList = []
}
saveBtn.onclick = function () {
    if (validateSiteName() && validateSiteURL()) {
        addSiteFun();
        clearForm();
        display();
    } else {
        alert(`Site Name or Url is not valid, Please follow the rules below :
        -Site name must contain at least 3 characters
        -Site URL must be a valid one`);
    }
};
function addSiteFun() {
    var siteObj = {
        sName: siteName.value,
        sURL: siteURL.value
    }
    sitesList.push(siteObj);
    localStorage.setItem('list', JSON.stringify(sitesList))
}

function clearForm() {
    siteName.value = ''
    siteURL.value = ''
}

function display(list = sitesList) {
    var box = '';
    for (var i = 0; i < list.length; i++) {
        box += `
        <div class="col-12 ">
            <div class="list-body d-flex bg-white bg-opacity-50 py-2 text-center  fs-5 border-bottom border-dark ">
                <div class="col-3">
                    <div class="index">
                        <p class="m-0">${i + 1}</p>
                    </div>
                </div>
                <div class="col-3">
                    <div class="site-name">
                        <p class=" m-0">${list[i].sName}</p>
                    </div>
                </div>
                <div class="col-3">
                    <div class="visit">
                        <a href="${list[i].sURL}" class="btn  visit-btn"  target="_blank" ><i class="fas fa-eye "></i></a>
                    </div>
                </div>
                <div class="col-3">
                    <div class="delete">
                        <a class="btn btn-danger delete-btn" onclick="deleteFun(${i})"><i class="fas fa-trash-alt"></i></a>
                    </div>
                </div>
            </div>
        </div>
        `
    }
    listBody.innerHTML = box
}

function deleteFun(index) {
    sitesList.splice(index, 1)
    localStorage.setItem('list', JSON.stringify(sitesList))
    display()
}

function validateSiteName() {
    var validateName = siteName.value.trim();
    return validateName.length >= 3;
}

function validateSiteURL() {
    var validateUrl = siteURL.value.trim();
    return validateUrl.startsWith("http://") || validateUrl.startsWith("https://");
}