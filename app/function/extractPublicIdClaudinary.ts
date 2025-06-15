function extractPublicId(url: string): string {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  const publicId = filename.split(".")[0]; // remove extension
  return publicId;
}
