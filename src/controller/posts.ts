import { Response , Request ,NextFunction} from  'express';
import axios, { AxiosResponse } from 'axios';

  

class API_CALL{
  
  async getPosts(req:Request, res:Response) : Promise<any>{

    let result:AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    if(result.status == 200){
     
        let data: any = result.data;
        res.json({success:true,data});
    }
    else return res.json({status:false});

  }

  async getPost(req: Request, res: Response): Promise<any>{
    try{
      let id : string = req.params.id
      let result:AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      if(result.status==200){
    
        let data : any = result.data
        res.json({status:result.status,data})

    }

    }
    catch(err){ res.json({success:false});}
  }

}

export = new API_CALL();
