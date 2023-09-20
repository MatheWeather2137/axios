
async function getData(){
    const data = await fetch("http://192.168.15.4/kontynent")
    const json = await data.json()
    console.log(json)

    document.getElementById("menu").innerHTML = ""

    for(let i=0; i>=json.length-1; i++){
        const div = document.createElement("div")
        div.classList.add("kont")

        const checkbox = document.createElement("input")
        checkbox.setAttribute("type","checkbox")
        div.appendChild("checkbox")
        
    }
}
getData()