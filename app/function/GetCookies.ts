function getCookie(name: string): string | undefined {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(name + "="));
  return cookie?.split("=")[1];
}

export default getCookie;
