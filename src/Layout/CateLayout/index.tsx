import { ReactNode } from "react";
import BackToTopButton from "@/components/BackTotopButton";
const CateLayout = ({ children }: { children?: ReactNode }) => {
  return <>
      <div className="page-container px-2">{children}</div>
      <BackToTopButton/>

  </>;
};

export default CateLayout;
