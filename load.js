import http from 'k6/http';
import { sleep } from 'k6';

// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
  stages: [
    { duration: '3m', target: 100 }, 
    { duration: '3m', target: 100 }, 
    { duration: '1m', target: 0 } 
  ],
  thresholds: {
    'http_req_duration': ['p(95)<10000'] 
  }
};

export default function () {
  http.get('https://reqres.in/');
  sleep(1);
}

export function handleSummary(data) {
    return {
      "load-testing.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }
  
