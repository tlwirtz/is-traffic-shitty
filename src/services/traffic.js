import request from 'superagent';
import jsonp from 'superagent-jsonp';

const WSDOT_URL = 'https://wsdot.com/Traffic/api/TravelTimes/TravelTimesREST.svc';
const ACCESS_CODE = import.meta.env.WSDOT_ACCESS_CODE || '10a60c16-25f1-49c3-bcbe-b83f01e77f7e';

const getTravelTimes = () => {
  return new Promise((resolve, reject) => {
    request
      .get(`${WSDOT_URL}/GetTravelTimesAsJson?AccessCode=${ACCESS_CODE}`)
      .use(jsonp({ timeout: 3000, callback: 'isTrafficShittyCallback' }))
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res.body);
      });
  });
};

export default getTravelTimes;
