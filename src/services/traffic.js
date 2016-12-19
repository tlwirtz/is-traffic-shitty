import request from 'superagent'
import jsonp from 'superagent-jsonp'

const WSDOT_URL = 'http://wsdot.com/Traffic/api/TravelTimes/TravelTimesREST.svc'
const ACCESS_CODE = process.env.WSDOT_ACCESS_CODE || '10a60c16-25f1-49c3-bcbe-b83f01e77f7e'

const getTravelTimes = () => {
  request.get(`${WSDOT_URL}/GetTravelTimesAsJson?AccessCode=${ACCESS_CODE}`)
  .use(jsonp) // must use jsonp unless we make the call from a proxy server
  .end((err, res) => {
    if (err) return null
    console.log(res.body)
    return res.body
  })
}

export default getTravelTimes
