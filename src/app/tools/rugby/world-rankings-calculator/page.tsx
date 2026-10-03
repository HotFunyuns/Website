import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/world-rankings-calculator/Calculator';
import Explainer from '@/tools/world-rankings-calculator/Explainer';
import meta from '@/tools/world-rankings-calculator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
