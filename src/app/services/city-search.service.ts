import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {

  constructor(private http: HttpClient) { }

  getData(req: any)
  {
    return this.http.get<any>(`http://api.positionstack.com/v1/forward?access_key=b8c296968795577265e78ba72a217c29&query=${req}`);
  }

  postState(req: any){
    return this.http.post<any>(`${environment.baseURL}${environment.postState}`, req)
  }

  searchHistory(){
    return this.http.get<any>('http://powerful-plateau-35033.herokuapp.com/engine/state/response');
  }
}
