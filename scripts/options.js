import { replace } from "./utils/replace.js";

const COST_PER_HOUR = 1400 / 8;                             // Based on an budget of $1400 per 8 hour period.

const exterra = {
    SPACING: 3.00,
    MINUTES_PER_SOFT_STATION: 20 / 60,
    MINUTES_PER_HARD_STATION: 30 / 60,

    station:  10.00,
    core_cap: 15.00,
    bait_box: 10.00,
    timber:    0.40,
    focus:     0.20,
    requiem:  60.00,

    get soft (){ return this.station + this.focus },
    get hard (){ return this.core_cap + (this.timber * 4) + this.focus },
    get fee  (){ return this.requiem + (COST_PER_HOUR * 1.25) },

    calculate_stations: function(meters) {
        return {
            soft: Math.ceil(meters.soft / this.SPACING), 
            hard: Math.floor(meters.hard / this.SPACING),
        };
    },

    calculate_duration: function(stations) {
        let minutes_soft = stations.soft * this.MINUTES_PER_SOFT_STATION;
        let minutes_hard = stations.hard * this.MINUTES_PER_HARD_STATION;

        return Math.ceil(minutes_soft + minutes_hard);
    },

    calculate_labour: function(duration) {
        return Number(duration * COST_PER_HOUR);
    },
};

// -------------------------------------------------------
// Proposal Options
// -------------------------------------------------------

export const options = {
    "exterra": {
        title: "Exterra",
        overview: "EXTERRA In-ground Stations are placed in the ground around the exterior of the structure at intervals not exceeding 3 meters. It may be necessary to form holes in slabs, pavers or asphalt to place In-concrete Stations. In addition, Above-ground Stations are placed directly on areas where live termites are located and considered to be feeding.<br>\n<br>\nEXTERRA Stations are inspected no more than 12 weeks apart. During inspections of unbaited stations, the timber Interceptors are visually inspected. When termite activity is discovered in a Station, REQUIEM Termite Bait is added. REQUIEM is placed in the vacant cavity at the center of the Station in contact with the Interceptors<br>\n<br>\nREQUIEM Baited Stations are re-inspected every 2-6 weeks. Stations are continually replenished in order to make sure that REQUIEM bait is always present in the Station.<br>\n<br>\nWhen termite feeding in an In-ground Station has been absent for a period of time, the Station (and any remaining bait) is removed. The Station is cleaned out and fresh Interceptors and Focus Termite Attractant is added.<br>\n<br>\nThis proposal is for a 12-month cover period only. The estimated cost for renewal, including a Timber Pest Inspection, is approximately ${[renewal]}.<br>\n<br>\n* Actual price may vary.",
        details: "Minimum EXTERRA Stations to be installed are:<br>\n<br>\n• {[num_soft]} In-ground Stations<br>\n• {[num_hard]} In-concrete Stations<br>\n<br>\nAbove-ground Stations are installed as required and is included in the above costs.<br>\n<br>\nThe total installation time is expected to be {[duration]} hours. Actual time may vary depending on the conditions at time of installation.<br>\n<br>\n* Access to eletricity and water may be required.",
        total: "${[total]}",

        update: function(ui) {
            const stations  = exterra.calculate_stations(ui.meters);
            const duration  = exterra.calculate_duration(stations);
            const labour    = exterra.calculate_labour(duration + 5);
            const materials = stations.soft * exterra.soft + stations.hard * exterra.hard;
            const site_fee  = (exterra.requiem + COST_PER_HOUR) * 3;

            const total = ((labour + materials + site_fee) * ui.multiplier) * 1.10;

            return {
                overview: replace(this.overview, {
                    renewal: Math.max(total / 2, 1650).toFixed(2)
                }),

                details: replace(this.details, {
                    num_soft: stations.soft,
                    num_hard: stations.hard,
                    duration: duration 
                }),

                total: replace(this.total, {
                    total: total.toFixed(2)
                })
            };
        }
    }
};