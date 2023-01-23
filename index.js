var current_time  = document.querySelector("#current_time"),
menuSelect = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button"),
content = document.querySelector("#column")

let alarmtime , is_Ring= false,

alarm_tone = new Audio("soft_tone.mp3");

for(let i = 12; i>0 ; i--){
    if(i<10){
        i = "0" + i;
    }
    let option = `<option value="${i}">${i}</option>`
    menuSelect[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for(let i = 59; i>=0 ; i--){
    if(i<10){
        i = "0" + i;
    }
    let option = `<option value="${i}">${i}</option>`
    menuSelect[1].firstElementChild.insertAdjacentHTML("afterend", option)
}


for(let i = 2;i>0;i--){
    let ampm = i==1 ? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`
    menuSelect[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


setInterval(() => {
    const datee = new Date();
    let hour = datee.getHours();
    let min = datee.getMinutes();
    let sec = datee.getSeconds();
    let day = "AM"


    if(hour>=12){
        day="PM";
    }
    if(hour==0){
        hour = 12;
    }
    if(hour > 12){
        hour = hour-12;
    }
    if((hour < 10)){
        hour = "0" + hour;
    }
    if((min < 10) ){
        min = "0" + min;
    }
    if( (sec < 10) ){
        sec = "0"+sec;
    }
    
    current_time.innerText = hour +" : " + min + " : " +sec +" " + day;

    if(alarmtime== `${hour} : ${min} ${day}`) {
        alarm_tone.play();
        alarm_tone.loop=true;
        console.log("ringsssss........")
        
    }

}, 1000);


function setAlarm(){

    if(is_Ring){
        alarmtime=""
        alarm_tone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm"
        return is_Ring = false;
    }

    let time = `${menuSelect[0].value} : ${menuSelect[1].value} ${menuSelect[2].value}`

    
    if( (time.includes("Hours")) || (time.includes("Minutes")) || (time.includes("AM/PM")) ){
        return alert("Enter the valid time to set the alarm");
    }
    
    is_Ring= true
    alarmtime=time;
    content.classList.add("disable")
    setAlarmBtn.innerText = "Clear Alarm"
}


setAlarmBtn.addEventListener("click", setAlarm);

