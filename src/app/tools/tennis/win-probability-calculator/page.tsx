import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/win-probability-calculator/Calculator';
import Explainer from '@/tools/win-probability-calculator/Explainer';
import meta from '@/tools/win-probability-calculator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
