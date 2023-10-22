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
        overview: "An Exterra Termite Baiting System will be installed around the perimeter of the structure. Each bait station will be placed no more than 3 meters apart, and will be monitored every 8 to 12 weeks over a 12 month cover period.<br>\n<br>\nIf any stations become active during the cover period: Requiem termite bait will be applied to the station and service visits will increase in frequency to 2 to 4 weeks until termite activity has ceased.<br>\n<br>\nIf termites enter the structure during the cover period: An above ground bait box will be placed at the point of activity and checked every 2 to 4 weeks until termite activity has ceased.<br>\n<br>\nAt the end of the cover period: a timber pest inspection and renewal of the system is required at an additional cost. A system renewal includes cleaning and replacing additives in all stations as well as replacing any damaged stations. NOTE: Excess damage to the stations may incur additional costs.",
        details: "The mimimum number of stations to be installed to the perimeter of the structure is {[num_soft]} in ground stations and {[num_hard]} in concrete stations over a {[duration]} hour period.<br>\n<br>\nWhere in ground stations are installed; a hole will be dug out using a hand auger, drill-based auger, or post digger and a bait station will be installed into the hole, flush with the soil around the station. The bait station includes a child-safe twist top lid.<br>\n<br>\nIf core cuts are required; an electric core drill will be used to drill a hole through the concrete / tiles / pavers to the dirt below and a slip-resistant cap will be inserted to cover the hole. Access to water and electricity is required. If an above ground station is installed: a bait box will be placed at the point of activity and using No More Gaps, Black Tape, and / or Screws to adhere the station to the area of activity.<br>\n<br>\nThe estimated cost of renewal, including a timber pest inspection, is {[renewal]}.",
        total: "",

        update: function(ui) {
            const stations  = exterra.calculate_stations(ui.meters);
            const duration  = exterra.calculate_duration(stations);
            const labour    = exterra.calculate_labour(duration + 5);
            const materials = stations.soft * exterra.soft + stations.hard * exterra.hard;
            const site_fee  = (exterra.requiem + COST_PER_HOUR) * 3;

            const total = ((labour + materials + site_fee) * ui.multiplier) * 1.10;

            return {
                details: replace(this.details, {
                    num_soft: stations.soft,
                    num_hard: stations.hard,
                    duration: duration,
                    renewal: "$" + Math.max(total / 2, 1650).toFixed(2)
                }),

                total: "$" + total.toFixed(2)
            };
        }
    }
};