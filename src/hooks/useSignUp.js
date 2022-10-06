import { CREATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useSignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER);
  console.log("result", result);
  const signUp = async ({ username, password }) => {
    const { data } = await createUser({
      variables: {
        user: { username, password },
      },
    });
    return data.createUser;
  };

  return [signUp, result];
};

export default useSignUp;
