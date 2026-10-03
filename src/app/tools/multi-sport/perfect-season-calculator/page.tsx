import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/perfect-season-calculator/Calculator';
import Explainer from '@/tools/perfect-season-calculator/Explainer';
import meta from '@/tools/perfect-season-calculator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
