package com.jeong.layered

import android.media.MediaPlayer
import android.os.Handler
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AudioModule.NAME)
class AudioModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        const val NAME = "AudioModule"
        const val TAG = "AudioModule"
    }

    // key별로 PCMTrackPlayer 인스턴스를 관리하여 여러 사운드를 동시에 재생할 수 있습니다.
    private val players = mutableMapOf<String, PCMTrackPlayer>()
    private var isPaused = false

    override fun getName(): String = NAME

    /**
     * 지정한 key와 파일명으로 사운드를 반복 재생합니다.
     * 이미 해당 key로 재생 중인 사운드는 release 후 새로 생성합니다.
     * @param key 사운드 구분용 키 (예: rain1, rain2)
     * @param fileName raw 리소스에 있는 파일명(확장자 없이)
     */
    @ReactMethod
    fun play(key: String, fileName: String, promise: Promise) {
        Log.d(TAG, "play called: key=$key, fileName=$fileName")
        try {
            // 확장자까지 포함한 파일명을 그대로 사용 (예: wind1.pcm)
            val resId = reactApplicationContext.resources.getIdentifier(
                fileName,
                "raw",
                reactApplicationContext.packageName
            )
            Log.d(TAG, "resolved resId=$resId for fileName=$fileName")
            if (resId == 0) {
                Log.e(TAG, "File not found: $fileName")
                promise.reject("NOT_FOUND", "File not found")
                return
            }
            // 기존 플레이어 정리
            players[key]?.stop()
            val pcmPlayer = PCMTrackPlayer(reactApplicationContext, resId)
            pcmPlayer.start()
            players[key] = pcmPlayer
            Log.d(TAG, "PCM 재생 시작: key=$key, fileName=$fileName (AudioTrack, raw PCM)")
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e(TAG, "play error", e)
            promise.reject("PLAY_ERROR", e)
        }
    }

    /**
     * 지정한 key의 사운드 재생을 정지하고 리소스를 해제합니다.
     */
    @ReactMethod
    fun stop(key: String, promise: Promise) {
        Log.d(TAG, "stop called: key=$key")
        try {
            players[key]?.stop()
            players.remove(key)
            Log.d(TAG, "정지 완료: key=$key")
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e(TAG, "stop error", e)
            promise.reject("STOP_ERROR", e)
        }
    }

    /**
     * 지정한 key의 사운드 볼륨을 설정합니다. (0.0 ~ 1.0)
     */
    @ReactMethod
    fun setVolume(key: String, volume: Double, promise: Promise) {
        Log.d(TAG, "setVolume called: key=$key, volume=$volume")
        try {
            players[key]?.setVolume(volume.toFloat())
            Log.d(TAG, "볼륨 설정 완료: key=$key, volume=$volume")
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e(TAG, "setVolume error", e)
            promise.reject("VOLUME_ERROR", e)
        }
    }

    /**
     * 모든 사운드를 일시정지합니다.
     */
    @ReactMethod
    fun pause(promise: Promise) {
        Log.d(TAG, "pause called")
        try {
            isPaused = true
            players.values.forEach { player ->
                player.pause()
            }
            Log.d(TAG, "일시정지 완료")
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e(TAG, "pause error", e)
            promise.reject("PAUSE_ERROR", e)
        }
    }

    /**
     * 일시정지된 모든 사운드를 재개합니다.
     */
    @ReactMethod
    fun resume(promise: Promise) {
        Log.d(TAG, "resume called")
        try {
            isPaused = false
            players.values.forEach { player ->
                player.resume()
            }
            Log.d(TAG, "재생 재개 완료")
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e(TAG, "resume error", e)
            promise.reject("RESUME_ERROR", e)
        }
    }

    // PCMTrackPlayer 클래스 정의 (내부 클래스)
    private inner class PCMTrackPlayer(
        val context: ReactApplicationContext,
        val resId: Int
    ) {
        private var audioTrack: android.media.AudioTrack? = null
        private var isPlaying = false
        private var isPaused = false
        private var pcmData: ByteArray? = null
        private var originalVolume: Float = 1.0f
        private var currentVolume: Float = 1.0f

        fun start() {
            if (isPlaying) return
            isPlaying = true
            isPaused = false
            pcmData = loadPCMFromRaw(resId)
            if (pcmData == null) {
                Log.e(TAG, "PCM 데이터 로드 실패")
                isPlaying = false
                return
            }
            val sampleRate = 44100 // PCM 파일에 맞게 수정
            val channelConfig = android.media.AudioFormat.CHANNEL_OUT_MONO // 또는 CHANNEL_OUT_STEREO
            val audioFormat = android.media.AudioFormat.ENCODING_PCM_16BIT
            val frameCount = pcmData!!.size / 2 // 16bit = 2byte

            audioTrack = android.media.AudioTrack(
                android.media.AudioManager.STREAM_MUSIC,
                sampleRate,
                channelConfig,
                audioFormat,
                pcmData!!.size,
                android.media.AudioTrack.MODE_STATIC
            )
            audioTrack?.write(pcmData!!, 0, pcmData!!.size)
            // 반드시 write 후 setLoopPoints, play 순서!
            audioTrack?.setLoopPoints(0, frameCount, -1)
            audioTrack?.play()
        }

        fun stop() {
            isPlaying = false
            isPaused = false
            audioTrack?.stop()
            audioTrack?.release()
            audioTrack = null
        }

        fun pause() {
            if (isPlaying && !isPaused) {
                isPaused = true
                audioTrack?.pause()
            }
        }

        fun resume() {
            if (isPlaying && isPaused) {
                isPaused = false
                audioTrack?.play()
            }
        }

        fun setVolume(volume: Float) {
            currentVolume = volume
            originalVolume = volume
            audioTrack?.setVolume(volume)
        }

        private fun loadPCMFromRaw(resId: Int): ByteArray? {
            val inputStream = context.resources.openRawResource(resId)
            return inputStream.readBytes()
        }
    }
} 