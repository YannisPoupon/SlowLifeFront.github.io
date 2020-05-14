import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private Http : HttpClient) { }

  ajoutFeedback(feed:any): any{
    return this.Http.post("http://localhost:8080/addFeedback", feed);
  }
  deleteFeedback(id : any){
    return this.Http.delete("http://localhost:8080/delFeedback/"+id)
  }
  getChoixPart(part : any){
    return this.Http.post("http://localhost:8080/findByPart",part);
  }
getAllFeedback(): any{
  return this.Http.get("http://localhost:8080/Feedbacks");
}

}
