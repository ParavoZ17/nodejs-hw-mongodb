
import * as authServices from '../services/auth.js';

const setupSession = (res, session)=> {
  const {_id, refreshToken, refreshTokenValidUntil} = session;

  res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: refreshTokenValidUntil
  });

  res.cookie("sessionId", _id, {
      httpOnly: true,
      expires: refreshTokenValidUntil
  });
}

export const registerController = async (req, res) => {
  const data = await authServices.register(req.body);
  res.status(201).json({
    status: 201,
    message: 'Succsessfully registerd user!',
  });
};

export const loginController = async (req, res) => {
  const { _id, accessToken, refreshToken, refreshTokenValidUntil } =
    await authServices.login(req.body);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
  res.json({
    status:200,
    message:"Successfully logged in an user!",
    data:{
      accessToken,
    }
  })
};

export const refreshSessionController = async(req, res)=> {
  const session = await authServices.refreshUserSession(req.cookies);

  setupSession(res, session);

  res.json({
      status: 200,
      message: "Successfully refreshed a session!",
      data: {
          accessToken: session.accessToken,
      }
  })
}

export const logoutController = async(req, res)=> {
  if(req.cookies.sessionId) {
      await authServices.logout(req.cookies.sessionId);
  }

  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
}