const requestMstr = new XMLHttpRequest();
requestMstr.open("GET", "https://tuna-goes-brrr.github.io/roninMasteryTreePlanner/resources/data/masteryData.json");
requestMstr.onreadystatechange = function() {
    if(requestMstr.readyState === XMLHttpRequest.DONE && requestMstr.status === 200) {
        const masteryTree = JSON.parse(this.responseText);
    }
}
requestMstr.send();
const requestLang = new XMLHttpRequest();
requestLang.open("GET", "https://tuna-goes-brrr.github.io/roninMasteryTreePlanner/resources/data/lang.json");
requestLang.onreadystatechange = function() {
    if(requestLang.readyState === XMLHttpRequest.DONE && requestLang.status === 200) {
        alert("load success");
        const multilingual = JSON.parse(this.responseText);
    }
}
requestLang.send()

let region = "en-US";
let skillValue = {
    red: [0, 0, 0, 0, 0],
    blue: [0, 0, 0, 0, 0],
    green: [0, 0, 0, 0, 0]
}

function updateMasteryDetail(msg) {
    document.getElementById("masteryDetail").innerHTML = msg;
}

const ele = document.querySelector("#characterSelector");
ele.addEventListener("change", function () {
    alert(this.value);
    if (this.value == "Kenji") {
        document.getElementById("red2Name").innerHTML = multilingual[region].greed.skills.shortname[1];
        document.getElementById("blue2Name").innerHTML = multilingual[region].mastermind.skills.shortname[1];
    } else if (this.value == "Tomoe") {
        document.getElementById("red2Name").innerHTML = multilingual[region].greed.tomoe.skills.shortname[1];
        document.getElementById("blue2Name").innerHTML = multilingual[region].mastermind.tomoe.skills.shortname[1];
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