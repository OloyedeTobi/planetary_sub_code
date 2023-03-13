const { parse } = require("csv-parse");
const fs = require("fs");

const result  = [];
const parser = parse({comment: "#", columns: true});
const isHabbitable = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6
}

fs.createReadStream("kepler_stream.csv")
    .pipe(parser).on("data", (data) => {
        if(isHabbitable(data)){
            result.push(data);
        }
    })
    .on("error", (err) =>{
        console.log(err);
    })
    .on("end", () =>{
        console.log(`${result.length} HABITABLE PLANETS FOUND!`)
        console.log(result);
    });