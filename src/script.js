const sorts = ["all", "study", "podcast", "video"]

let elements

document.addEventListener("DOMContentLoaded", () => {
    elements = {
        categories: document.getElementsByClassName("category"),
        psychunits: document.getElementsByClassName("psych-unit"),
        noneFound: document.querySelector("[name='none-found']"),
        number: document.getElementById("results-number"),
        sortPsychUnit: document.getElementById("sort-psych-unit"),
        selected: {
            name: "all",
            element: document.querySelector("[name='all']"),
            buttons: [document.getElementById("sort-all")]
        }
    }


    updateResultsNumber()

    sorts.forEach(name => {
        const element = document.getElementById(`sort-${name}`)
        element.addEventListener("click", () => {
            select(name, "categories", element)
        })
    })

    document.querySelectorAll(".tag-selector").forEach(element => {
        element.addEventListener("click", () => {
            select(element.innerHTML, "psychunits", element)
        })
    })
})

function updateResultsNumber() {
    let amount = 0
    if (elements.selected.element != elements.noneFound) {
        amount = elements.selected.element.children.length
    }
    elements.number.innerHTML = amount
}

function findElementByName(list, name) {
    for (const element of list) {
        if (element.getAttribute("name") == name) {
            return element
        }
    }
}

function select(name, type, button) {
    if (name == elements.selected.name) {
        return
    }

    const list = elements[type = type.toLowerCase()]
    if (!list) {
        console.log(new Error("Could not find type of element"))
        return
    }

    const element = findElementByName(list, name) || elements.noneFound

    toggleClass(elements.selected.element, "is-hidden")
    toggleClass(element, "is-hidden")

    elements.selected.buttons.forEach(button => toggleClass(button, "is-active"))
    const buttons = [button]
    if (type == "psychunits") {
        buttons.push(elements.sortPsychUnit)
    }
    buttons.forEach(button => toggleClass(button, "is-active"))

    elements.selected.element = element
    elements.selected.name = name
    elements.selected.buttons = buttons

    updateResultsNumber()
}

function toggleClass(element, className) {
    element.classList.toggle(className)
}