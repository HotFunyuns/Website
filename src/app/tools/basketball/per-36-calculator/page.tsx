import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/per-36-calculator/Calculator';
import Explainer from '@/tools/per-36-calculator/Explainer';
import meta from '@/tools/per-36-calculator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
