export function displayDatesForEvent(event){
    const {
        startTime,
        endTime
    } = event;
    return `${startTime.format('LLLL')} - ${endTime.format('LT')}`;
};