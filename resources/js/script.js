let region = "en-US";
let ronin = "Kenji";
let multilingual = "";
let masteryData = "";
let skillValueArray = Array(15).fill(0)
let sumSkillArray = Array(3).fill(0)
let sumRed = 0, sumBlue = 0, sumGreen = 0;
let costGold = 0, costPoint = 0;
let lastVisitedSkillID = null;
let lastVisitedBranch = null;

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
    // event: change language
    const languageSelector = document.querySelector("#languageSelector")
    languageSelector.addEventListener("change", function () {
        region = this.value;
        //let search for all the text in html and change it accordingly to the region
        document.querySelector("#characterSelectorText").innerHTML 
            = multilingual[region].charSelection;
        document.querySelector("#languageSelectorText").innerHTML
            = multilingual[region].langSelection;
        for (let branch of ["Greed","Mastermind","Resistance"]) {
            document.querySelector("#title" + branch).innerHTML
                = multilingual[region][branch].masteryTitle + ":";
            const brief = document.querySelectorAll(".masteryBlock." + branch +" .masteryBranches .skillName")
            for (let i = 0; i<5; i++) {
                if (ronin=="Tomoe" && i==1 && branch!="Resistance") {
                    brief[i].innerHTML = multilingual[region][branch].skills.tomoe.briefName
                } else brief[i].innerHTML = multilingual[region][branch].skills.briefName[i]
            }
        }
        if (!lastVisitedBranch) updateMasteryDetail(null, null)
        else updateMasteryDetail(multilingual[region][lastVisitedBranch].skills, lastVisitedSkillID);
        updateTunaBot()

    })
    // event: change character
    const characterSelector = document.querySelector("#characterSelector")
    characterSelector.addEventListener("change", function() {
        ronin = this.value;
        if (ronin == "Kenji") {
            document.getElementById("red2Name").innerHTML = multilingual[region].Greed.skills.briefName[1];
            document.getElementById("blue2Name").innerHTML = multilingual[region].Mastermind.skills.briefName[1];
            if (lastVisitedSkillID)
                updateMasteryDetail(multilingual[region][lastVisitedBranch].skills, lastVisitedSkillID)
        } else if (ronin == "Tomoe") {
            document.getElementById("red2Name").innerHTML = multilingual[region].Greed.skills.tomoe.briefName;
            document.getElementById("blue2Name").innerHTML 
                = multilingual[region].Mastermind.skills.tomoe.briefName;
            if (lastVisitedSkillID==1 || lastVisitedSkillID==6) 
                updateMasteryDetail(multilingual[region][lastVisitedBranch].skills, lastVisitedSkillID)
        }
    })
    // event: adjust skill value
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
        let branchId = (i/5) | 0; // divide, result integer
        arrowLeft.addEventListener("click", function() {
            if (skillValueArray[i]>0 && sumSkillArray[branchId]>0) {
                skillValueArray[i] -= 1;
                if (!skillValueArray[i]) skillBlocks[i].classList.remove("active")
                sumSkillArray[branchId] -= 1;
                sumSkillDisplay.innerHTML = sumSkillArray[branchId] + "/30";
            }
            // update skill value display
            skillValueDisplay.innerHTML = skillValueArray[i] + "/" + masteryData[i].MAX_LEVEL;
            updateTunaBot()
        })
        arrowRight.addEventListener("click", function() {
            if (skillValueArray[i]<masteryData[i].MAX_LEVEL && sumSkillArray[branchId]<30) {
                skillValueArray[i] += 1;
                if (skillValueArray[i]) skillBlocks[i].classList.add("active")
                sumSkillArray[branchId] += 1;
                sumSkillDisplay.innerHTML = sumSkillArray[branchId] + "/30";
            }
            // update skill value display
            skillValueDisplay.innerHTML = skillValueArray[i] + "/" + masteryData[i].MAX_LEVEL;
            updateTunaBot()
        })
        // update mastery skill detail
        for (const child of skillBlocks[i].children){
            child.addEventListener("click", function () {
                lastVisitedSkillID = i;
                lastVisitedBranch = branch;
                let branchText = multilingual[region][branch].skills;
                updateMasteryDetail(branchText, i)
            })
        }
    }
    // event: reset mastery block
    const resetButtons = document.querySelectorAll(".resetButton")
    for (let i = 0; i<3; i++) {
        let branchs = ["Greed","Mastermind","Resistance"];
        resetButtons[i].addEventListener("click", function () {
            sumSkillArray[i] = 0;
            document.querySelector("#sum" + branchs[i]).innerHTML = "0/30";
            const skillValueDisplay = document.querySelectorAll(".skillValue")
            for (let j = 0; j<5; j++) {
                skillValueArray[5*i+j] = 0;
                skillValueDisplay[5*i+j].innerHTML 
                    = skillValueArray[5*i+j] + "/" + masteryData[5*i+j].MAX_LEVEL;
                skillBlocks[5*i+j].classList.remove("active")
            }
            if (lastVisitedSkillID)
                updateMasteryDetail(multilingual[region][lastVisitedBranch].skills,
                    lastVisitedSkillID);
            updateTunaBot()
        })
    }
    function updateMasteryDetail(_textObject,  _skillID) {
        let msg = null;
        if (lastVisitedSkillID == null) {
            msg = multilingual[region].masteryDetailDefault
        } else if ((_skillID==1 || _skillID==6) && ronin == "Tomoe") {
            msg = "<div><strong>"+ _textObject.tomoe.longName 
                + "</strong>: (" + skillValueArray[_skillID]
                + "/" + masteryData[_skillID].MAX_LEVEL + ")"+ "<br>"
                + _textObject.tomoe.discription[0]
                + "bonus"
                + _textObject.tomoe.discription[1]
                + "</div>"
        } else {
            msg = "<div><strong>"+ _textObject.longName[_skillID%5] 
                + "</strong> (" + skillValueArray[_skillID]
                + "/" + masteryData[_skillID].MAX_LEVEL + ")"+ "<br>"
                + _textObject.discription[_skillID%5][0]
                + "bonus"
                + _textObject.discription[_skillID%5][1]
                + "</div>"
        }
        document.getElementById("masteryDetail").innerHTML = msg
    }
    function updateTunaBot() {
        costGold = 0;
        costPoint = 0;
        for (let i = 0; i<15; i++){
            costGold += masteryData[i].REQUIRED_GOLD[skillValueArray[i]];
            costPoint += masteryData[i].REQUIRED_POINT[skillValueArray[i]]
        }
        tunaBot.innerHTML = multilingual[region].tunaBot[0] 
                + costGold + multilingual[region].tunaBot[1]
                + costPoint + multilingual[region].tunaBot[2]
    }
}).catch((err) => console.log(err))
.finally(() => console.log("after all, it is not fine as usual"));



