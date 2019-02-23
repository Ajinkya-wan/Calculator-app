import {APPCONFIG} from '../config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class  OperationServiceService {

  private baseURL = APPCONFIG.apiURL;
  _headers = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {
  }

  _saveOperation(question, answer) {

    const url = '/calculate/operations'
    const body = {
      question: question,
      answer: answer,
    }
    return this.http.post(this.baseURL + url, body, {headers: this._headers});
  }

  _operationHistory(startDate , endDate) {

    const url = '/calculate/opHistory/';

    const body = {
       fromDate: startDate,
       toDate:endDate
    }

    //console.log(body ,this.baseURL + url,body, "testtt" )
    return this.http.post(this.baseURL + url,body,{headers: this._headers});
  }
}
