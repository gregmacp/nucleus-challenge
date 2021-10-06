
var prices = [
    { effectiveDate: new Date(2021, 8, 1, 5, 0, 0), price: 35464.53 },
    { effectiveDate: new Date(2021, 8, 2, 5, 0, 0), price: 35658.76 },
    { effectiveDate: new Date(2021, 8, 3, 5, 0, 0), price: 36080.06 },
    { effectiveDate: new Date(2021, 8, 3, 13, 0, 0), price: 37111.11 },
    { effectiveDate: new Date(2021, 8, 6, 5, 0, 0), price: 38041.47 },
    { effectiveDate: new Date(2021, 8, 7, 5, 0, 0), price: 34029.61 },
];

const transactions = [
    { effectiveDate: new Date(2021, 8, 1, 9, 0, 0), value: 0.012 },
    { effectiveDate: new Date(2021, 8, 1, 15, 0, 0), value: -0.007 },
    { effectiveDate: new Date(2021, 8, 4, 9, 0, 0), value: 0.017 },
    { effectiveDate: new Date(2021, 8, 5, 9, 0, 0), value: -0.01 },
    { effectiveDate: new Date(2021, 8, 7, 9, 0, 0), value: 0.1 },
];


// small solution to stripping Date objects of their hours
// https://stackoverflow.com/a/29602313
Date.prototype.withoutTime = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0);
    return d;
}


function byPrice(transaction){
  //receives a transaction and calculates its value by the most recent price
  // and returns the value in pounds value, along with the price


  var q = prices.reverse();
  for (let k = 0; k < prices.length; k++) {

    if (q[k].effectiveDate <= transaction.effectiveDate ){
        current_price = q[k].price;
    }
  }

  return [(current_price * transaction.value), current_price] ;
}

function getDailyTransactions(date){
    //return transaction that happened on the given day
    // return value is an array of transactions

    var dailyTransactions = [];

    // iterate through transactions and compare them with the date
    // strip the dates of their time first because they only need to be the same day

    // tried to do this using find() but kept returning undefined.
    // tt = transactions.find(x => x.effectiveDate.withoutTime() == date.withoutTime());
    var max = transactions.length;
    for (let i = 0; i < max; i++) {
      if (+transactions[i].effectiveDate.withoutTime() == +date.withoutTime()){
        dailyTransactions.push(transactions[i]);
      }
    }
    return (dailyTransactions);
}

function  getDailyPortfolioValues() {

  var balance = 0.00;
  //desired range
  const dates = {startDate: new Date(2021, 8, 1, 0, 0), stopDate: new Date(2021, 8, 9, 0, 0)}
  console.log("Date Range: " + dates.startDate.toString() + " to " + dates.stopDate.toString());
  console.log();

    // HARDCODED RANGE
    const range = [
        new Date(2021, 8, 1),
        new Date(2021, 8, 2),
        new Date(2021, 8, 3),
        new Date(2021, 8, 4),
        new Date(2021, 8, 5),
        new Date(2021, 8, 6),
        new Date(2021, 8, 7)
    ];

    console.log("--------------")
    console.log("--------------")
    console.log("-- STARTING BALANCE: "+ balance + " --");
    range.forEach((day) => {
      // EACH DAY
      tr_daily = getDailyTransactions(day);

      console.log("")
      console.log("--------------")
      console.log("--------------")
      console.log("DAILY TRANSACTIONS FOR "+ day.toString());
      console.log(tr_daily.length + " transactions");

        // EACH TRANSACTION
        tr_daily.forEach((tr) => {
          console.log("----");
          console.log("DATE: "+tr.effectiveDate.toString());
          var btcprice = byPrice(tr);
          console.log("value (btc): "+tr.value.toString() + " at " + btcprice[1].toString() + "/btc");
          console.log("value (£): "+ btcprice[0].toString());
          console.log("----");
          balance = balance + tr.value;
        });
      console.log("balance at end of day: "+ balance + " btc");
      console.log("--------------")
      console.log("--------------")
      console.log("")
    });
  console.log("--------------")
  console.log("--------------")
  console.log("Final balance: "+ balance + " btc");
  console.log("--------------")
  console.log("END OF REPORT")
  console.log("--------------")



}

getDailyPortfolioValues();
