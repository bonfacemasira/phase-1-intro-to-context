// Your code here
const createEmployeeRecord = function(details) {
    return {
        firstName: details[0],
        familyName: details[1],
        title: details[2],
        payPerHour: details[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function (rawData) {
    return rawData.map(function(details){
        return createEmployeeRecord(details)
    })
}

const createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt (hour, 10),
        date,
    })
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt (hour, 10),
        date,
    })
    return employee;
}

function hoursWorkedOnDate(employee, dateSort) {
    let timeIn = employee.timeInEvents.find(function(event){
        return event.date === dateSort;
    })
    let timeOut = employee.timeOutEvents.find(function(event){
        return event.date === dateSort;
    })
    if(timeIn && timeOut){
        return (timeOut.hour - timeIn.hour)/100
    }
    else{
        return 0
    }
}

const wagesEarnedOnDate = function(employee, dateSort){
  let hours = hoursWorkedOnDate(employee, dateSort)
  return hours * employee.payPerHour
}

let allWagesFor = function(employee){
  let eligibleDates = employee.timeInEvents.map(function(e){
      return e.date
    })
    let payable = eligibleDates.reduce(function(memo,d){
      return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
  }
let findEmployeeByFirstName = function(scrArray, first){
  return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
let calculatePayroll =function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo,rec){
      return memo + allWagesFor(rec)
    },0)
  }