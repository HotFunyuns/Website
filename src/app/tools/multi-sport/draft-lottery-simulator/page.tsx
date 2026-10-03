import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/draft-lottery-simulator/Calculator';
import Explainer from '@/tools/draft-lottery-simulator/Explainer';
import meta from '@/tools/draft-lottery-simulator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
