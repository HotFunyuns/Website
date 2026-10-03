import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/passer-rating-calculator/Calculator';
import Explainer from '@/tools/passer-rating-calculator/Explainer';
import meta from '@/tools/passer-rating-calculator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
