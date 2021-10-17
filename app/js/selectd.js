'use strict';

/**
 * ==========================================================================
 * selectd
 * A lightweight JavaScript snippet for create and manage custom HTML <select>.
 * by Stefano Iachetta - https://github.com/stfn00
 * ==========================================================================
 */

class Selectd {

    /**
     * Constructor
     */
    constructor(args) {

        /**
         * Settings
         */
        this.settings = Object.assign({
            selector: '.selectd',
            debug: false
        }, args)

        /**
         * Vars
         */
        this.cs = document.querySelectorAll(this.settings.selector)
        this.csLength = this.cs.length
        this.currSelectElem = null
        this.itemSelected = null
        this.optionsList = null
        this.optionItem = null

        /**
         * Init
         */
        this.init()

        document.addEventListener('click', this.closeAllSelect)
    }



    /**
     * Init
     */
    init() {
        for (let i = 0; i < this.csLength; i++) {
            this.currSelectElem = this.cs[i].getElementsByTagName('select')[0]
            // Check if select is disabled
            if (this.currSelectElem.disabled) {
                this.cs[i].classList.add('selectd--disabled')
            }
            const currSelectElemLength = this.currSelectElem.length
            // For each element, create a new DIV that will act as the selected item:
            this.itemSelected = document.createElement('DIV')
            this.itemSelected.setAttribute('class', 'selectd-container')
            if (this.currSelectElem.selectedIndex != -1) {
                this.itemSelected.innerHTML = this.currSelectElem.options[this.currSelectElem.selectedIndex].innerHTML
            } else {
                this.itemSelected.innerHTML = this.currSelectElem.options[0].innerHTML
            }
            this.cs[i].appendChild(this.itemSelected)
            // For each element, create a new DIV that will contain the option list:
            this.optionsList = document.createElement('DIV')
            this.optionsList.setAttribute('class', 'selectd-items selectd-items--hide')

            let multiSelected = []

            for (let j = 1; j < currSelectElemLength; j++) {
                /**
                 * For each option in the original select element,
                 * create a new DIV that will act as an option item:
                 */
                this.optionItem = document.createElement('DIV')
                this.optionItem.setAttribute('class', 'selectd-items__item')
                this.optionItem.innerHTML = this.currSelectElem.options[j].innerHTML
                if (this.currSelectElem.options[j].disabled) {
                    this.optionItem.classList.add('selectd-items__item--disabled')
                }
                if (this.currSelectElem.options[j].hidden) {
                    this.optionItem.classList.add('selectd-items__item--hidden')
                }

                this.optionItem.addEventListener('click', (el) => {
                    /**
                     * When an item is clicked, update the original select box,
                     * and the selected item:
                     */
                    let elem = el.target
                    let select = elem.parentNode.parentNode.getElementsByTagName('select')[0]
                    let selectLength = select.length
                    let selectSelected = elem.parentNode.previousSibling

                    for (let i = 0; i < selectLength; i++) {
                        if (select.options[i].innerHTML == elem.innerHTML) {
                            if (select.multiple) {
                                if (select.options[i].selected == true) {
                                    select.options[i].selected = false
                                    multiSelected = multiSelected.filter(item => item != elem.innerHTML)
                                    elem.classList.remove('selectd-items__item--active')
                                    this.traceClick('rm', select, elem.innerHTML, multiSelected)
                                } else {
                                    select.options[i].selected = true
                                    multiSelected.push(elem.innerHTML)
                                    elem.classList.add('selectd-items__item--active')
                                    this.traceClick('add', select, elem.innerHTML, multiSelected)
                                }
                                selectSelected.innerHTML = multiSelected.join(', ')
                            } else {
                                select.selectedIndex = i
                                selectSelected.innerHTML = elem.innerHTML
                                multiSelected[0] = elem.innerHTML 
                                const y = elem.parentNode.getElementsByClassName('selectd-items__item--active')
                                const yl = y.length
                                for (let k = 0; k < yl; k++) {
                                    y[k].classList.remove('selectd-items__item--active')
                                }
                                elem.classList.add('selectd-items__item--active')
                                this.traceClick('add', select, elem.innerHTML, multiSelected)
                            }
                            break;
                        }
                    }
                    selectSelected.click()
                })
                this.optionsList.appendChild(this.optionItem)
            }

            this.cs[i].appendChild(this.optionsList)

            this.itemSelected.addEventListener('click', (e) => {
                /**
                 * When the select box is clicked, close any other select boxes,
                 * and open/close the current select box:
                 */
                e.stopPropagation()
                this.closeAllSelect(e.target)
                e.target.nextSibling.classList.toggle('selectd-items--hide')
                e.target.classList.toggle('selectd-container--active')
            })
        }
    }



    closeAllSelect(elem) {
        /**
         * A function that will close all select boxes in the document,
         * except the current select box:
         */
        let arrNo = []
        const items = document.getElementsByClassName('selectd-items')
        const container = document.getElementsByClassName('selectd-container')
        const itemsLength = items.length
        const containerLength = container.length

        for (let i = 0; i < containerLength; i++) {
            if (elem == container[i]) {
                arrNo.push(i)
            } else {
                container[i].classList.remove('selectd-container--active')
            }
        }

        for (let i = 0; i < itemsLength; i++) {
            if (arrNo.indexOf(i)) {
                items[i].classList.add('selectd-items--hide')
            }
        }
    }



    traceClick(action, select, innerHTML, multiSelected) {
        if (this.settings.debug) {
            console.log('')
            console.log(' --- ')
            console.log(select)
            console.log(action, innerHTML, ' => ', multiSelected)
            console.log(' --- ')
            console.log('')
        }
    }
}
