import React from "react";
import css from "./Login.module.css";

export default function(props) {
    return (
        <div>
            {props.appProps.user ? (
                <p>Hello, {props.appProps.user.displayName}</p>
            ) : (
                <p>Please sign in.</p>
            )}
            {props.appProps.user ? (
                <button
                    className={css.signOut}
                    onClick={props.appProps.signOut}
                >
                    Sign out
                </button>
            ) : (
                <button
                    className={css.signIn}
                    onClick={props.appProps.signInWithGoogle}
                >
                    Sign in with Google
                </button>
            )}
            {/* {props.appProps.user ? (
        <p>Hello, {props.appProps.user.displayName}</p>
      ) : (
        <p>Please sign in.</p>
      )}
      {props.appProps.user ? (
        <button onClick={props.appProps.signOut}>Sign out</button>
      ) : (
        <button onClick={props.appProps.signInWithFacebook}>
          Sign in with FB
        </button>
      )} */}
        </div>
    );
}
