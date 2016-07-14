import moment from 'moment';

export function timeRangeToDisplayString(startTime, endTime){
    return `${startTime.format('LLLL')} - ${endTime.format('LT')}`;
};

let getCurrentDateTime = moment;

export function setCurrentDateTimeProvider(func){
    getCurrentDateTime = func;
}

//checks to see if the time being passed in is within the number of hours of the current time.
export function isWithinXHours(time, hours){
    const currentTime = getCurrentDateTime();
    const edgeTime = getCurrentDateTime().add(hours, 'hours');
    return !time.isAfter(edgeTime) && time.isAfter(currentTime);
}