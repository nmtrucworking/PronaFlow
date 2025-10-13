/**
 * Giải mã một chuỗi JWT để lấy payload.
 * @param {string} token - Chuỗi JWT.
 * @returns {object|null} - Payload của token hoặc null nếu token không hợp lệ.
 */
export function decodeToken(token) {
    if (!token) return null;

    try {
        const payloadBase64 = token.split('.')[1];

        // Decode from Base64 and parse to object JSON
        const decodedJson = atob(payloadBase64);
        return JSON.parse(decodedJson);
    } catch (erro) {
        console.error("Failed to decode token: ", error);
        return null;
    }
}