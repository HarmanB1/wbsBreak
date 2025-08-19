// Public Layout
import { BaseLayout } from "./baseLayout";
import { PrivNav } from "./PrivNav";

export const PrivateLayout = () => {
  return <BaseLayout nav={<PrivNav />} />;
};
