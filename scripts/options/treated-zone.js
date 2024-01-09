import { replace } from "../utils/replace.js";

// --------------------------------------------------
// Constants
// --------------------------------------------------

// install variables
const time = {
    soft_ground:  5 / 60,
    hard_ground: 10 / 60
};

// --------------------------------------------------
// onUpdate
// --------------------------------------------------

function calcpiers(length, extwall = false)
{
    let quarter = Math.floor((length / 4) / 2);           // get the length of one wall
    let per_row = quarter + (extwall ? -1 : 1);     // add 1 if theres no external wall, remove one if there is an external wall
    return Math.pow(per_row, 2);                    // multiply the piers per row by itself
}

function onUpdate(ui) {
    // stations
    const soft_cost = 55;
    const hard_cost = 77;

    let total_meters = ui.meters.soft + ui.meters.hard;
    let soft_ground = 0;
    let hard_ground = 0;

    if (total_meters > 0) {=
        if (ui.options.subfloor.piers && !ui.options.subfloor.external_wall) {
            soft_ground = calcpiers(total_meters) * soft_cost;
        }

        if (ui.options.subfloor.piers && ui.options.subfloor.external_wall) {
            soft_ground = calcpiers(total_meters, true) * soft_cost;
            soft_ground+= (total_meters + ui.meters.soft) * soft_cost;
            hard_ground = ui.meters.hard * hard_cost;
        }

        if (!ui.options.subfloor.piers && ui.options.subfloor.external_wall) {
            soft_ground = (total_meters + ui.meters.soft) * soft_cost;
            hard_ground = ui.meters.hard * hard_cost;
        }

        if (!ui.options.subfloor.piers && !ui.options.subfloor.external_wall) {
            soft_ground = ui.meters.soft * soft_cost;
            hard_ground = ui.meters.hard * hard_cost;
        }
    }

    // return data
    return { total: (((soft_ground + hard_ground) * ui.multiplier) * 1.10).toFixed(2) };
}

// --------------------------------------------------
// Proposal
// --------------------------------------------------

export default {
    id: "treated-zone",
    title: "(WIP) Treated Zone",
    overview: "Installation of a treated zone to the perimeter of the structure.",
    details: "Please refer to the product label for details on installation requirements.",
    total: "${[total]}",

    update: function(ui) {
        const { duration, total } = onUpdate(ui);

        return {
            overview: replace(this.overview),

            details: this.details,

            total: replace(this.total, { total })
        };
    }
};