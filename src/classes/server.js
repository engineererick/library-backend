import express from 'express';
import http from 'http';

export default class Server {
    _instance;
    app;
    port;
    httpserver;

    constructor(){
        this.app = express();
        this.port = 5000;
        this.httpserver = new http.Server(this.app);
    }

    get instance(){
        return this._instance || (this._instance = new this());
    }
    start( callback ){
        this.httpserver.listen( this.port, callback() );
    }
}