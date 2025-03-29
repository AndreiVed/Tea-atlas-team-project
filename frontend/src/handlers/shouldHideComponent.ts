export function shouldHideComponent(
  pathnames: string[],
  currentPath: string
): boolean {
  return pathnames.some((path) => path === currentPath);
}
