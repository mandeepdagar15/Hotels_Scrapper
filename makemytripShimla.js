const puppeteer = require('puppeteer');

let Try = async ()=>{
    let url = 'https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1BCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQHoAQGIAgGoAgO4ApaL8pEGwAIB0gIkNDQ3M2UwYzYtYzk4YS00ZmQ3LWIwMDYtZDIzZWYyZDMzNTJh2AIF4AIB&lang=en-gb&sid=9e0e0c5a56b06f0a0114ffa048f10a7a&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.en-gb.html%3Flabel%3Dgen173nr-1BCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQHoAQGIAgGoAgO4ApaL8pEGwAIB0gIkNDQ3M2UwYzYtYzk4YS00ZmQ3LWIwMDYtZDIzZWYyZDMzNTJh2AIF4AIB%3Bsid%3D9e0e0c5a56b06f0a0114ffa048f10a7a%3Btmpl%3Dsearchresults%3Bclass_interval%3D1%3Bdest_id%3D4127%3Bdest_type%3Dregion%3Bdtdisc%3D0%3Binac%3D0%3Bindex_postcard%3D0%3Blabel_click%3Dundef%3Boffset%3D0%3Bpostcard%3D0%3Braw_dest_type%3Dregion%3Broom1%3DA%252CA%3Bsb_price_type%3Dtotal%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrpvid%3D1762774cbb07015f%3Bss_all%3D0%3Bssb%3Dempty%3Bsshis%3D0%26%3B&ss=Goa&is_ski_area=0&ssne=Goa&ssne_untouched=Goa&dest_id=4127&dest_type=region&checkin_year=2022&checkin_month=5&checkin_monthday=17&checkout_year=2022&checkout_month=5&checkout_monthday=18&group_adults=2&group_children=0&no_rooms=1&from_sf=1&sr_change_search=2';
       let browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox"]
    });
    let page = await browser.newPage();
    await page.goto(url,{waitUntil: "networkidle0"});
    let hotels = await page.evaluate(()=> {
        let items = document.querySelectorAll('._fe1927d9e');
        data=[]
        items.forEach(item=>{
            let name=null,rating=null,price=null;
            if(item.querySelector('.fde444d7ef')){
                name = item.querySelector('.fde444d7ef').textContent;
                if(item.querySelector('._9c5f726ff.bd528f9ea6'))
                    rating = item.querySelector('._9c5f726ff.bd528f9ea6').textContent;  
                if(item.querySelector('.fde444d7ef._e885fdc12'))   
                    price = item.querySelector('span.fde444d7ef._e885fdc12').textContent;
                    data.push({name:name,rating:rating,price:price});
            }
        })
        return data;
    });
    await browser.close();
    console.log(hotels);
};
Try();