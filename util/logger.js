module.exports = {
    debug: (...args) => console.log('[DEBUG]', ...args),
    info: (...args) => console.info('[INFO]', ...args),
    error: (...args) => console.error('[ERROR]', ...args),
};