const XMLhttp = new XMLHttpRequest();
XMLhttp.open("GET", "https://tuna-goes-brrr.github.io/roninMasteryTreePlanner/resources/data/masteryData.json");
XMLhttp.onload = function () {
    const masteryTree = JSON.parse(this.responseText);
    alert(this);
}
XMLhttp.send();
XMLhttp.open("GET", "https://tuna-goes-brrr.github.io/roninMasteryTreePlanner/resources/data/lang.json");
XMLhttp.onload = function () {
    const lang = JSON.parse(this.responseText);
    alert(this);
}
XMLhttp.send();

let region = "en-US";
let skillValue = {
    red: [0, 0, 0, 0, 0],
    blue: [0, 0, 0, 0, 0],
    green: [0, 0, 0, 0, 0]
}

function updateMasteryDetail(msg) {
    document.getElementById("masteryDetail").innerHTML = msg;
}

const ele = document.querySelector(".characterSelector");
ele.addEventListener("change", function () {
    if (this == "Kenji") {
        document.getElementById("red2Name").innerHTML = lang[region].greed.skills.shortname[1];
        document.getElementById("blue2Name").innerHTML = lang[region].mastermind.skills.shortname[1];
    } else if (ronin == "Tomoe") {
        document.getElementById("red2Name").innerHTML = lang[region].greed.tomoe.skills.shortname[1];
        document.getElementById("blue2Name").innerHTML = lang[region].mastermind.tomoe.skills.shortname[1];
    }
});

const skillNames = document.querySelectorAll('.skillBlock .skillName');
const skillValues = document.querySelectorAll(".skillBlock .skillValue");
for (let i = 0; i < skillNames.length; i++) {
    skillNames[i].addEventListener("click", function() {
        updateMasteryDetail(this.innerHTML)
    });
    skillValues[i].addEventListener("click", function() {
        updateMasteryDetail(skillNames[i].innerHTML)
    });
}