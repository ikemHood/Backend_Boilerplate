import config from 'config';

const JWT_COOKIE_EXPIRE = config.get('jwt.cookie.expiresIn');
const NODE_ENV = config.get('system.node_env') || 'development';

export const sendTokenResponse = (user, statusCode, res) => {
    // Create Token
    const token = user.getSignedJWT();
  
    const options = {
      expires: new Date(
        Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    // Set Secure option if in production environment
    if (NODE_ENV === "production") {
      options.secure = true;
    }
  
    res
      .status(statusCode)
      .cookie("token", token, options)
      .json({ success: true, token});
  };
  