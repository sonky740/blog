import React, { useEffect, useRef } from "react";

const Comments = ({ id }: { id: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // add utteranc comment
      const script = document.createElement("script");
      script.setAttribute("src", "https://utteranc.es/client.js");
      script.setAttribute("repo", "sonky740/comment");
      script.setAttribute("issue-term", id);
      script.setAttribute("label", "comment");
      script.setAttribute("theme", "github-light");
      script.setAttribute("crossorigin", "anonymous");
      script.setAttribute("async", "true");
      container.appendChild(script);
      return () => {
        container.innerHTML = "";
      };
    }
  }, [id]);

  return <div ref={containerRef} style={{ minHeight: 269 }} />;
};

export default Comments;
