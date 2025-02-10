import jsonwebtoken from "jsonwebtoken";

export const sendCookie = (
  user,
  res,
  statusCode = 200,
  message = "message"
) => {

  const token = jsonwebtoken.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET
  );
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: (process.env.NODE_ENV === "Development") ? "lax":"none",
      secure: (process.env.NODE_ENV === "Development" )? false:true,
    })
    .json({
      success: true,
      message,
    });
};

export const jsonRes = (
  res,
  statusCode = 200,
  success = "success",
  message = "message"
) => {
  res.status(statusCode).json({
    success,
    message,
  });
};
