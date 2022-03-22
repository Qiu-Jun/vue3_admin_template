<!--
 * :Author: June
 * :Date: 2022-03-22 16:36:56
 * :LastEditTime: 2022-03-22 18:19:24
 * :Description:
-->
<template>
    <el-card>
        <div>
            <el-button @click="handleOpen">调用摄像头</el-button>
            <el-button @click="handleClose">关闭摄像头</el-button>
            <el-button @click="handleDownload">下载视频</el-button>
        </div>

        <div id="videoBox">
            <video autoplay playsinline id="player" muted></video>
        </div>
    </el-card>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

let videoBox = null
let mediaRecord = null
let allStream = null
const buf = []
const ops = {
    numChannels: 2,
    mimeType: 'video/webm;codecs=h264'
}

onMounted(() => {
    videoBox = document.querySelector('#player')
})

onBeforeUnmount(() => {
    return mediaRecord && mediaRecord.stop()
})

const handleOpen = () => {
    if (mediaRecord) return
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: {
                    echoCancellation: false
                }
            })
            .then((stream) => {
                allStream = stream
                videoBox.srcObject = stream
                //  判断是否支持的mimeType格式
                if (MediaRecorder.isTypeSupported(ops.mimeType)) {
                    mediaRecord = new MediaRecorder(allStream, ops)
                    // 处理采集的事件
                    mediaRecord.ondataavailable = (e) => {
                        if (e && e.data && e.data.size > 0) {
                            buf.push(e.data)
                        }
                    }
                    // 开始录制
                    mediaRecord.start(20)
                } else {
                    console.log('不支持的视频格式')
                }
            })
    }
}
const handleClose = () => {
    if (videoBox.srcObject) {
        videoBox.srcObject.getTracks()[0].stop()
        videoBox.srcObject.getTracks()[1].stop()
        mediaRecord && mediaRecord.stop() && (mediaRecord = null)
    }
}
const handleDownload = () => {
    mediaRecord && mediaRecord.stop() && (mediaRecord = null)
    if (buf.length) {
        const blob = new Blob(buf, { type: 'video/webm' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.style.display = 'none'
        a.download = 'aaa.webm'
        a.click()
    } else {
        alert('还没有录制任何内容')
    }
}
</script>

<style scoped>
#player {
    width: 300px;
    height: 300px;
}
</style>
