/**
 * 定義登入與註冊的編譯期輸入型別，介面在輸出 JavaScript 時會被移除。
 * 這些字串欄位不會自動執行非空、Email 或長度驗證；畫面規則與後端 DTO 驗證仍各自需要執行。
 * password 在這裡是使用者輸入的原始密碼，雜湊由後端 Service 處理。
 */
export interface LoginRequest{
    email: string;
    password: string;
}

export interface RegisterRequest{
    name: string,
    password: string,
    email: string,
    phone: string
}

