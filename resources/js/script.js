let region = "vi-VN";
let multilingual = "";
let masteryData = "";
let skillValueArray = Array(15).fill(0)
let sumRed = 0, sumBlue = 0, sumGreen = 0;
let costGold = 0, costPoint = 0;

// const promise1 = fetch("./resources/data/lang.json", {mode: "no-cors"}).then(r => r.json())
// const promise2 = fetch("./resources/data/masteryData.json", {mode: "no-cors"}).then(r => r.json())
const promise1 = fetch("https://tuna-goes-brrr.github.io/roninMasteryTreePlanner/resources/data/lang.json")
.then(r => r.json())
const promise2 = fetch("https://tuna-goes-brrr.github.io/roninMasteryTreePlanner/resources/data/masteryData.json")
.then(r => r.json())
Promise.all([promise1,promise2])
.then((res) => {
    // mastery data and multilingual text fetched successfully
    multilingual = res[0];
    masteryData = res[1];
    // event change character
    const characterSelector = document.querySelector("#characterSelector")
    characterSelector.addEventListener("change", function() {
        if (this.value == "Kenji") {
            document.getElementById("red2Name").innerHTML = multilingual[region].Greed.skills.briefName[1];
            document.getElementById("blue2Name").innerHTML = multilingual[region].Mastermind.skills.briefName[1];
        } else if (this.value == "Tomoe") {
            document.getElementById("red2Name").innerHTML = multilingual[region].Greed.skills.tomoe.briefName;
            document.getElementById("blue2Name").innerHTML 
                = multilingual[region].Mastermind.skills.tomoe.briefName;
        }
    })
    // event update mastery detail in detail box
    // event adjust skill value
    const skillBlocks = document.querySelectorAll(".skillBlock")
    const tunaBot = document.querySelector("#tunaBot")
    for (let i = 0; i < skillBlocks.length; i++) {
        let branch = "";
        if (i<5) {
            branch = "Greed";
        } else if (i<10) {
            branch = "Mastermind";
        } else if (i<15) {
            branch = "Resistance";
        }
        const sumSkillDisplay = document.querySelector("#sum" + branch)
        const skillValueDisplay = skillBlocks[i].querySelector(".skillValue")
        const arrowLeft = skillBlocks[i].querySelector(".arrowLeft")
        const arrowRight = skillBlocks[i].querySelector(".arrowRight")
        arrowLeft.addEventListener("click", function() {
            
            let sum = 0;
            if (i<5) {
                sum = sumRed
            } else if (i<10) {
                sum = sumBlue
            } else if (i<15) {
                sum = sumGreen
            }
            if (skillValueArray[i]>0 && sum>0) {
                skillValueArray[i] -= 1;
                costGold -= masteryData[i].REQUIRED_GOLD[skillValueArray[i]];
                costPoint -= masteryData[i].REQUIRED_POINT[skillValueArray[i]];
                if (i<5) {
                    sumRed -= 1;
                    sumSkillDisplay.innerHTML = sumRed + "/30";
                } else if (i<10) {
                    sumBlue -= 1;
                    sumSkillDisplay.innerHTML = sumBlue + "/30";
                } else if (i<15) {
                    sumGreen -= 1;
                    sumSkillDisplay.innerHTML = sumGreen + "/30";
                }
            }
            // update skill value display
            skillValueDisplay.innerHTML = skillValueArray[i] + "/" + masteryData[i].MAX_LEVEL;
            tunaBot.innerHTML = multilingual[region].tunaBot[0] 
                + costGold + multilingual[region].tunaBot[1]
                + costPoint + multilingual[region].tunaBot[2]
        })
        arrowRight.addEventListener("click", function() {
            let sum = 0;
            if (i<5) {
                sum = sumRed
            } else if (i<10) {
                sum = sumBlue
            } else if (i<15) {
                sum = sumGreen
            }
            if (skillValueArray[i]<masteryData[i].MAX_LEVEL && sum<30) {
                costGold += masteryData[i].REQUIRED_GOLD[skillValueArray[i]];
                costPoint += masteryData[i].REQUIRED_POINT[skillValueArray[i]];
                skillValueArray[i] += 1;
                if (i<5) {
                    sumRed += 1;
                    sumSkillDisplay.innerHTML = sumRed + "/30";
                } else if (i<10) {
                    sumBlue += 1;
                    sumSkillDisplay.innerHTML = sumBlue + "/30";
                } else if (i<15) {
                    sumGreen += 1;
                    sumSkillDisplay.innerHTML = sumGreen + "/30";
                }
            }
            // update skill value display
            skillValueDisplay.innerHTML = skillValueArray[i] + "/" + masteryData[i].MAX_LEVEL;
            tunaBot.innerHTML = multilingual[region].tunaBot[0] 
                + costGold + multilingual[region].tunaBot[1]
                + costPoint + multilingual[region].tunaBot[2]
        })
        
        // update mastery skill detail
        for (const child of skillBlocks[i].children){
            child.addEventListener("click", function () {
                let branchText = multilingual[region][branch];
                updateMasteryDetail(
                    branchText.skills.longName[i%5] + " (" 
                    + skillValueArray[i]
                    + "/" + masteryData[i].MAX_LEVEL + ")"+ "<br>"
                    + branchText.skills.discription[i%5][0]
                    + "bonus"
                    + branchText.skills.discription[i%5][1])
            })
        }
    }
}).catch((err) => console.log(err))
.finally(() => console.log("after all, it is not fine as usual"));

function updateMasteryDetail(msg) {
    document.getElementById("masteryDetail").innerHTML = msg;
}

