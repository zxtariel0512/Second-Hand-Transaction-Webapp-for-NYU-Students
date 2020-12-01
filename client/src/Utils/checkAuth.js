/**
 * Function to Check Authentication based on AWS Auth
 * 我还没找到最好的办法，无法使用Async Await
 * 无法使用AWS.Auth
 */
function checkAuth() {
  return Boolean(
    window.localStorage.getItem(
      "CognitoIdentityServiceProvider.35imp6i4qj524iojeg1acjlpdr.LastAuthUser"
    )
  );
}

export default checkAuth;
