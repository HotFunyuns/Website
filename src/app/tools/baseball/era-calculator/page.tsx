import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/era-calculator/Calculator';
import Explainer from '@/tools/era-calculator/Explainer';
import meta from '@/tools/era-calculator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
