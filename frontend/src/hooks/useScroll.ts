import { useEffect } from "react";

type ScrollParameters = {
  options: ScrollToOptions;
  deps?: React.DependencyList;
};

export function useScroll({options, deps = []}: ScrollParameters) {
  useEffect(() => window.scrollTo(options), [...deps]);
}