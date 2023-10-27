"use strict";

// --------------------------------------------------
// Import Components
// --------------------------------------------------

import "./components/spinner.js";

import { clipboard } from "./utils/clipboard.js";

import { options } from "./options.js";

// --------------------------------------------------
// Update Function
// --------------------------------------------------

function get_user_input() {
    return {
        meters: {
            soft: new Number($('#meters_soft').val()),
            hard: new Number($('#meters_hard').val())
        },
        multiplier: new Number($('#multiplier').val())
    };
}

function load() {
    for (let key in options) {
        let option = options[key];

        let temp = $( $("#template_option").html() );

        // update the id to reference easier
        $(temp).attr('id', key);

        ["title", "overview", "details", "total"].forEach(item => {
            if (item in option) {
                $(temp).find(`[data-key=${item}]`).html(option[item]);
            }
        });

        // append to main body of page
        $("main").append(temp);
    }

    $("article header button:nth-of-type(1)").on('click', function(e) {
        const article = $(e.target).parents("article");
        const section = article.find("div");
        section.toggleClass("expanded");
    });

    $("article header button:nth-of-type(2)").on('click', function(e) {
        const article = $(e.target).parents("article");
        const section = article.find("[data-key=overview]");
        clipboard(section.text());
    });

    $("article header button:nth-of-type(3)").on('click', function(e) {
        const article = $(e.target).parents("article");
        const section = article.find("[data-key=details]");
        clipboard(section.text());
    });

    $('input[type="range"]').on('change', (e) => {
        let newVal = e.target.value;
        let negNewVal = -1 * newVal;
    
        let rangeText = $('.range-text');
        rangeText.css('left', (newVal + '%')); //Set range left position
        rangeText.css('transform', 'translate(' + negNewVal + '%, 2px)'); //Set range translate to correct
        rangeText.html(newVal); //Set range text equal to input position
    })
}

function update() {
    const ui = get_user_input();

    for (let id in options) {
        if ("update" in options[id]) {
            let option = options[id].update(ui);
            
            Object.keys(option).forEach(key => {
                $(`#${id}`).find(`[data-key=${key}]`).html(option[key]);
            });
        }
    }
}

// --------------------------------------------------
// Run the Module
// --------------------------------------------------

$(function() {
    load();
    update();
    $('input').on('change keyup input', update);
})