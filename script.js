// https://tuna-goes-brrr.github.io/roninMasteryTreePlanner/resources/data/lang.json
// https://tuna-goes-brrr.github.io/roninMasteryTreePlanner/resources/data/masteryData.json

const fetchData = async () => {
    try {
        const res = await Promise.all(
            [fetch("./resources/data/lang.json", {mode: "no-cors"}),
            fetch("./resources/data/masteryData.json", {mode: "no-cors"})]
        )
        const data = await Promise.all(res.map(r => r.json()))
        console.log(data)
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}

const doSomething = async () => {
    const response = await fetchData()
    console.log("even more: ", response)
}

doSomething()