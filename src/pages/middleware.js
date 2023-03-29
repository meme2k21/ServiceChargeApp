import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env;

export default function middleware(req) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  const url = req.url;

  if (url.includes("/login")) {
    if (jwt) {
      try {
        verify(jwt, secret);
        return NextResponse.redirect("/");
      } catch (error) {
        return NextResponse.next();
      }
    }
  }

  if (url.includes("/dashboard")) {
    if (jwt === undefined) {
      return NextResponse.redirect("/login");
    }

    try {
      verify(jwt, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect("/login");
    }
  }
  return NextResponse.next();
}
