const elements = {
    selectedName: "all"
}

document.addEventListener("DOMContentLoaded", () => {
    elements.categories = document.getElementsByClassName("category")
    elements.psychUnits = document.getElementsByClassName("psych-unit")

    elements.current = document.querySelector("[name='all']")
    bind("sort-all", () => select("all", "categories"))
    bind("sort-studies", () => select("study", "categories"))
    bind("sort-podcasts", () => select("podcast", "categories"))
    bind("sort-videos", () => select("video", "categories"))
})

function bind(elementId, func) {
    document.getElementById(elementId).addEventListener("click", func)
}

function findElementByName(list, name) {
    for (const element of list) {
        if (element.getAttribute("name") == name) {
            return element
        }
    }
}

function select(name, type) {
    if (name == elements.selectedName) {
        return
    }

    const list = elements[type.toLowerCase()]
    if (!list) {
        console.log(new Error("Could not find type of element"))
        return
    }

    if (elements.current) {
        toggleClass(elements.current, "is-hidden")
    }

    elements.selectedName = name

    const element = findElementByName(list, name)
    if (!element) {
        //TODO - make nothing found element show
        console.log(new Error("Could not find element by name"))
        return
    }

    toggleClass(element, "is-hidden")
    elements.current = element
}

function toggleClass(element, className) {
    element.classList.toggle(className)
}