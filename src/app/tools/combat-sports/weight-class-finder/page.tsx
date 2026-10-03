import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/weight-class-finder/Calculator';
import Explainer from '@/tools/weight-class-finder/Explainer';
import meta from '@/tools/weight-class-finder/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
