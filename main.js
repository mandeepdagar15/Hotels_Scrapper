
const booking = require('./Booking.com');
const cleartrip = require('./ClearTrip');
 const fs = require('fs');
 const path = require('path');
 
 let wholeData = [];

 let bookingData = booking.Try();

 bookingData.then((data) => {
     console.log("Data from booking.com")
     //console.log(data)
    data.forEach(element => {
         wholeData.push(element)
    });
     console.log(`-------------------------------------*****----------------------`);

 }).catch(err => {
    console.log("Error in booking.com data", err);
 })

 let cleartripData = cleartrip.Try();
 cleartripData.then((data) => {
     console.log("Data from cleartrip.com")
   //  console.log(data)
     data.forEach(element => {
         wholeData.push(element)
     });
     console.log(`-------------------------------------*****----------------------`);
    
}).catch(err => {
     console.log("Error in booking.com data", err);
 })

 let p = Promise.all([bookingData,cleartripData]);

 const cb =  () => {
    // console.log(wholeData);
    fs.writeFileSync('./extractedData.json',JSON.stringify(wholeData));
      return   fs.promises.readFile('./extractedData.json');
      
  }

 p.then(cb).then((data)=>{
    // let data = fs.readFileSync('./extractedData.json')
     console.log(''+data);
    console.log(data.length)
     data = JSON.parse(data)
     let sum = 0;
     data.forEach((item)=>{
          let price = item['price'];
          price = price.slice(1)
         let a = price.split(',');
          let oprice = a[0]+a[1];
         oprice = parseInt(oprice);
         // price = parseInt(price);
          console.log(oprice)
       
    // //      sum = data.reduce((acc,op)=>{
    // //         acc =  acc + op
    // //         return acc;
    // //    },0)
        sum += oprice;
         
         
     })
     console.log(`sum is ${sum}`)
     console.log("Number of hotels = "+data.length)
     let avg = sum/data.length
      avg = avg.toFixed(0)
     console.log(`avg price is ${avg}`)
    
     let finalArr = [];
     data.forEach((item)=>{
         let price = item['price'];
          price = price.slice(1)
          let a = price.split(',');
          let op = a[0]+a[1];
          op = parseInt(op);
    
          if(op<avg){
              finalArr.push(item);
            
          }
          fs.writeFileSync('./finalResult.json',JSON.stringify(finalArr))
     })
 }).catch(err => {
     console.log("Error occured in promise.all")
})

//   let data = fs.readFileSync('./extractedData.json')
// console.log(''+data);
//  console.log(data.length)
// data = JSON.parse(data)
// let sum = 0;
// data.forEach((item)=>{
//      let price = item['price'];
//      price = price.slice(1)
//      let a = price.split(',');
//      let oprice = a[0]+a[1];
//      oprice = parseInt(oprice);
//     // price = parseInt(price);
//      console.log(oprice)
   
// //      sum = data.reduce((acc,op)=>{
// //         acc =  acc + op
// //         return acc;
// //    },0)
//    sum += oprice;
     
     
// })
// console.log(`sum is ${sum}`)
// console.log("Number of hotels = "+data.length)
// let avg = sum/data.length
//  avg = avg.toFixed(0)
// console.log(`avg price is ${avg}`)

// data.forEach((item)=>{
//     let price = item['price'];
//      price = price.slice(1)
//      let a = price.split(',');
//      let op = a[0]+a[1];
//      op = parseInt(op);

//      if(op<avg){
//          fs.appendFileSync('./finalResult.json',''+item)
//      }
// })

