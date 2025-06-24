package com.jeong.layered

import android.media.MediaPlayer
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AudioModule.NAME)
class AudioModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        const val NAME = "AudioModule"
        const val TAG = "AudioModule"
    }

    // key별로 MediaPlayer 인스턴스를 관리하여 여러 사운드를 동시에 재생할 수 있습니다.
    private val players = mutableMapOf<String, MediaPlayer>()

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
            val resId = reactApplicationContext.resources.getIdentifier(
                fileName.substringBeforeLast('.'),
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
            players[key]?.release()
            val player = MediaPlayer.create(reactApplicationContext, resId)
            if (player == null) {
                Log.e(TAG, "MediaPlayer.create 실패: $fileName")
                promise.reject("CREATE_ERROR", "MediaPlayer.create 실패")
                return
            }
            player.isLooping = true
            player.start()
            players[key] = player
            Log.d(TAG, "재생 시작: key=$key, fileName=$fileName")
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
            players[key]?.release()
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
            players[key]?.setVolume(volume.toFloat(), volume.toFloat())
            Log.d(TAG, "볼륨 설정 완료: key=$key, volume=$volume")
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e(TAG, "setVolume error", e)
            promise.reject("VOLUME_ERROR", e)
        }
    }
} 