export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");

  window.dispatchEvent(new Event("auth-change"));

  window.location.href = "/";
};

export const setupAutoLogout = () => {
  const token = localStorage.getItem("access");
  if (!token) return;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = payload.exp * 1000; // ms
    const currentTime = Date.now();

    const timeout = expiryTime - currentTime;

    if (timeout <= 0) {
      logoutUser();
    } else {
      setTimeout(logoutUser, timeout);
    }
  } catch (err) {
    console.error("Invalid token, logging out");
    logoutUser();
  }
};
