import { SIGN_IN } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const [authenticate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await authenticate({
      variables: {
        credentials: { username, password },
      },
    });

    const token = data.authenticate.accessToken;

    await authStorage.setAccessToken(token);
    apolloClient.resetStore();
    return token;
  };

  return [signIn, result];
};

export default useSignIn;
