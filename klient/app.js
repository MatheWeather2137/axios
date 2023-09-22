const menu = document.getElementById("menu")
const content = document.getElementById("content")
const aha = document.getElementById("checkboxes")

async function getData(){
    const data = await fetch("http://localhost:3001/kon")
    const json = await data.json()
    console.log(json)

    for(let i=0; i>=json.length-1; i++){
        const div = document.createElement("div")
        div.setAttribute("id","divv")
        menu.appendChild(div)
        
        const checkbox = document.createElement("input")
        checkbox.setAttribute("type","checkbox")
        checkbox.classList.add("input_checkbox")
        checkbox.setAttribute("name","continent")
        checkbox.setAttribute("value",`${json[i].continent}`)
        checkbox.setAttribute("id",`continent${i}`)
        
        const label = document.createElement("label")
        label.setAttribute("for",`continent${i}`)
        label.innerHTML = document.getElementById(`continent${i}`).value

        div.appendChild(checkbox)
        div.appendChild(label)        
    }
}
getData()