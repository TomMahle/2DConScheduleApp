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
});
