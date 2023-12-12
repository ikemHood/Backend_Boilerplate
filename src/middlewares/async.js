const asyncHandler = fn => (req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    return Promise.resolve(fn(req, res, next)).catch(next)
}

export default asyncHandler;