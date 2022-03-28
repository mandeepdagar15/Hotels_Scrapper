const puppeteer = require('puppeteer');

let Try = async ()=>{
    //for shimla
   // let url = 'https://www.booking.com/searchresults.en-gb.html?ss=Shimla&ssne=Shimla&ssne_untouched=Shimla&label=gen173nr-1BCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQHoAQGIAgGoAgO4ApaL8pEGwAIB0gIkNDQ3M2UwYzYtYzk4YS00ZmQ3LWIwMDYtZDIzZWYyZDMzNTJh2AIF4AIB&sid=9e0e0c5a56b06f0a0114ffa048f10a7a&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=-2111367&dest_type=city&checkin=2022-04-09&checkout=2022-04-10&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure';
    // for rishikesh
  //  let url = 'https://www.booking.com/searchresults.en-gb.html?ss=Rish%C4%ABkesh%2C+Uttarakhand%2C+India&ssne=Shimla&ssne_untouched=Shimla&label=gen173nr-1BCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQHoAQGIAgGoAgO4ApaL8pEGwAIB0gIkNDQ3M2UwYzYtYzk4YS00ZmQ3LWIwMDYtZDIzZWYyZDMzNTJh2AIF4AIB&sid=9e0e0c5a56b06f0a0114ffa048f10a7a&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=-2109472&dest_type=city&ac_position=0&ac_click_type=b&ac_langcode=en&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=ab4f448413a30196&checkin=2022-04-09&checkout=2022-04-10&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure';
    // for Nainital
    let url = 'https://www.booking.com/searchresults.en-gb.html?ss=Nainital%2C+Uttarakhand%2C+India&ssne=Rish%C4%ABkesh&ssne_untouched=Rish%C4%ABkesh&label=gen173nr-1BCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQHoAQGIAgGoAgO4ApaL8pEGwAIB0gIkNDQ3M2UwYzYtYzk4YS00ZmQ3LWIwMDYtZDIzZWYyZDMzNTJh2AIF4AIB&sid=9e0e0c5a56b06f0a0114ffa048f10a7a&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=-2105459&dest_type=city&ac_position=0&ac_click_type=b&ac_langcode=en&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=16523c9377f700a3&checkin=2022-04-09&checkout=2022-04-10&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure';
       let browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox"]
    });
    let page = await browser.newPage();
    await page.goto(url,{waitUntil: "networkidle0"});
    let hotels = await page.evaluate(()=> {
        let items = document.querySelectorAll('._fe1927d9e');
        //return items.length;
        data=[]
        items.forEach(item=>{
            let name=null,rating=null,price=null;
            if(item.querySelector('.fde444d7ef')){
                name = item.querySelector('.fde444d7ef').textContent;
                if(item.querySelector('._9c5f726ff.bd528f9ea6'))
                    reviews = item.querySelector('._4abc4c3d5._1e6021d2f._6e869d6e0').textContent;  
                if(item.querySelector('.fde444d7ef._e885fdc12'))   
                    price = item.querySelector('span.fde444d7ef._e885fdc12').textContent;
                    data.push({name,price,reviews});
            }
        })
        return data;
    });
    await browser.close();
    return hotels
};

module.exports={Try}