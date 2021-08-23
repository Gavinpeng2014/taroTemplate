export const HTTP_STATUS = {
    // 成功处理了请求，一般情况下都是返回此状态码
    SUCCESS: 200,
    // 请求成功并且服务器创建了新的资源
    CREATED: 201,
    // 接受请求但没创建资源
    ACCEPTED: 202,
    // 服务器不理解请求的语法
    CLIENT_ERROR: 400,
    // 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应
    AUTHENTICATE: 401,
    // 服务器拒绝请求
    FORBIDDEN: 403,
    // 服务器找不到请求的网页
    NOT_FOUND: 404,
    // (服务器内部错误) 服务器遇到错误，无法完成请求
    SERVER_ERROR: 500,
    // (错误网关) 服务器作为网关或代理，从上游服务器收到无效响应
    BAD_GATEWAY: 502,
    // (服务不可用) 服务器目前无法使用(由于超载或停机维护)。 通常，这只是暂时状态。
    SERVICE_UNAVAILABLE: 503,
    // (网关超时) 服务器作为网关或代理，但是没有及时从上游服务器收到请求
    GATEWAY_TIMEOUT: 504
}