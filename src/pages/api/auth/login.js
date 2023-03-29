import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET_KEY;

export default async function (req, res) {
  const { userEmail, userPassword } = req.body;

  // Check in the database
  // if a user with this username
  // and userPassword exists
  if (userEmail === "yae@genshin.com" && userPassword === "newpassword") {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        userEmail: userEmail,
      },
      secret
    );

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Success!" });
  } else {
    res.json({ message: "Invalid credentials!" });
  }
}
