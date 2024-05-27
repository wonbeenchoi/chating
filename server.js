// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 루트 경로에 대한 기본 GET 요청
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 소켓 연결
io.on('connection', (socket) => {
    console.log('사용자가 연결되었습니다.');

    // 클라이언트로부터 메시지 받기
    socket.on('chat message', (msg) => {
        console.log('메시지: ' + msg);
        // 받은 메시지를 모든 클라이언트에게 전송
        io.emit('chat message', msg);
    });

    // 연결 해제 시
    socket.on('disconnect', () => {
        console.log('사용자가 연결 해제했습니다.');
    });
});

// 서버를 3000번 포트에서 실행
server.listen(3000, () => {
    console.log('서버가 3000번 포트에서 실행 중입니다.');
});
