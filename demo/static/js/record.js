'use strict';

/* globals MediaRecorder */

var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

var gumAudio = document.querySelector('audio#gum');
var recordedAudio = document.querySelector('audio#recorded');

var recordButton = document.querySelector('button#record');
var playButton = document.querySelector('button#play');
// var downloadButton = document.querySelector('button#download');
recordButton.onclick = toggleRecording;
playButton.onclick = play;


// downloadButton.onclick = download;

// 使用https协议
var isSecureOrigin = location.protocol === 'https:' ||
    location.hostname === 'localhost';
if (!isSecureOrigin) {
    alert('getUserMedia() must be run from a secure origin: HTTPS or localhost.' +
        '\n\nChanging protocol to HTTPS');
    location.protocol = 'HTTPS';
}
//获取语音，不获取视频参数
var constraints = {
    audio: true,
    video: false
};

function handleSuccess(stream) {
    // recordButton.disabled = false;
    console.log('getUserMedia() got stream: ', stream);
    window.stream = stream;
    gumAudio.srcObject = stream;
}

function handleError(error) {
    console.log('navigator.getUserMedia error: ', error);
}
//获得用户音频权限
navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);

function handleSourceOpen(event) {
    console.log('MediaSource opened');
    sourceBuffer = mediaSource.addSourceBuffer('audio/webm; codecs="vp8"');
    console.log('Source buffer: ', sourceBuffer);
}

recordedAudio.addEventListener('error', function (ev) {
    console.error('MediaRecording.recordedMedia.error()');
    alert('Your browser can not play\n\n' + recordedAudio.src
        + '\n\n media clip. event: ' + JSON.stringify(ev));
}, true);

function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}

function handleStop(event) {
    console.log('Recorder stopped: ', event);
}
// 开始录取与停止录取
function toggleRecording() {
    if (recordButton.textContent === 'Start Recording') {
        startRecording();
    } else {
        stopRecording();
        recordButton.textContent = 'Start Recording';
        // playButton.disabled = false;
        // downloadButton.disabled = false;
    }
}

function startRecording() {
    recordedBlobs = [];
    var options = { mimeType: 'audio/webm;codecs=vp9' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = { mimeType: 'audio/webm;codecs=vp8' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.log(options.mimeType + ' is not Supported');
            options = { mimeType: 'audio/webm' };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.log(options.mimeType + ' is not Supported');
                options = { mimeType: '' };
            }
        }
    }
    try {
        mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
        console.error('Exception while creating MediaRecorder: ' + e);
        alert('Exception while creating MediaRecorder: '
            + e + '. mimeType: ' + options.mimeType);
        return;
    }
    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    recordButton.textContent = 'Stop Recording';
    // playButton.disabled = true;
    // downloadButton.disabled = true;
    mediaRecorder.onstop = handleStop;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(10); // collect 10ms of data
    console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
    mediaRecorder.stop();
    console.log('Recorded Blobs: ', recordedBlobs);
    recordedAudio.controls = true;


    //新加的
    var superBuffer = new Blob(recordedBlobs, { type: 'audio/mp3' });
    recordedAudio.src = window.URL.createObjectURL(superBuffer);
    // recordedAudio.addEventListener('loadedmetadata', function () {
    //     var playPromise = recordedAudio.play();
    // });
}

function play() {
    var superBuffer = new Blob(recordedBlobs, { type: 'audio/mp3' });
    recordedAudio.src = window.URL.createObjectURL(superBuffer);
    recordedAudio.addEventListener('loadedmetadata', function () {
        var playPromise = recordedAudio.play();
    });
}

// function download() {
//     var blob = new Blob(recordedBlobs, { type: 'audio/mp3' });
//     var url = window.URL.createObjectURL(blob);
//     var a = document.createElement('a');
//     a.style.display = 'none';
//     a.href = url;
//     console.log(url);
//     a.download = 'test.webm';
//     document.body.appendChild(a);
//     a.click();
//     setTimeout(function () {
//         document.body.removeChild(a);
//         window.URL.revokeObjectURL(url);
//     }, 100);
// }