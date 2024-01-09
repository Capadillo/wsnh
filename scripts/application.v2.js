// --------------------------------------------------
// User Input
// --------------------------------------------------

function get_input() {
    return {
        meters: {
            soft: new Number($('#meters_soft').val()),
            hard: new Number($('#meters_hard').val())
        },
        multiplier: new Number($('#multiplier').val()),
        options: {
            subfloor: {
                piers: $('#subfloor_piers').is(':checked'),
                external_wall: $('#subfloor_external_wall').is(':checked')
            }
        }
    };
}

function copiedFlashMessage(message) {
    $("#flash").html(message);

    $("#flash").fadeIn(function() {
        setTimeout(function() { $("#flash").fadeOut(); }, 2500);
    });
}

// --------------------------------------------------
// Pre-Load
// --------------------------------------------------

// Import components.
import "./components/spinner.js";

// Import utilities.
import { clipboard } from "./utils/clipboard.js";

// Import the options from the options folder.
import exterra from "./options/exterra.js";
import treated_zone from "./options/treated-zone.js";

// Add the options to the options array.
const options = [ exterra, treated_zone ];

// --------------------------------------------------
// Load
// --------------------------------------------------

function load() {
    for (let option of options) {
        // Get the html from the template script.
        let temp_raw = $("#template_option").html();

        // Convert the html into actual usable html.
        let temp = $(temp_raw);

        // Change the parent key to the specified key.
        $(temp).attr('id', option.id);
        $(temp).find(`[data-key=title]`).html(option.title);

        // Get the updated values from the option.
        let values = option.update(get_input());

        for (let [ key, value ] of Object.entries(values)) {
            $(temp).find(`[data-key=${key}]`).html(value);
        }

        // append to main body of page
        $("main").append(temp);
    }


}

function update(e) {
    const user_input = get_input();
    //console.log('triggered!', e);

    for (let option of options) {
        // Get the updated values from the option.
        let values = option.update(user_input);

        for (let [ key, value ] of Object.entries(values)) {
            $(`#${option.id}`).find(`[data-key=${key}]`).html(value);
        }
    }
}

$(function() {
    load();
    update();
    $('input').on('change keyup input', update);

    // --------------------------------------------------
    // Register Button Functionality
    // --------------------------------------------------

    $("article header button:nth-of-type(1)").on('click', function(e) {
        const article = $(e.target).parents("article");
        const section = article.find("div");
        section.toggleClass("expanded");
    });

    $("article header button:nth-of-type(2)").on('click', function(e) {
        const article = $(e.target).parents("article");
        const section = article.find("[data-key=overview]");
        copiedFlashMessage("Copied Overview!");
        clipboard(section.text());
    });

    $("article header button:nth-of-type(3)").on('click', function(e) {
        const article = $(e.target).parents("article");
        const section = article.find("[data-key=details]");
        copiedFlashMessage("Copied Breakdown!");
        clipboard(section.text());
    });
})
