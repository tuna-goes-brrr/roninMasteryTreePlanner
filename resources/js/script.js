const mstrXMLhttp = new XMLHttpRequest();
mstrXMLhttp.open("GET", "");
mstrXMLhttp.onload = function () {
    const masteryTree = JSON.parse(this.responseText);
    alert(this);
};
mstrXMLhttp.send();

function updateMasteryDetail(msg) {
    document.getElementById("masteryDetail").innerHTML = msg;
}
function updateCharacter(ronin) {
    // update lại ảnh các nhánh lão luyện của từng char
    if (ronin == "Kenji") {
        document.getElementById("red2Name").innerHTML = "Speed";
        document.getElementById("blue2Name").innerHTML = "Boss DMG";
    } else if (ronin == "Tomoe") {
        document.getElementById("red2Name").innerHTML = "CRIT DMG";
        document.getElementById("blue2Name").innerHTML = "CRIT Rate";
    }
}

let skillValues = {
    red: [0, 0, 0, 0, 0];
    blue: [0, 0, 0, 0, 0];
    green: [0, 0, 0, 0, 0];
};
let skillBlocks = document.querySelectorAll('.skillBlock');
for (let i = 0; i < skillNames.length; i++) {
    skillBlocks[i].skillName.addEventListener("click", function() {
        updateMasteryDetail(skillBlocks[i].skillName.innerHTML);
    });
    skillBlocks[i].skillValue.addEventListener("click", function() {
        updateMasteryDetail(skillBlocks[i].skillName.innerHTML);
    });
}