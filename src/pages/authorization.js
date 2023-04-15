// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { authorize } from "./login";

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const router = useRouter();
//     const isLoggedIn = false; // Replace this with your actual authentication logic

//     console.log(authorize);
//     useEffect(() => {
//       if (!isLoggedIn) {
//         router.push("/login");
//       }
//     }, []);

//     if (isLoggedIn) {
//       return <WrappedComponent {...props} />;
//     }

//     return null;
//   };
// };

// export default withAuth;