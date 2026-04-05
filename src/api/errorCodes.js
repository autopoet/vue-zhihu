export const ErrorCodes = {
  SUCCESS: 0,
  INVALID_PARAMS: 1,
  NOT_FOUND: 2,
  SERVER_ERROR: 3,
  UNAUTHORIZED: 4,
};

/**
 * 获取错误信息
 * @param {number} code
 * @returns {string}
 */
export function getErrorMessage(code) {
  switch (code) {
    case ErrorCodes.SUCCESS:
      return '成功';
    case ErrorCodes.INVALID_PARAMS:
      return '参数错误';
    case ErrorCodes.NOT_FOUND:
      return '未找到资源';
    case ErrorCodes.SERVER_ERROR:
      return '服务器错误';
    case ErrorCodes.UNAUTHORIZED:
      return '未授权，请登录';
    default:
      return '未知错误';
  }
}
