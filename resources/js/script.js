const mstrXMLhttp = new XMLHttpRequest();
mstrXMLhttp.open("GET", "https://tuna-goes-brrr.github.io/roninMasteryTreePlanner/resources/data/masteryData.json");
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
    red: [0, 0, 0, 0, 0],
    blue: [0, 0, 0, 0, 0],
    green: [0, 0, 0, 0, 0]
};
const skillNames = document.querySelectorAll('.skillBlock .skillName');
const skillValues = document.querySelectorAll(".skillBlock .skillValue");
for (let i = 0; i < skillNames.length; i++) {
    skillNames[i].addEventListener("click", function() {
        updateMasteryDetail(this.innerHTML);
    });
    skillValues[i].addEventListener("click", function() {
        updateMasteryDetail(skillNames[i].innerHTML);
    });
}