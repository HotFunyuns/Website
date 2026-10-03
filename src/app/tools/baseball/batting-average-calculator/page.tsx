import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/batting-average-calculator/Calculator';
import Explainer from '@/tools/batting-average-calculator/Explainer';
import meta from '@/tools/batting-average-calculator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
