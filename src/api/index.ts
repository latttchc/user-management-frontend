import axios from "axios"; // HTTPクライアントライブラリAxiosをインポート

import baseURL from "./baseURL"; // 環境別のベースURLを取得

/**
 * Axiosインスタンスを作成
 * ベースURL設定とタイムアウト設定を含む共通設定を適用
 */
const axiosInstance = axios.create({
    baseURL, // 環境に応じたAPIのベースURL
    timeout: 1000, // リクエストタイムアウトを1秒に設定（本番環境では通常より長い値を推奨）
})

/**
 * API関数のオプション型定義
 * @interface ApiOptions
 */
type ApiOptions = {
    data?: object,   // POSTやPUTリクエストで送信するボディデータ（オプション）
    method?: 'get' | 'put' | 'post' | 'delete', // HTTPメソッド（デフォルト: get）
    params?: object, // URLクエリパラメータ（オプション）
}

/**
 * 汎用API関数
 * 認証トークン付きでHTTPリクエストを実行する
 * 
 * @param url - リクエスト先のエンドポイントURL
 * @param options - リクエストオプション（メソッド、データ、パラメータ）
 * @returns Promise<any> - APIレスポンスのデータ部分
 * @throws Error - APIエラー時にエラーメッセージを投げる
 */
export const api = async (url: string, options: ApiOptions = {}) => {
    // オプションからデータを分割代入で取得、デフォルト値を設定
    const { data, method = 'get', params } = options

    // アクセストークン（実際の実装では環境変数やセキュアストレージから取得すべき）
    const accessToken = 'ACCESS_TOKEN'

    try {
        // Axiosを使用してHTTPリクエストを実行
        const response = await axiosInstance.request({
            data,        // リクエストボディ（POST/PUTの場合）
            headers: {
                'Authorization': `Bearer ${accessToken}` // JWT認証ヘッダーを設定
            },
            method,      // HTTPメソッド
            params,      // URLクエリパラメータ
            responseType: 'json', // レスポンス形式をJSONに指定
            url,         // リクエスト先URL
        })

        // レスポンスのデータ部分のみを返す
        return response.data
    } catch (error: any) {
        // エラー発生時はAPIから返されたエラーメッセージを投げる
        // error.response?.data?.errors: サーバーから返されたエラー詳細
        throw new Error(error.response?.data?.errors)
    }
}

// デフォルトエクスポートとして関数を公開
export default api