import { authService } from "fbase";
import {
  GoogleAuthProvider, GithubAuthProvider, signInWithPopup
} from "firebase/auth";
import AuthForm from "components/AuthForm";
//import userEvent from "../../node_modules/@testing-library/user-event/dist/index";
//import { useResolvedPath } from "../../node_modules/react-router-dom/dist/index";

const Auth = () => {
  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
  }

  return (
    <div>
      <AuthForm/>
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  )
};

export default Auth;