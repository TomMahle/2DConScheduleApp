//This shouldn't be bundled
//Yay it isn't!
import * as chai from 'chai';
import * as dateHelper from'./dateHelper';
import moment from 'moment';

var should = chai.should();

describe('dateHelper', function() {

  it('should parse dates into a readable format', function() {
    dateHelper.timeRangeToDisplayString(
        moment('2016-07-14T11:00:00'),
        moment('2016-06-04T13:00:00')
    ).should.equal('Thursday, July 14, 2016 11:00 AM - 1:00 PM');    
  });

  it('should know when an event is in the past', function() {
    //Current time is july 14th, 2016 at 11 AM
    dateHelper.setCurrentDateTimeProvider(
      () => moment('2016-07-14T11:00:00') 
    );
    //In the past, false
    dateHelper.isWithinXHours(
        moment('2016-07-13T11:30:00'),
        1
    ).should.equal(false);    
  });

  it('should know when an event is within the next hour', function() {
    
    //Current time is july 14th, 2016 at 11 AM
    dateHelper.setCurrentDateTimeProvider(
      () => moment('2016-07-14T11:00:00')
    );

    //Within time frame, true
    dateHelper.isWithinXHours(
        moment('2016-07-14T11:30:00'),
        1
    ).should.equal(true);    
  });

  it('should know when an event is exactly an hour away', function(){
    //Current time is july 14th, 2016 at 11 AM
    dateHelper.setCurrentDateTimeProvider(
      () => moment('2016-07-14T11:00:00') 
    );

    //Edge of time frame, true
    dateHelper.isWithinXHours(
        moment('2016-07-14T12:00:00'),
        1
    ).should.equal(true);
  });
    

  it('should know when an event is more than an hour in the future', function() {
    
    //Current time is july 14th, 2016 at 11 AM
    dateHelper.setCurrentDateTimeProvider(
      () => moment('2016-07-14T11:00:00') 
    );
    //Too far in the future, false.
    dateHelper.isWithinXHours(
        moment('2016-07-16T18:00:00'),
        1
    ).should.equal(false);
  });
});