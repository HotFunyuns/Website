import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/handicap-index-calculator/Calculator';
import Explainer from '@/tools/handicap-index-calculator/Explainer';
import meta from '@/tools/handicap-index-calculator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
