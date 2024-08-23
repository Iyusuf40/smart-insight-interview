import { AutoBotsGenerator } from "./jobs/AutobotsGenerator.js";


let HOUR = 1000 * 60 * 60
let autobotsGenerator = new AutoBotsGenerator()
autobotsGenerator.generate()

setInterval(() => autobotsGenerator.generate(), HOUR)