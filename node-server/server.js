// http://127.0.0.1:61234/server?rtsp=rtsp://admin:lst12345678@10.10.88.11:554/h264/ch1/main/av_stream&port=9999

/*

stream8 = new Stream({
    name: 'name',
    streamUrl: 'rtsp://admin:lst12345678@10.10.88.11:554/h264/ch1/main/av_stream',
    wsPort: 9999
});*/
const Stream = require('node-rtsp-stream');
const http = require('http');
const url  = require('url');

http.createServer((req,res)=>{
	let rtsp
	let port
	let close
	// res.writeHead(200, { 'Content-Type': 'text-plain' });
    query = url.parse(req.url,true).query
    if(query.rtsp){
    	rtsp = query.rtsp
    }
    if(query.port){
    	port = query.port
    }
    if(query.close){
    	close = query.close
    	rtsp = undefined
    	port = undefined
    	try {
   			stream = new Stream({
			    name: 'name',
			    streamUrl: rtsp,
			    wsPort: port
			});
		}
		catch(err){
			stream.mpeg1Muxer.stream.kill();
		}
    }

    if(rtsp){
    	stream = new Stream({
		    name: 'name',
		    streamUrl: rtsp,
		    wsPort: port
		});
    }
    //利用url模块去解析客户端发送过来的URL
    res.end('hello world\n');
    
}).listen(61234)

