const sorts = ["all", "study", "podcast", "video"]

let elements

document.addEventListener("DOMContentLoaded", () => {
    $(".featured-articles-slider").slick({
        accessibility: false,
        infinite: true,
        arrows: false,
        centerMode: true,
        variableWidth: true,
        initialSlide: 0,
        draggable: false,
        swipe: false,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 8000
    })

    elements = {
        categories: document.getElementsByClassName("category"),
        psychunits: document.getElementsByClassName("psych-unit"),
        noneFound: document.querySelector("[name='none-found']"),
        number: document.getElementById("results-number"),
        sortPsychUnit: document.getElementById("sort-psych-unit"),
        clearSearchButton: document.getElementById("clear-search"),
        searchField: document.querySelector("#search input"),
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

    document.querySelector("#search button").addEventListener("click", () => {
        let keywords = []

        const value = elements.searchField.value.toLowerCase()
        if (value.length > 0) {
            keywords = value.split(" ")
        }

        search(keywords)
    })
    document.querySelector("#search .button.is-text").addEventListener("click", () => resetSearch())

    document.querySelector(".left-arrow i").addEventListener("click", () => $(".featured-articles-slider").slick("slickPrev"))
    document.querySelector(".right-arrow i").addEventListener("click", () => $(".featured-articles-slider").slick("slickNext"))
})

function updateResultsNumber() {
    let amount = 0
    if (elements.selected.element != elements.noneFound) {
        for (const child of elements.selected.element.children) {
            if (!child.classList.contains("is-hidden")) {
                amount++
            }
        }
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
    resetSearch()

    if (name == elements.selected.name) {
        return
    }

    const list = elements[type = type.toLowerCase()]
    if (!list) {
        console.log(new Error("Could not find type of element"))
        return
    }

    const element = findElementByName(list, name) || elements.noneFound

    elements.selected.element.classList.add("is-hidden")
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

function removeNoSearchResults() {
    elements.noneFound.classList.add("is-hidden")
}

function resetSearch() {
    for (const child of elements.selected.element.children) {
        child.classList.remove("is-hidden")
    }
    updateResultsNumber()
    removeNoSearchResults()
    elements.clearSearchButton.classList.add("is-hidden")
    elements.searchField.value = ""
}

function search(keywords) {
    if (keywords.length == 0) {
        resetSearch()
        return
    }

    let hidden = 0
    for (const child of elements.selected.element.children) {
        const searchString = child.getAttribute("search")
        for (let i = 0; i < keywords.length; i++) {
            const keyword = keywords[i]
            if (searchString.indexOf(keyword) == -1) {
                hidden++
                if (!child.classList.contains("is-hidden")) {
                    toggleClass(child, "is-hidden")
                    break
                }
            }
        }
    }

    if (hidden == elements.selected.element.children.length) {
        elements.noneFound.classList.remove("is-hidden")
    } else {
        removeNoSearchResults()
    }

    elements.clearSearchButton.classList.remove("is-hidden")
    updateResultsNumber()
}

function toggleClass(element, className) {
    element.classList.toggle(className)
}