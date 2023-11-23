import { ReactNode } from "react";
import BackToTopButton from "@/components/BackTotopButton";
const PostLayout = ({ children }: { children?: ReactNode }) => {
  return <>
    <div className="page-container post-container ">{children}</div>
    <BackToTopButton/>
  </>;
};

export default PostLayout;
