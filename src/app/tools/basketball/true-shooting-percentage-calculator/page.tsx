import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/true-shooting-percentage-calculator/Calculator';
import Explainer from '@/tools/true-shooting-percentage-calculator/Explainer';
import meta from '@/tools/true-shooting-percentage-calculator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
