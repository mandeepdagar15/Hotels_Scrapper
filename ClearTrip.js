const puppeteer = require('puppeteer');

let Try = async () => {
    // for shimla
   // let url = 'https://www.cleartrip.com/hotels/results?city=Shimla&state=Himachal%20Pradesh&country=IN&poi=&hotelId=&dest_code=36461&chk_in=09/04/2022&chk_out=10/04/2022&adults=2&childs=0&num_rooms=1&adults1=2&children1=0&=&hotelName=&sortBy=&poiLat=&poiLng=&';
    // for Rishikesh
   // let url = 'https://www.cleartrip.com/hotels/results?filters=&city=Rishikesh&state=Uttaranchal&country=IN&poi=Laxman%20Jhula%20Area&hotelId=&dest_code=36162&chk_in=09/04/2022&chk_out=10/04/2022&hotelName=&sortBy=&poiLat=&poiLng=&adults=2&childs=0&num_rooms=1&adults1=2&children1=0&=&';
   // for Nainital
   let url = 'https://www.cleartrip.com/hotels/results?filters=&city=Nainital&state=Uttaranchal&country=IN&poi=&hotelId=&dest_code=35334&chk_in=09/04/2022&chk_out=10/04/2022&hotelName=&sortBy=&poiLat=&poiLng=&adults=2&childs=0&num_rooms=1&adults1=2&children1=0&=&=&=&=&=&=&';
    let browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox"]
    });
    let page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    let hotels = await page.evaluate(() => {
        //bg-white br-4 ba bw-1 bs-border bc-neutral-100 flex flex-start flex-wrap tp-elevation td-200
        let items = document.querySelectorAll(".bg-white.br-4.ba.bw-1.bs-border.bc-neutral-100.flex.flex-start.flex-wrap.tp-elevation.td-200");
        //return items.length;
        var data = [];
        items.forEach(item => {
            //let name = null;
            let name = item.querySelector(".flex.flex-between.flex-bottom.m-0 h2").textContent;
            let price = item.querySelector(".fs-4.c-neutral-900.fw-600.lh-solid").textContent;
            let reviews = item.querySelector(".m-0.flex.flex-middle .c-neutral-700.ml-1.fs-2").textContent;
            data.push({ name, price, reviews })
        })
       // console.log(data)
        return data;
    });
    await browser.close();
    return hotels;

};

module.exports = {Try}