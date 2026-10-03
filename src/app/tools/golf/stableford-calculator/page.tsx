import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/stableford-calculator/Calculator';
import Explainer from '@/tools/stableford-calculator/Explainer';
import meta from '@/tools/stableford-calculator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
