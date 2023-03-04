const express = require('express')
const app = express()
const expressWs = require('express-ws')
const SSH = require('ssh2').Client;

expressWs(app) //引入的expressWs方法将app对象传入：

let ssh;

function initTerminal(ws){
	ssh = new SSH();
	ssh.on('ready', function (){
		ws.send('SSH CONNECTION ESTABLISHED\r\n');

		ssh.shell({term: 'xterm'}, function (err, stream){
			if(err){
				return ws.send('\r\n SSH ERROR');
			}
			ws.on('message', function (msg) {
				console.log('-----socketTest message---', msg);
				const data = JSON.parse(msg);
				if(data[0] === 'data'){
					stream.write(data[1]);
				}

				if(data[0] === 'resize'){
					console.log('resize ssh');
					stream.setWindow(data[1].rows, data[1].cols);
				}

			});

			stream.on('data', function (result){
				ws.send(JSON.stringify(['data', result.toString('utf-8')]));
			})
		})
	}).connect({
		host: 'localhost',
		port: 22,
		username: 'yangguansen',
		password: 'Ygs5933798'
	})
};

// ws：websocket实例，该实例可以监听来自客户端的消息发送事件（message事件）；
app.ws('/', function (ws, req) {
	initTerminal(ws);
})

app.listen('8888', () => {
	console.log('open Browser on http://127.0.0.1:8888')
})
