export function timeRangeToDisplayString(startTime, endTime){
    return `${startTime.format('LLLL')} - ${endTime.format('LT')}`;
};