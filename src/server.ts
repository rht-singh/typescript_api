import express , { Express } from 'express';
import morgan from 'morgan';
import  routes from './routers/route';
import cluster from 'cluster'
import os from 'os';
let app: Express = express();
import swagger  from 'swagger-ui-express';
import yaml from 'yamljs'

let swagger_doc = yaml.load('./api.yaml')

app.use('/api',routes)
app.use('/api_doc',swagger.serve,swagger.setup(swagger_doc));
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});


let Port: any = 3000;

if(cluster.isMaster){
 
    for(let i: number =0 ; i<os.cpus().length-3 ; i++){
        cluster.fork();
    }
    cluster.on('end',()=>{
        cluster.fork();
    })
}


else app.listen(Port,()=> {
    console.log('server started with port'+" "+Port +" "+ process.pid)
});




