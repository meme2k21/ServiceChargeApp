import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Login from "./login";

export default function index() {
  return (
    <h1> Homepage</h1>
  );
}