import { replace } from "./utils/replace.js";

export const data = {
    // -------------------------------------------------------
    // General
    // -------------------------------------------------------

    // Dollar
    labour: 175,                                           // Based on daily intake of $1400 over 8 hours. NOTE: GST is added later.

    // -------------------------------------------------------
    // Exterra
    // -------------------------------------------------------

    // Dollar
    station:  10.00,                                          // 15 stations per pack includes interceptors
    core_cap: 15.00,                                          // 12 caps per pack includes plastic shields
    bait_box: 10.00,                                          // 6 bait boxes per pack
    timber:    0.40,                                          // 200 interceptors per box
    focus:     0.20,                                          // Approximately 110 serves per 1.1kg
    requiem:  60.00,                                          // Box size of 1.5kg; 250g per bait box.

    // Meter
    spacing:   2.75,                                          // allow 2.75 meters distance per station

    // Minute
    minutes:  { 
        exterra: {
            soft: 18 / 60,
            hard: 30 / 60
        }
    },

    // Calculate Generic Costs
    get soft_station() { return this.station + this.focus; },
    get soft_renewal() { return ((data.timber * 6) + data.focus); },
    get hard_station() { return this.core_cap + (this.timber * 4) + this.focus; },
    get hard_renewal() { return ((data.timber * 4) + data.focus); },
    get site_fee()     { return this.requiem + this.labour; },

    // -------------------------------------------------------
    // Treated Zone
    // -------------------------------------------------------

    treated_zone: {
        soft:  88.00,
        hard: 110.00,
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
            let num_soft = Math.ceil(ui.meters.soft / data.spacing);
            let num_hard = Math.floor(ui.meters.hard / data.spacing);
            let duration = Math.ceil(num_soft * data.minutes.exterra.soft + num_hard * data.minutes.exterra.hard);
            let renewal  = "$0.00";
            let total    = "$0.00";

            if (num_soft + num_hard > 0) {
                // renewal cost
                let lc1 = (data.labour * 7.5) + data.site_fee; // 5 monitor visits, 1 renewal, 1.5 tpi
                let mc1 = (num_soft * data.soft_renewal) + (num_hard * data.hard_renewal);
                renewal = "$" + ((lc1 + mc1) * 1.10).toFixed(2);

                // install cost
                let lc2 = (data.labour * (duration + 5)) + (data.site_fee * 3);
                let mc2 = (num_soft * data.soft_station) + (num_hard * data.hard_station);
                total   = "$" + ((lc2 + mc2) * ui.multiplier * 1.10).toFixed(2);
            }

            let details = replace(this.details, { num_soft, num_hard, duration, renewal });

            return { details, total }
        }
    }
};