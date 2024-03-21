const RED_MASTERY = {
    ATK: [[300, 3300, 15300, 43300, 100300, 199300, 359300, 599300, 929300, 1389300, 1999300, 2799300, 3819300, 5089300, 6649300],
        [1, 4, 9, 16, 25, 36, 49, 64, 81, 101, 123, 147, 173, 201, 231]],
    SPEED: [[300, 3300, 15300, 43300, 100300, 199300, 359300, 599300, 929300, 1389300], 
        [1, 4, 9, 16, 25, 36, 49, 64, 81, 101]],
    EQUIP: [[2500, 29500, 131500, 401500, 941500], 
        [3, 12, 27, 49, 77]]
};
const BLUE_MASTERY = {
    CF: [[300, 2300, 7300, 17300, 36300, 68300, 117300, 197300, 297300, 427300, 617300, 877300, 1227300, 1697300, 2307300],
        [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 67, 81, 97, 115, 135]],
    BOSS: [[300, 2300, 7300, 17300, 36300, 68300, 117300, 197300, 297300, 427300],
        [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]],
    STUN: [[1000, 10000, 40000, 130000, 340000],
        [2, 7, 15, 27, 45]]
};
const GREEN_MASTERY = {
    HP: [[300, 2300, 7300, 21300, 53300, 114300, 219300, 389300, 629300, 949300, 1419300, 2009300, 2739300, 3659300, 4759300],
        [1, 3, 6, 11, 18, 27, 38, 51, 66, 83, 103, 124, 146, 170, 195]],
    POSTURE: [[300, 2300, 7300, 21300, 53300, 114300, 219300, 389300, 629300, 949300],
        [1, 3, 6, 11, 18, 27, 38, 51, 66, 83]],
    HEAL: [[1000, 17000, 89000, 299000, 699000],
        [2, 9, 22, 42, 66]]
};
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
let skillBlocks = document.querySelectorAll('.skillBlock');
for (let i = 0; i < skillNames.length; i++) {
    skillBlocks[i].skillName.addEventListener("click", function() {
        updateMasteryDetail(skillBlocks[i].skillName.innerHTML);
    });
    skillBlocks[i].skillValue.addEventListener("click", function() {
        updateMasteryDetail(skillBlocks[i].skillName.innerHTML);
    });
}