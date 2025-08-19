// Public Layout
import { BaseLayout } from "./baseLayout";
import { PubNav } from "./pubNav";

export const PublicLayout = () => {
  return <BaseLayout nav={<PubNav />} />;
};
